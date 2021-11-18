import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {
  DragSource,
  GoldenLayout,
  LayoutConfig,
  ResolvedLayoutConfig
} from "golden-layout";
import { ColorComponent } from "./color.component";
import { GoldenLayoutComponentService } from './golden-layout-component.service';
import { GoldenLayoutHostComponent } from './golden-layout-host.component';
import { predefinedLayoutNames, predefinedLayouts } from './predefined-layouts';
import { TextComponent } from './text.component';

@Component({
  selector: 'app-controls',
  template: `
    <section id="virtualOrEmbeddedSection">
      <section id="embeddedSection">
        <section id="embeddedRadioSection">
          <input #embeddedRadio
            id="embeddedRadio"
            type="radio"
            name="virtualOrEmbedded"
            (click)="handleEmbeddedRadioClick()"
          />
          <label for="embeddedRadio">Embedded</label>
        </section>
      </section>
      <section id="virtualSection">
        <section id="virtualRadioSection">
          <input #virtualRadio
            id="virtualRadio"
            type="radio"
            name="virtualOrEmbedded"
            (click)="handleVirtualRadioClick()"
          />
          <label for="virtualRadio">Virtual</label>
        </section>
        <section id="viewComponentRefOrAppRefSection">
          <section id="viewComponentRefRadioSection">
            <input #viewComponentRefRadio
              id="viewComponentRefRadio"
              type="radio"
              name="viewComponentRefOrAppRef"
              (click)="handleViewComponentRefRadioClick()"
            />
            <label for="viewComponentRefRadio">View Comp Ref</label>
          </section>
          <section id="appRefRadioSection">
            <input #appRefRadio
              id="appRefRadio"
              type="radio"
              name="viewComponentRefOrAppRef"
              (click)="handleAppRefRadioClick()"
            />
            <label for="appRefRadio">App Ref</label>
          </section>
        </section>
      </section>
    </section>
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
    <section id="dragSection">
      <button class="draggable control" #dragMe>Drag me !</button>
    </section>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      white-space: nowrap;
    }

    .control {
      margin: 2px;
    }

    .draggable {
      cursor: move;
    }

    #viewComponentRefOrAppRefSection {
      display: flex;
      margin-left: 1em;
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

    #dragSection {
      display: flex;
      flex-direction: column;
    }
  `
  ]
})
export class ControlsComponent implements OnDestroy {
  private _goldenLayoutHostComponent: GoldenLayoutHostComponent
  private _goldenLayout: GoldenLayout;
  private _savedLayout: ResolvedLayoutConfig | undefined;

  private _selectedRegisteredComponentTypeName: string;
  private _componentTextValue: string;
  private _selectedLayoutName: string;
  private _dragSources: Array<DragSource | undefined> = [];

  @ViewChild('dragMe') private _dragMeElementRef: ElementRef;
  @ViewChild('virtualRadio') private _virtualRadioElementRef: ElementRef<HTMLInputElement>;
  @ViewChild('viewComponentRefRadio') private _viewComponentRefRadioElementRef: ElementRef<HTMLInputElement>;
  @ViewChild('appRefRadio') private _appRefRadioElementRef: ElementRef<HTMLInputElement>;

  public registeredComponentTypeNames: readonly string[];
  public initialRegisteredComponentTypeName: string;
  public initialComponentTextValue = 'Water';
  public layoutNames: readonly string[];
  public initialLayoutName: string;
  public saveLayoutButtonDisabled = true;

  get element() {
    return this._elRef.nativeElement;
  }

  constructor(private _elRef: ElementRef<HTMLElement>,
              private _goldenLayoutComponentService: GoldenLayoutComponentService
  ) {
  }

  ngOnDestroy() {
    for (const dragSource of this._dragSources) {
      if (dragSource) {
        this._goldenLayout.removeDragSource(dragSource);
      }
    }
  }

  initialise(value: GoldenLayoutHostComponent) {
    this._goldenLayoutHostComponent = value;
    this._goldenLayout = this._goldenLayoutHostComponent.goldenLayout;

    this._virtualRadioElementRef.nativeElement.checked = this._goldenLayoutHostComponent.virtualActive;
    this.updateViewComponentRefRadio();
    this.registeredComponentTypeNames = this._goldenLayoutComponentService.getRegisteredComponentTypeNames();
    this._selectedRegisteredComponentTypeName = this.registeredComponentTypeNames[0]
    this.initialRegisteredComponentTypeName = this._selectedRegisteredComponentTypeName;
    this._componentTextValue = this.initialComponentTextValue;
    this.layoutNames = predefinedLayoutNames;
    this._selectedLayoutName = this.layoutNames[0]
    this.initialLayoutName = this._selectedLayoutName;

    this.initialiseDragSources();
  }

  handleEmbeddedRadioClick() {
    this._goldenLayoutHostComponent.setVirtualActive(this._virtualRadioElementRef.nativeElement.checked);
    this.updateViewComponentRefRadio();
  }

  handleVirtualRadioClick() {
    this._goldenLayoutHostComponent.setVirtualActive(this._virtualRadioElementRef.nativeElement.checked);
    this.updateViewComponentRefRadio();
  }

  handleViewComponentRefRadioClick() {
    this._goldenLayoutHostComponent.setViewContainerRefActive(this._viewComponentRefRadioElementRef.nativeElement.checked);
  }

  handleAppRefRadioClick() {
    this._goldenLayoutHostComponent.setViewContainerRefActive(this._viewComponentRefRadioElementRef.nativeElement.checked);
  }

  handleRegisteredComponentTypeSelectChange(value: string) {
    this._selectedRegisteredComponentTypeName = value;
  }

  handleComponentTextInputInput(value: string) {
    this._componentTextValue = value;
  }

  handleAddComponentButtonClick() {
    const componentType = this._selectedRegisteredComponentTypeName;
    this._goldenLayout.addComponent(componentType);
  }

  handleAddTextComponentButtonClick() {
    // this demonstrates how to access created Angular component
    const goldenLayoutComponent = this._goldenLayout.newComponent(TextComponent.componentTypeName); // do not set state here
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
      const layoutConfig = LayoutConfig.fromResolved(this._savedLayout);
      this._goldenLayout.loadLayout(layoutConfig);
    }
  }

  private initialiseDragSources() {
    this.loadDragSource('Drag me !', ColorComponent.componentTypeName, this._dragMeElementRef);
  }

  private loadDragSource(title: string, componentName: string, element: ElementRef | undefined): void {
    if (!this._goldenLayout) {
      return;
    }

    const config = () => {
      const item: DragSource.ComponentItemConfig = {
        state: undefined,
        title,
        type: componentName,
      };
      return item;
    };
    this._dragSources.push(this._goldenLayout.newDragSource(element?.nativeElement, config));
  }

  private updateViewComponentRefRadio() {
    const viewComponentRefActive = this._goldenLayoutHostComponent.viewContainerRefActive;
    this._viewComponentRefRadioElementRef.nativeElement.checked = viewComponentRefActive;
    this._appRefRadioElementRef.nativeElement.checked = !viewComponentRefActive;
    const virtualActive = this._goldenLayoutHostComponent.virtualActive;
    this._viewComponentRefRadioElementRef.nativeElement.disabled = !virtualActive;
    this._appRefRadioElementRef.nativeElement.disabled = !virtualActive;
  }
}
