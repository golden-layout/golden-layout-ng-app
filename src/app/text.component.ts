import { Component, ElementRef, Inject } from '@angular/core';
import { ComponentContainer, JsonValue } from 'golden-layout';
import { BaseComponentDirective } from './base-component.directive';

@Component({
  selector: 'app-text-component',
  template: `
    <input #input id="input" type="text" [value]="initialValue" (input)="updateValue(input.value)">
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
export class TextComponent extends BaseComponentDirective {
  private _value: string;
  public initialValue: string;

  constructor(@Inject(BaseComponentDirective.GoldenLayoutContainerInjectionToken) private container: ComponentContainer, elRef: ElementRef) {
    super(elRef.nativeElement);

    this.container.stateRequestEvent = () => this.handleContainerStateRequestEvent();

    const state = this.container.initialState;
    let textValue: string;
    if (state === undefined) {
      textValue = TextComponent.undefinedTextValue;
    } else {
      if (!JsonValue.isJson(state)) {
        textValue = '<Unexpect type>';
      } else {
        const textState: TextComponent.State = state as TextComponent.State;
        textValue = textState.text;
      }
      this._value = textValue;
      this.initialValue = textValue;
    }
  }

  setInitialValue(value: string) {
    this.initialValue = value;
    this._value = value;
  }

  updateValue(value: string) {
    this._value = value;
  }

  handleContainerStateRequestEvent(): TextComponent.State | undefined {
    if (this._value === TextComponent.undefinedTextValue) {
      return undefined;
    } else {
      return {
        text: this._value,
      };
    }
  }
}

export namespace TextComponent {
  export const componentTypeName = 'Text';
  export const undefinedTextValue = '<undefined>';

  type TextPropertyName = 'text';
  export type State = { [propertyName in TextPropertyName]: string }
}
