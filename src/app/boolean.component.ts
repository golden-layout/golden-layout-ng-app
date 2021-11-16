import { Component, ElementRef, Inject } from '@angular/core';
import { ComponentContainer } from 'golden-layout';
import { BaseComponentDirective } from './base-component.directive';

@Component({
  selector: 'app-boolean-component',
  template: `
    <input #input id="input" type="checkbox" [checked]="initialValue" (input)="updateValue(input.checked)">
  `,
  styles: [`
    :host {
      position: absolute;
      overflow: hidden;
    }

    #input {
      display: block;
    }
  `]
})
export class BooleanComponent extends BaseComponentDirective {
  private value: boolean;
  public initialValue: boolean;

  constructor(@Inject(BaseComponentDirective.GoldenLayoutContainerInjectionToken) private container: ComponentContainer, elRef: ElementRef) {
    super(elRef.nativeElement);

    this.container.stateRequestEvent = () => this.handleContainerStateRequestEvent();

    const state = this.container.initialState;
    this.value = state as boolean;
    this.initialValue = this.value;
  }

  updateValue(value: boolean) {
    this.value = value;
  }

  handleContainerStateRequestEvent(): boolean {
    return this.value;
  }
}

export namespace BooleanComponent {
  export const componentTypeName = 'Boolean';
}
