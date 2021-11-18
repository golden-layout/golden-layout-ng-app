import { ApplicationRef, Component, ComponentRef, ElementRef, EmbeddedViewRef, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import {
  ComponentContainer, GoldenLayout,
  LogicalZIndex,
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
  private _virtualActive = true;
  private _viewContainerRefActive = false;
  private _componentRefMap = new Map<ComponentContainer, ComponentRef<BaseComponentDirective>>();
  private _goldenLayoutBoundingClientRect: DOMRect = new DOMRect();

  private _goldenLayoutBindComponentEventListener =
    (container: ComponentContainer, itemConfig: ResolvedComponentItemConfig) => this.handleBindComponentEvent(container, itemConfig);
  private _goldenLayoutUnbindComponentEventListener =
    (container: ComponentContainer) => this.handleUnbindComponentEvent(container);

  @ViewChild('componentViewContainer', { read: ViewContainerRef, static: true }) private _componentViewContainerRef: ViewContainerRef;

  get goldenLayout() { return this._goldenLayout; }
  get virtualActive() { return this._virtualActive; }
  get viewContainerRefActive() { return this._viewContainerRefActive; }
  get isGoldenLayoutSubWindow() { return this._goldenLayout.isSubWindow; }

  constructor(private _appRef: ApplicationRef,
    private _elRef: ElementRef<HTMLElement>,
    private goldenLayoutComponentService: GoldenLayoutComponentService,
  ) {
    this._goldenLayoutElement = this._elRef.nativeElement;

    this.goldenLayoutComponentService.registerComponentType(ColorComponent.componentTypeName, ColorComponent);
    this.goldenLayoutComponentService.registerComponentType(TextComponent.componentTypeName, TextComponent);
    this.goldenLayoutComponentService.registerComponentType(BooleanComponent.componentTypeName, BooleanComponent);
  }

  ngOnDestroy() {
    this._goldenLayout.destroy();
  }

  initialise() {
    this._goldenLayout = new GoldenLayout(
      this._goldenLayoutElement,
      this._goldenLayoutBindComponentEventListener,
      this._goldenLayoutUnbindComponentEventListener,
    );
    this._goldenLayout.beforeVirtualRectingEvent = (count) => this.handleBeforeVirtualRectingEvent(count);

    if (this._goldenLayout.isSubWindow) {
      this._goldenLayout.checkAddDefaultPopinButton();
    }
  }

  setVirtualActive(value: boolean) {
    this._goldenLayout.clear();
    this._virtualActive = value;
    if (!this._virtualActive) {
      this._viewContainerRefActive = false;
    }
  }

  setViewContainerRefActive(value: boolean) {
    this._goldenLayout.clear();
    if (value && !this.virtualActive) {
      throw new Error('ViewContainerRef active only possible if VirtualActive');
    }
    this._viewContainerRefActive = value;
  }

  setSize(width: number, height: number) {
    this._goldenLayout.setSize(width, height)
  }

  getComponentRef(container: ComponentContainer) {
    return this._componentRefMap.get(container);
  }

  private handleBindComponentEvent(container: ComponentContainer, itemConfig: ResolvedComponentItemConfig): ComponentContainer.BindableComponent {
    const componentType = itemConfig.componentType;
    const componentRef = this.goldenLayoutComponentService.createComponent(componentType, container);
    const component = componentRef.instance;

    this._componentRefMap.set(container, componentRef);

    if (this._virtualActive) {
      container.virtualRectingRequiredEvent = (container, width, height) => this.handleContainerVirtualRectingRequiredEvent(container, width, height);
      container.virtualVisibilityChangeRequiredEvent = (container, visible) => this.handleContainerVisibilityChangeRequiredEvent(container, visible);
      container.virtualZIndexChangeRequiredEvent = (container, logicalZIndex, defaultZIndex) => this.handleContainerVirtualZIndexChangeRequiredEvent(container, logicalZIndex, defaultZIndex);

      if (this._viewContainerRefActive) {
        this._componentViewContainerRef.insert(componentRef.hostView);
      } else {
        this._appRef.attachView(componentRef.hostView);
        const componentRootElement = component.rootHtmlElement;
        this._goldenLayoutElement.appendChild(componentRootElement);
      }
    } else {
      this._appRef.attachView(componentRef.hostView);
      const domElem = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;
      container.element.appendChild(domElem);
    }

    return {
      component,
      virtual: this._virtualActive,
    }
  }

  private handleUnbindComponentEvent(container: ComponentContainer) {
    const componentRef = this._componentRefMap.get(container);
    if (componentRef === undefined) {
      throw new Error('Could not unbind component. Container not found');
    }
    this._componentRefMap.delete(container);

    const hostView = componentRef.hostView;

    if (container.virtual) {
      if (this._viewContainerRefActive) {
        const viewRefIndex = this._componentViewContainerRef.indexOf(hostView);
        if (viewRefIndex < 0) {
          throw new Error('Could not unbind component. ViewRef not found');
        }
        this._componentViewContainerRef.remove(viewRefIndex);
      } else {
        const component = componentRef.instance;
        const componentRootElement = component.rootHtmlElement;
        this._goldenLayoutElement.removeChild(componentRootElement);
        this._appRef.detachView(hostView);
      }
    } else {
      const component = componentRef.instance;
      const componentRootElement = component.rootHtmlElement;
      container.element.removeChild(componentRootElement);
      this._appRef.detachView(hostView);
    }

    componentRef.destroy();
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

  private handleContainerVirtualZIndexChangeRequiredEvent(container: ComponentContainer, logicalZIndex: LogicalZIndex, defaultZIndex: string) {
    const componentRef = this._componentRefMap.get(container);
    if (componentRef === undefined) {
        throw new Error('handleContainerVirtualZIndexChangeRequiredEvent: ComponentRef not found');
    }
    const component = componentRef.instance;
    component.setZIndex(defaultZIndex);
  }
}
