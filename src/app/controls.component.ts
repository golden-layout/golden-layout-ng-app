import { AfterViewInit, Component, ElementRef } from '@angular/core';
import {
  GoldenLayout,
  LayoutConfig,
  UserLayoutConfig,
  UserSerialisableComponentConfig
} from "golden-layout";
import { GoldenLayoutComponentService } from './golden-layout-component.service';
import { GoldenLayoutHostComponent } from './golden-layout-host.component';
import { predefinedLayoutNames, predefinedLayouts } from './predefined-layouts';
import { TextComponent } from './text.component';

@Component({
  selector: 'app-controls',
  template: `
    <section id="addComponentSection">
      <select #registeredComponentTypeSelect
        id="registeredComponentTypeSelect"
        class="control"
        [value]="initialRegisteredComponentTypeName"
        (change)="handleRegisteredComponentTypeSelectChange(registeredComponentTypeSelect.value)"
      >
        <option *ngFor="let name of registeredComponentTypeNames">{{name}}</option>
      </select>
      <button #addComponentButton id="addComponentButton" class="control" (click)="handleAddComponentButtonClick()">Add Component</button>
    </section>
    <section id="addTextComponentSection">
      <input #componentTextInput id="componentTextInput"
        class="control"
        size="8"
        [value]="initialComponentTextValue"
        (input)="handleComponentTextInputInput(componentTextInput.value)"
      />
      <button #addTextComponentButton
        id="addTextComponentButton"
        class="control"
        (click)="handleAddTextComponentButtonClick()"
      >Add Text Component</button>
    </section>
    <section id="predefinedLayoutsSection">
      <select #layoutSelect
        id="layoutSelect"
        class="control"
        [value]="initialLayoutName"
        (change)="handleLayoutSelectChange(layoutSelect.value)"
      >
        <option *ngFor="let name of layoutNames">{{name}}</option>
      </select>
      <button #loadLayoutButton id="loadLayoutButton" class="control" (click)="handleLoadLayoutButtonClick()">Load Layout</button>
    </section>
    <section id="saveAndReloadLayoutSection">
      <button #saveLayoutButton id="saveLayoutButton" class="control" (click)="handleSaveLayoutButtonClick()">Save Layout</button>
      <button #reloadSavedLayoutButton 
        id="reloadSavedLayoutButton"
        class="control"
        [disabled]="saveLayoutButtonDisabled === true ? true : null"
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

    #addTextComponentSection {
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
  private _goldenLayoutHostComponent: GoldenLayoutHostComponent
  private _goldenLayout: GoldenLayout;
  private _savedLayout: LayoutConfig | undefined;

  private _selectedRegisteredComponentTypeName: string;
  private _componentTextValue: string;
  private _selectedLayoutName: string;

  public registeredComponentTypeNames: readonly string[];
  public initialRegisteredComponentTypeName: string;
  public initialComponentTextValue = 'Water';
  public layoutNames: readonly string[];
  public initialLayoutName: string;
  public saveLayoutButtonDisabled = true;

  get element() { return this._elRef.nativeElement; }

  constructor(private _elRef: ElementRef<HTMLElement>,
    private _goldenLayoutComponentService: GoldenLayoutComponentService
  ) { }

  ngAfterViewInit() {
    setInterval(() => this.initialiseControls(), 0);
  }

  setGoldenLayoutHostComponent(value: GoldenLayoutHostComponent) {
    this._goldenLayoutHostComponent = value;
    this._goldenLayout = this._goldenLayoutHostComponent.goldenLayout;
  }

  handleRegisteredComponentTypeSelectChange(value: string) {
    this._selectedRegisteredComponentTypeName = value;
  }

  handleComponentTextInputInput(value: string) {
    this._componentTextValue = value;
  }

  handleAddComponentButtonClick() {
    const userItemConfig: UserSerialisableComponentConfig = {
        componentName: this._selectedRegisteredComponentTypeName,
        type: 'component',
    }
    this._goldenLayout.addItem(userItemConfig, 0);
  }

  handleAddTextComponentButtonClick() {
    // this demonstrates how to access created Angular component
    const goldenLayoutComponent = this._goldenLayout.newSerialisableComponent(TextComponent.name); // do not set state here
    const componentRef = this._goldenLayoutHostComponent.getComponentRef(goldenLayoutComponent.container);
    if (componentRef === undefined) {
      throw new Error('Unexpected error getting ComponentRef');
    } else {
      const textComponent = componentRef.instance as TextComponent;
      textComponent.setInitialValue(this._componentTextValue);
    }
  }

  handleLayoutSelectChange(value: string) {
    this._selectedLayoutName = value;
  }

  handleLoadLayoutButtonClick() {
    const selectedLayout = predefinedLayouts.find((layout) => layout.name === this._selectedLayoutName);
    if (selectedLayout === undefined) {
        throw new Error('handleLoadLayoutButtonClick Error');
    } else {
        this._goldenLayout.loadLayout(selectedLayout.config);
    }
  }

  handleSaveLayoutButtonClick() {
    this._savedLayout = this._goldenLayout.saveLayout();
    this.saveLayoutButtonDisabled = false;
  }

  handleReloadSavedLayoutClick() {
    if (this._savedLayout === undefined) {
        throw new Error('No saved layout');
    } else {
        const userLayoutConfig = UserLayoutConfig.fromLayoutConfig(this._savedLayout);
        this._goldenLayout.loadLayout(userLayoutConfig);
    }
  }

  private initialiseControls() {
    this.registeredComponentTypeNames = this._goldenLayoutComponentService.getRegisteredComponentTypeNames();
    this._selectedRegisteredComponentTypeName = this.registeredComponentTypeNames[0]
    this.initialRegisteredComponentTypeName = this._selectedRegisteredComponentTypeName;
    this._componentTextValue = this.initialComponentTextValue;
    this.layoutNames = predefinedLayoutNames;
    this._selectedLayoutName = this.layoutNames[0]
    this.initialLayoutName = this._selectedLayoutName;
  }
}

