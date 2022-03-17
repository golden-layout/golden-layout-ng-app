import { AfterViewInit, Component, ViewChild } from '@angular/core';
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
export class AppComponent implements AfterViewInit {
  title = 'golden-layout-ng-app';

  private _controlsElement: HTMLElement;

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
    }, 0);
  }
}
