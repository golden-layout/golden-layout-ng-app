import { Component, ElementRef, Inject } from '@angular/core';
import { ComponentContainer } from 'golden-layout';
import { BaseComponentDirective } from './base-component.directive';

@Component({
  selector: 'app-color-component',
  template: `
    <p id="title" [style.color]="color">{{title}}</p>
    <input #input type="text" [value]="initialColor" (input)="updateColor(input.value)">
    <p [style.color]="color">id: "{{id}}"</p>
  `,
  styles: [`
    :host {
      position: absolute;
      overflow: hidden;
    }

    #title {
      textAlign: left;
    }
  `
  ]
})
export class ColorComponent extends BaseComponentDirective {

  public title: string;
  public color: string;
  public initialColor: string;
  public id: string;

  constructor(@Inject(BaseComponentDirective.GoldenLayoutContainerInjectionToken) private container: ComponentContainer, elRef: ElementRef) {
    super(elRef.nativeElement);

    this.title = this.container.title;
    this.id = this.container.parent.id;

    this.container.stateRequestEvent = () => this.handleContainerStateRequestEvent();

    const state = this.container.initialState;
    let color: string;
    if (state === undefined) {
        color = ColorComponent.undefinedColor;
    } else {
        if (typeof state !== 'string') {
            color = 'IndianRed';
        } else {
            color = state;
        }
    }
    this.color = color;
    this.initialColor = color;
  }

  updateColor(value: string) {
    this.color = value ?? ColorComponent.undefinedColor;
  }

  handleContainerStateRequestEvent(): string | undefined {
    return this.color === ColorComponent.undefinedColor ? undefined : this.color;
  }
}

export namespace ColorComponent {
  export const componentTypeName = 'Color';
  export const undefinedColor = 'MediumVioletRed';
}
