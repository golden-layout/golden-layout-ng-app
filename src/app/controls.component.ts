import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  GoldenLayout,
  LayoutConfig,
  UserLayoutConfig,
  UserSerialisableComponentConfig
} from "golden-layout";
import { GoldenLayoutComponentService } from './golden-layout-component.service';
import { Layout, prefinedLayouts } from './predefined-layouts';

@Component({
  selector: 'app-controls',
  template: `
    <section id="addComponentSection">
      <select #registeredComponentTypesSelect id="registeredComponentTypesSelect" class="control"></select>
      <button #addComponentButton id="addComponentButton" class="control" (click)="handleAddComponentButtonClick()">Add Component</button>
    </section>
    <section id="predefinedLayoutsSection">
      <select #layoutSelect id="layoutSelect" class="control"></select>
      <button #loadLayoutButton id="loadLayoutButton" class="control" (click)="handleLoadLayoutButtonClick()">Load Layout</button>
    </section>
    <section id="saveAndReloadLayoutSection">
      <button #saveLayoutButton id="saveLayoutButton" class="control" (click)="handleSaveLayoutButtonClick()">Save Layout</button>
      <button #reloadSavedLayoutButton 
        id="reloadSavedLayoutButton"
        class="control"
        (click)="handleReloadSavedLayoutClick()"
      >Reload saved Layout</button>
    </section>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
    }

    .control {
      margin: 2px;    
    }

    #addComponentSection {
      display: flex;
      flex-direction: row;
    }

    #predefinedLayoutsSection {
      display: flex;
      flex-direction: row;
    }

    #saveAndReloadLayoutSection {
      display: flex;
      flex-direction: row;
    }  
  `
  ]
})
export class ControlsComponent implements AfterViewInit {
  private _goldenLayout: GoldenLayout;
  private _savedLayout: LayoutConfig | undefined;

  private _registeredComponentTypesSelect: HTMLSelectElement;
  private _layoutSelect: HTMLSelectElement;
  private _reloadSavedLayoutButton: HTMLButtonElement;

  get element() { return this._elRef.nativeElement; }

  @ViewChild('registeredComponentTypesSelect') private _registeredComponentTypesSelectElementRef: ElementRef<HTMLSelectElement>;
  @ViewChild('layoutSelect') private _layoutSelectElementRef: ElementRef<HTMLSelectElement>;
  @ViewChild('reloadSavedLayoutButton') private _reloadSavedLayoutButtonElementRef: ElementRef<HTMLButtonElement>;

  constructor(private _elRef: ElementRef<HTMLElement>,
    private _goldenLayoutComponentService: GoldenLayoutComponentService
  ) { }

  ngAfterViewInit(): void {
    this._registeredComponentTypesSelect = this._registeredComponentTypesSelectElementRef.nativeElement;
    this._layoutSelect = this._layoutSelectElementRef.nativeElement;
    this._reloadSavedLayoutButton = this._reloadSavedLayoutButtonElementRef.nativeElement;
  
    this.loadRegisteredComponentTypesSelect();
    this.loadLayoutSelect();
    this._reloadSavedLayoutButton.disabled = true;
  }

  setGoldenLayout(value: GoldenLayout) {
    this._goldenLayout = value;
  }

  handleAddComponentButtonClick() {
      const componentTypeName = this._registeredComponentTypesSelect.value;
      const userItemConfig: UserSerialisableComponentConfig = {
          componentName: componentTypeName,
          type: 'component',
      }
      this._goldenLayout.addItem(userItemConfig, 0);
      this._goldenLayout.updateSizeFromContainer();
  }

  handleLoadLayoutButtonClick() {
      const layoutName = this._layoutSelect.value;
      const layouts = this.getAvailableLayouts();
      const selectedLayout = layouts.find((layout) => layout.name === layoutName);
      if (selectedLayout === undefined) {
          throw new Error('handleLayoutSelectChange');
      } else {
          this._goldenLayout.loadLayout(selectedLayout.config);
      }
  }

  handleSaveLayoutButtonClick() {
      this._savedLayout = this._goldenLayout.saveLayout();
      this._reloadSavedLayoutButton.disabled = false;
  }

  handleReloadSavedLayoutClick() {
      if (this._savedLayout === undefined) {
          throw new Error('No saved layout');
      } else {
          const userLayoutConfig = UserLayoutConfig.fromLayoutConfig(this._savedLayout);
          this._goldenLayout.loadLayout(userLayoutConfig);
      }
  }

  private loadRegisteredComponentTypesSelect() {
      this._registeredComponentTypesSelect.options.length = 0;
      const names = this._goldenLayoutComponentService.getRegisteredComponentTypeNames();
      for (const name of names) {
          const option = new Option(name);
          this._registeredComponentTypesSelect.options.add(option);
      }
  }

  private getAvailableLayouts(): Layout[] {
      return prefinedLayouts;
  }

  private loadLayoutSelect() {
      this._layoutSelect.options.length = 0;
      const layouts = this.getAvailableLayouts();
      for (const layout of layouts) {
          const option = new Option(layout.name);
          this._layoutSelect.options.add(option);
      }
  }
}

