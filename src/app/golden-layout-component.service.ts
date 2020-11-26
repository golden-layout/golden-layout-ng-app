import { ComponentFactoryResolver, Injectable, Injector, StaticProvider, Type } from '@angular/core';
import {
    ComponentContainer
} from "golden-layout";
import { BaseComponentDirective } from './base-component.directive';

@Injectable({
  providedIn: 'root'
})
export class GoldenLayoutComponentService {
  private _componentTypeMap = new Map<string, Type<BaseComponentDirective>>()

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  registerComponentType(name: string, componentType: Type<BaseComponentDirective>) {
    this._componentTypeMap.set(name, componentType);
  }

  getRegisteredComponentTypeNames(): string[] {
    const count = this._componentTypeMap.size;
    const result = new Array<string>(count);
    let idx = 0;
    for (let [key, value] of this._componentTypeMap) {
      result[idx++] = key;
    }
    return result;
  }

  createComponent(componentTypeName: string, container: ComponentContainer) {
    const componentType = this._componentTypeMap.get(componentTypeName);
    if (componentType === undefined) {
      throw new Error('Unknown component type')
    } else {
      const provider: StaticProvider = { provide: BaseComponentDirective.GoldenLayoutContainerInjectionToken, useValue: container };
      const injector = Injector.create({
        providers: [provider]
      });
      const componentFactoryRef = this.componentFactoryResolver.resolveComponentFactory<BaseComponentDirective>(componentType);
      return componentFactoryRef.create(injector);
    }
  }
}
