import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFormSubmit]'
})
export class FormSubmitDirective implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    const button = this.renderer.createElement('button');
    this.renderer.setAttribute(button, 'type', 'submit');
    this.renderer.setAttribute(button, 'hidden', 'true');
    this.renderer.insertBefore(this.el.nativeElement, button, this.el.nativeElement.firstChild);
  }

}
