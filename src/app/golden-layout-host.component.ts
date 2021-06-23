import { Component, ComponentRef, ElementRef, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import {
  ComponentContainer, GoldenLayout,
  ResolvedComponentItemConfig
} from "golden-layout";
import { BaseComponentDirective } from './base-component.directive';
import { BooleanComponent } from './boolean.component';
import { ColorComponent } from './color.component';
import { GoldenLayoutComponentService } from './golden-layout-component.service';
import { TextComponent } from './text.component';

@Component({
  selector: 'app-golden-layout-host',
  template: '<ng-template #componentViewContainer></ng-template>',
  styles: [`
    :host {
      height: 100%;
      width: 100%;
      padding: 0;
      position: relative;
    }
    `,
  ],
})
export class GoldenLayoutHostComponent implements OnDestroy {
  private _goldenLayout: GoldenLayout;
  private _goldenLayoutElement: HTMLElement;
  private _componentRefMap = new Map<ComponentContainer, ComponentRef<BaseComponentDirective>>();
  private _goldenLayoutBoundingClientRect: DOMRect = new DOMRect();

  @ViewChild('componentViewContainer', { read: ViewContainerRef, static: true }) private _componentViewContainerRef: ViewContainerRef;

  get goldenLayout() { return this._goldenLayout; }

  constructor(private _elRef: ElementRef<HTMLElement>,
    private goldenLayoutComponentService: GoldenLayoutComponentService,
  ) {
    this._goldenLayoutElement = this._elRef.nativeElement;
    this._goldenLayout = new GoldenLayout(this._goldenLayoutElement);
    this._goldenLayout.bindComponentEvent = (container, itemConfig) => this.handleBindComponentEvent(container, itemConfig);
    this._goldenLayout.unbindComponentEvent = (container) => this.handleUnbindComponentEvent(container);
    this._goldenLayout.beforeVirtualRectingEvent = (count) => this.handleBeforeVirtualRectingEvent(count)

    this.goldenLayoutComponentService.registerComponentType(ColorComponent.name, ColorComponent);
    this.goldenLayoutComponentService.registerComponentType(TextComponent.name, TextComponent);
    this.goldenLayoutComponentService.registerComponentType(BooleanComponent.name, BooleanComponent);
  }

  ngOnDestroy() {
    this._goldenLayout.destroy();
  }

  setSize(width: number, height: number) {
    this._goldenLayout.setSize(width, height)
  }

  getComponentRef(container: ComponentContainer) {
    return this._componentRefMap.get(container);
  }

  private handleBindComponentEvent(container: ComponentContainer, itemConfig: ResolvedComponentItemConfig) {
    const componentType = itemConfig.componentType;
    const componentRef = this.goldenLayoutComponentService.createComponent(componentType, container);
    
    container.virtualRectingRequiredEvent = (container, width, height) => this.handleContainerVirtualRectingRequiredEvent(container, width, height);
    container.virtualVisibilityChangeRequiredEvent = (container, visible) => this.handleContainerVisibilityChangeRequiredEvent(container, visible);

    this._componentViewContainerRef.insert(componentRef.hostView);
    this._componentRefMap.set(container, componentRef);
  }

  private handleUnbindComponentEvent(container: ComponentContainer) {
    const componentRef = this._componentRefMap.get(container);
    if (componentRef === undefined) {
      throw new Error('Could not unbind component. Container not found');
    }
    this._componentRefMap.delete(container);

    const viewRefIndex = this._componentViewContainerRef.indexOf(componentRef.hostView);
    if (viewRefIndex < 0) {
      throw new Error('Could not unbind component. ViewRef not found');
    }
    this._componentViewContainerRef.remove(viewRefIndex);
  }

  private handleBeforeVirtualRectingEvent(count: number) {
    this._goldenLayoutBoundingClientRect = this._goldenLayoutElement.getBoundingClientRect();
  }

  private handleContainerVirtualRectingRequiredEvent(container: ComponentContainer, width: number, height: number) {
    const containerBoundingClientRect = container.element.getBoundingClientRect();
    const left = containerBoundingClientRect.left - this._goldenLayoutBoundingClientRect.left;
    const top = containerBoundingClientRect.top - this._goldenLayoutBoundingClientRect.top;

    const componentRef = this._componentRefMap.get(container);
    if (componentRef === undefined) {
        throw new Error('handleContainerVirtualRectingRequiredEvent: ComponentRef not found');
    }
    const component = componentRef.instance;
    component.setPositionAndSize(left, top, width, height);
  }

  private handleContainerVisibilityChangeRequiredEvent(container: ComponentContainer, visible: boolean) {
    const componentRef = this._componentRefMap.get(container);
    if (componentRef === undefined) {
        throw new Error('handleContainerVisibilityChangeRequiredEvent: ComponentRef not found');
    }
    const component = componentRef.instance;
    component.setVisibility(visible);
  }
}
