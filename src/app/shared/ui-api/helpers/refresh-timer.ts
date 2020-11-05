import { BehaviorSubject, from, fromEvent, interval, Subscription, timer } from 'rxjs';
import { debounceTime, delayWhen, finalize } from 'rxjs/operators';
import { ConfigService } from '@shared/config/config.service';
import { ChangeDetectorRef, NgZone } from '@angular/core';

export const DEFAULT_BOOST_INTERVALS = [100, 200, 400, 700, 1000];

class IdleDetector {
  private static lastActivity: number = Date.now();
  private static mouseMoveSubscription: Subscription;
  private static keyDownSubscription: Subscription;
  private static listenRefCount = 0;
  private static lastActivityBS = new BehaviorSubject<number>(Date.now());

  public static lastActivity$ = IdleDetector.lastActivityBS.asObservable();


  static startListeningForEvents() {
    this.listenRefCount += 1;
    if (this.listenRefCount > 1) {
      return;
    }

    this.setLastActivity(Date.now());
    const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
    this.mouseMoveSubscription = mouseMove$.pipe(debounceTime(100)).subscribe(() => {
      this.setLastActivity(Date.now());
    });

    const keyDown$ = fromEvent<MouseEvent>(document, 'keydown');
    this.keyDownSubscription = keyDown$.pipe(debounceTime(100)).subscribe(() => {
      this.setLastActivity(Date.now());
    });
  }

  static stopListeningForEvents() {
    this.listenRefCount -= 1;
    if (this.listenRefCount > 0) {
      return;
    }

    if (this.mouseMoveSubscription) {
      this.mouseMoveSubscription.unsubscribe();
      this.mouseMoveSubscription = null;
    }

    if (this.keyDownSubscription) {
      this.keyDownSubscription.unsubscribe();
      this.keyDownSubscription = null;
    }
  }

  static setLastActivity(lastActivity: number) {
    this.lastActivityBS.next(this.lastActivity);
    this.lastActivity = lastActivity;
  }

  static isIdle(idleTimeout: number): boolean {
    const currentDate = Date.now();
    const secondsSinceLastActivity = (currentDate - this.lastActivity) / 1000;
    return secondsSinceLastActivity > idleTimeout;
  }
}

export class RefreshTimer {
  private timerSubscription: Subscription;
  private lastActivitySubscription: Subscription;
  private executing = false;

  constructor(
    private timerInterval: number,
    private readonly callback: () => void,
    private configService: ConfigService,
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    autoStart: boolean = true,
    private readonly pauseOnIdle: boolean = true,
  ) {
    if (autoStart) {
      this.start();
    }
  }


  isIdle(): boolean {
    if (this.pauseOnIdle) {
      if (this.configService && this.configService.current) {
        return IdleDetector.isIdle(this.configService.current.settings.appIdleTimeout);
      } else {
        return IdleDetector.isIdle(30);
      }
    } else {
      return false;
    }
  }

  async executeCallback(skipIdleCheck: boolean = false) {
    if (!this.executing && (skipIdleCheck || !this.isIdle())) {
      this.executing = true;
      await this.callback();
      this.executing = false;
    }
  }

  get isStarted() {
    return !!this.timerSubscription;
  }

  setInterval(timerInterval: number, start: boolean = false) {
    const wasStarted = this.isStarted;
    this.stop();
    this.timerInterval = timerInterval;
    if (wasStarted || start) {
      this.start();
    }
  }

  startTimerSubscription() {
    this.timerSubscription = timer(
      this.timerInterval, this.timerInterval
    ).subscribe(() => {
      this.executeCallback().then(() => {
        if (this.changeDetectorRef) {
          this.changeDetectorRef.detectChanges();
        }
      });
    });
    this.lastActivitySubscription = IdleDetector.lastActivity$.subscribe(() => {
      const refreshNow = this.isStarted && this.isIdle();
      if (refreshNow) {
        this.executeCallback(true).then(() => {
          if (this.changeDetectorRef) {
            this.changeDetectorRef.detectChanges();
          }
        });
      }
    });
  }

  start() {
    this.stop();
    IdleDetector.startListeningForEvents();
    if (this.ngZone) {
      this.ngZone.runOutsideAngular(() => {
        this.startTimerSubscription();
      });
    } else {
      console.warn('NgZone was not declared for this details view.');
      this.startTimerSubscription();
    }
  }

  stop() {
    if (this.isStarted) {
      IdleDetector.stopListeningForEvents();
      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
        this.timerSubscription = null;
      }
      if (this.lastActivitySubscription) {
        this.lastActivitySubscription.unsubscribe();
        this.lastActivitySubscription = null;
      }
    }
  }

  boost(boostIntervals: number[] = DEFAULT_BOOST_INTERVALS) {
    const wasStarted = this.isStarted;
    this.stop();

    if (this.ngZone) {
      this.ngZone.runOutsideAngular(() => {
        this.timerSubscription = from(boostIntervals).pipe(
          delayWhen(i => {
            return interval(i);
          }),
          finalize(() => {
            this.stop();
            if (wasStarted) {
              this.start();
            }
          })
        ).subscribe(
          () => {
            this.executeCallback().then(() => {
              if (this.changeDetectorRef) {
                this.changeDetectorRef.detectChanges();
              }
            });
          },
        );
      });
    } else {
      console.warn('NgZone was not declared for this details view.');
      this.timerSubscription = from(boostIntervals).pipe(
        delayWhen(i => {
          return interval(i);
        }),
        finalize(() => {
          this.stop();
          if (wasStarted) {
            this.start();
          }
        })
      ).subscribe(
        () => {
          this.executeCallback().then(() => {
            if (this.changeDetectorRef) {
              this.changeDetectorRef.detectChanges();
            }
          });
        },
      );
    }
  }
}
