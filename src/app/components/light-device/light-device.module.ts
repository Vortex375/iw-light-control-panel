import { NgModule } from '@angular/core';
import { NbCardModule, NbToggleModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { LightDeviceComponent } from './light-device.component';

@NgModule({
  declarations: [
    LightDeviceComponent,
  ],
  imports: [
    NbCardModule,
    NbToggleModule,
    ThemeModule,
  ],
  exports: [
    LightDeviceComponent,
  ],
})
export class LightDeviceModule {}
