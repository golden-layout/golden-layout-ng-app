import { Directive, InjectionToken } from '@angular/core';
import {
    ComponentContainer
} from "golden-layout";
  
@Directive()
export abstract class BaseComponentDirective {
}

export namespace BaseComponentDirective {
    const GoldenLayoutContainerTokenName = 'GoldenLayoutContainer'; 
    export const GoldenLayoutContainerInjectionToken = new InjectionToken<ComponentContainer>(GoldenLayoutContainerTokenName);
}
