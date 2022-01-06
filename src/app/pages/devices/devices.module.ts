import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { LightDeviceModule } from 'app/components/light-device/light-device.module';

import { ThemeModule } from '../../@theme/theme.module';
import { DevicesComponent } from './devices.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    LightDeviceModule,
  ],
  declarations: [
    DevicesComponent,
  ],
})
export class DevicesModule { }
