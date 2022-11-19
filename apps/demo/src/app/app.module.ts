import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {
  BlockUIPreventNavigation,
  NgxBlockUIRouterModule,
} from '@code-workers.io/ngx-block-ui/router';
import { DefaultComponent } from './default/default.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MultiHttpComponent } from './multi-http/multi-http.component';
import { RouterModule, Routes } from '@angular/router';
import { BlockElementModule } from './block-element/block-element.module';
import { NgxBlockUIHttpModule } from '@code-workers.io/ngx-block-ui/http';
import { BlockTemplateComponent } from './block-template/block-template.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxBlockUiModule } from '@code-workers.io/ngx-block-ui';

const appRoutes: Routes = [
  {
    path: '',
    canActivateChild: [BlockUIPreventNavigation],
    children: [
      { path: '', component: DefaultComponent },
      { path: 'landing-page', component: LandingPageComponent },
      { path: 'multi-http', component: MultiHttpComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    BlockTemplateComponent,
    DefaultComponent,
    LandingPageComponent,
    MultiHttpComponent,
  ],
  imports: [
    BrowserModule,
    BlockElementModule,
    NgxBlockUiModule.forRoot({
      message: 'Global Default Message',
      template: BlockTemplateComponent,
    }),
    NgxBlockUIRouterModule.forRoot(),
    NgxBlockUIHttpModule.forRoot({
      requestFilters: [], // /\/api.github.com\/users\//
    }),
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
