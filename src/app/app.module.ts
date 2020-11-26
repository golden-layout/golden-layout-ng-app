import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BooleanComponent } from './boolean.component';
import { ColorComponent } from './color.component';
import { ControlsComponent } from './controls.component';
import { GoldenLayoutComponentService } from './golden-layout-component.service';
import { GoldenLayoutHostComponent } from './golden-layout-host.component';
import { TextComponent } from './text.component';


@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    GoldenLayoutHostComponent,
    TextComponent,
    ColorComponent,
    BooleanComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [GoldenLayoutComponentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
