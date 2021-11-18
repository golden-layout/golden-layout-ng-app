import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
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
  private _windowResizeListener = () => this.handleWindowResizeEvent();

  @ViewChild('controls') private _controlsComponent: ControlsComponent; 
  @ViewChild('goldenLayoutHost') private _goldenLayoutHostComponent: GoldenLayoutHostComponent; 

  ngAfterViewInit() {
    setTimeout(() => {
      this._controlsElement = this._controlsComponent.element;

      this._goldenLayoutHostComponent.initialise();
      this._controlsComponent.initialise(this._goldenLayoutHostComponent);
  
      if (this._goldenLayoutHostComponent.isGoldenLayoutSubWindow) {
        this._controlsElement.style.display = 'none';
      }
  
      globalThis.addEventListener('resize', this._windowResizeListener);
      setTimeout(() => this.resizeGoldenLayout(), 0);
    }, 0);
  }

  ngOnDestroy() {
    globalThis.removeEventListener('resize', this._windowResizeListener);
  }

  private handleWindowResizeEvent() {
    // handling of resize event is required if GoldenLayout does not use body element
    this.resizeGoldenLayout();
  }

  private resizeGoldenLayout() {
    const bodyWidth = document.body.offsetWidth;
    const controlsWidth = this._controlsElement.offsetWidth;
    const height = document.body.offsetHeight;
    this._goldenLayoutHostComponent.setSize(bodyWidth - controlsWidth, height)
  }
}
