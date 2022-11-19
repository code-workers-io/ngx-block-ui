import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxBlockUiModule } from '@code-workers.io/ngx-block-ui';

import { BlockUIPreventNavigation } from './block-ui-prevent-navigation.service';


@NgModule({
  imports: [
    NgxBlockUiModule
  ]
})
export class NgxBlockUIRouterModule {
  public static forRoot(): ModuleWithProviders<NgxBlockUIRouterModule> {
    return {
      ngModule: NgxBlockUIRouterModule,
      providers: [
        BlockUIPreventNavigation
      ]
    };
  }
}

