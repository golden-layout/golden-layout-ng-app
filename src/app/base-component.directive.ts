import { Directive, InjectionToken } from '@angular/core';
import {
    ComponentContainer
} from "golden-layout";
  
@Directive()
export abstract class BaseComponentDirective {
    constructor(public rootHtmlElement: HTMLElement) {

    }

    setPositionAndSize(left: number, top: number, width: number, height: number) {
        this.rootHtmlElement.style.left = this.numberToPixels(left);
        this.rootHtmlElement.style.top = this.numberToPixels(top);
        this.rootHtmlElement.style.width = this.numberToPixels(width);
        this.rootHtmlElement.style.height = this.numberToPixels(height);
    } 

    setVisibility(visible: boolean) {
        if (visible) {
            this.rootHtmlElement.style.display = '';
        } else {
            this.rootHtmlElement.style.display = 'none';
        }
    }

    setZIndex(value: string) {
        this.rootHtmlElement.style.zIndex = value;
    }

    private numberToPixels(value: number): string {
        return value.toString(10) + 'px';
    }
}

export namespace BaseComponentDirective {
    const GoldenLayoutContainerTokenName = 'GoldenLayoutContainer'; 
    export const GoldenLayoutContainerInjectionToken = new InjectionToken<ComponentContainer>(GoldenLayoutContainerTokenName);
}
