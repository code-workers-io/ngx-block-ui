import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockUIComponent } from './core/components/block-ui/block-ui.component';
import { BlockUIContentComponent } from './core/components/block-ui-content/block-ui-content.component';
import { BlockUIInstanceService } from './core/services/block-ui-instance.service';
import { BlockUIService } from './core/services/block-ui.service';
import { BlockUIDirective } from './core/directives/block-ui.directive';
import { BlockUISettings } from './core/models/block-ui-settings.model';

export const BlockUIServiceInstance = new BlockUIInstanceService();

// Needed for AOT compiling
export const BlockUIModuleSettings = new InjectionToken<string>(
  'BlockUIModuleSettings'
);

export function provideInstance(
  settings: BlockUISettings
): BlockUIInstanceService {
  BlockUIServiceInstance.updateSettings(settings);
  return BlockUIServiceInstance;
}

@NgModule({
  imports: [CommonModule],
  entryComponents: [BlockUIComponent, BlockUIContentComponent],
  declarations: [BlockUIComponent, BlockUIDirective, BlockUIContentComponent],
  exports: [BlockUIComponent, BlockUIDirective, BlockUIContentComponent],
})
export class NgxBlockUiModule {
  public static forRoot(
    settings: BlockUISettings = {}
  ): ModuleWithProviders<NgxBlockUiModule> {
    return {
      ngModule: NgxBlockUiModule,
      providers: [
        {
          provide: BlockUIModuleSettings,
          useValue: settings,
        },
        {
          provide: BlockUIInstanceService,
          useFactory: provideInstance,
          deps: [BlockUIModuleSettings],
        },
        BlockUIService,
      ],
    };
  }
}
