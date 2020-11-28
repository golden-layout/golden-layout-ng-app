import { ApplicationRef, Component, ComponentRef, ElementRef, EmbeddedViewRef, OnDestroy } from '@angular/core';
import {
  ComponentContainer,
  ComponentItem,
  GoldenLayout
} from "golden-layout";
import { BaseComponentDirective } from './base-component.directive';
import { BooleanComponent } from './boolean.component';
import { ColorComponent } from './color.component';
import { GoldenLayoutComponentService } from './golden-layout-component.service';
import { TextComponent } from './text.component';

@Component({
  selector: 'app-golden-layout-host',
  template: '',
  styles: [`
    :host {
      height: 100%;
      width: 100%;
      padding: 0;
    }
    `,
  ],
})
export class GoldenLayoutHostComponent implements OnDestroy {
  private _goldenLayout: GoldenLayout;
  private _containerMap = new Map<ComponentContainer, ComponentRef<BaseComponentDirective>>();

  get goldenLayout() { return this._goldenLayout; }

  constructor(private _elRef: ElementRef<HTMLElement>,
    private appRef: ApplicationRef,
    private goldenLayoutComponentService: GoldenLayoutComponentService,
  ) {
    this._goldenLayout = new GoldenLayout(this._elRef.nativeElement);
    this._goldenLayout.getComponentEvent = (container) => this.handleGetComponentEvent(container);
    this._goldenLayout.releaseComponentEvent = (container, component) => this.handleReleaseComponentEvent(container, component);

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
    return this._containerMap.get(container);
  }

  private handleGetComponentEvent(container: ComponentContainer) {
    const componentTypeName = container.componentItemConfig.componentName;
    const componentRef = this.goldenLayoutComponentService.createComponent(componentTypeName, container);

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;
    container.contentElement.appendChild(domElem);

    this._containerMap.set(container, componentRef);
  }

  private handleReleaseComponentEvent(container: ComponentContainer, component: ComponentItem.Component) {
    const componentRef = this._containerMap.get(container);
    if (componentRef === undefined) {
      throw new Error('Could not release component. Container not found');
    } else {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
      this._containerMap.delete(container);
    }
  }
}
