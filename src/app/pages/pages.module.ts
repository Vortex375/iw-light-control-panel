import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DevicesModule } from './devices/devices.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ScenesModule } from './scenes/scenes.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DevicesModule,
    ScenesModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
