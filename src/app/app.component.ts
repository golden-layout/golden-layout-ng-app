import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import {
  GoldenLayout
} from "golden-layout";
import { ControlsComponent } from './controls.component';
import { GoldenLayoutHostComponent } from './golden-layout-host.component';

@Component({
  selector: 'app-root',
  template: `
      <app-controls #controls></app-controls>
      <app-golden-layout-host #goldenLayoutHost></app-golden-layout-host>   
  `,
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
      }
    `
  ]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'golden-layout-ng-app';

  private _controlsElement: HTMLElement;
  private _goldenLayout: GoldenLayout;
  private _windowResizeListener = () => this.handleWindowResizeEvent();

  @ViewChild('controls') private controlsComponent: ControlsComponent; 
  @ViewChild('goldenLayoutHost') private goldenLayoutHostComponent: GoldenLayoutHostComponent; 

  ngAfterViewInit() {
    this._controlsElement = this.controlsComponent.element;
    this._goldenLayout = new GoldenLayout(this.goldenLayoutHostComponent.element);
    this.goldenLayoutHostComponent.setGoldenLayout(this._goldenLayout);
    this.controlsComponent.setGoldenLayout(this._goldenLayout);

    globalThis.addEventListener('resize', this._windowResizeListener);
  }

  ngOnDestroy() {
    globalThis.removeEventListener('resize', this._windowResizeListener);
  }

  private handleWindowResizeEvent() {
    // handling of resize event is required if GoldenLayout does not use body element
    const bodyComputedStyle = getComputedStyle(document.body);
    const controlsComputedStyle = getComputedStyle(this._controlsElement);
    const bodyWidth = this.pixelsToNumber(bodyComputedStyle.width);
    const controlsWidth = this.pixelsToNumber(controlsComputedStyle.width);
    const height = this.pixelsToNumber(bodyComputedStyle.height);
    this._goldenLayout.setSize(bodyWidth - controlsWidth, height)
  }

  private pixelsToNumber(value: string): number {
    const numberStr = value.replace("px", "");
    return parseFloat(numberStr);
  }
}
