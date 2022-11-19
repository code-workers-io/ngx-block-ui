import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { BlockElementComponent } from './block-element.component';
import {NgxBlockUiModule} from "@code-workers.io/ngx-block-ui";

@NgModule({
  imports: [
    BrowserModule,
    NgxBlockUiModule
  ],
  declarations: [
    BlockElementComponent
  ],
  exports: [
    BlockElementComponent
  ],
  entryComponents: [ BlockElementComponent ]
})
export class BlockElementModule { }
