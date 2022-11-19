import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlockUIHttpSettings } from './block-ui-http-settings.service';
import { BlockUIInterceptor } from './block-ui-http.interceptor';
import { HttpSettings, NgxBlockUiModule } from '@code-workers.io/ngx-block-ui';


// Needed for AOT compiling
export const NgxBlockUIHttpModuleSettings = new InjectionToken<string>('NgxBlockUIHttpModuleSettings');

export function provideSettingsInstance(settings: HttpSettings): BlockUIHttpSettings {
  return {
    settings: {
      blockAllRequestsInProgress: true,
      ...settings
    }
  };
}

@NgModule({
  imports: [NgxBlockUiModule]
})
export class NgxBlockUIHttpModule {
  static forRoot(settings: HttpSettings = {}): ModuleWithProviders<NgxBlockUIHttpModule> {
    return {
      ngModule: NgxBlockUIHttpModule,
      providers: [
        {
          provide: NgxBlockUIHttpModuleSettings,
          useValue: settings
        },
        {
          provide: BlockUIHttpSettings,
          useFactory: provideSettingsInstance,
          deps: [NgxBlockUIHttpModuleSettings]
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: BlockUIInterceptor,
          multi: true
        }
      ]
    };
  }
}
