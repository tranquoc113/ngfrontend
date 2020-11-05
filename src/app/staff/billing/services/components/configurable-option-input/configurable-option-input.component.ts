import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IConfigOptionModel } from '@fleio-api/billing/model/config-option.model';
import { FleioId } from '@fleio-api/base-model/base-fleio-object.model';

@Component({
  selector: 'app-configurable-option-input',
  templateUrl: './configurable-option-input.component.html',
  styleUrls: ['./configurable-option-input.component.scss']
})
export class ConfigurableOptionInputComponent implements OnInit {
  @Input() option: IConfigOptionModel;
  @Input() cycleId: FleioId;
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  emitValueChange(newValue: string) {
    this.value = newValue;
    this.valueChange.emit(this.value);
  }
}
