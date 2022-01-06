import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbRadioModule, NbToggleModule } from '@nebular/theme';
import { MatSliderModule } from '@angular/material/slider';
import { ThemeModule } from 'app/@theme/theme.module';
import { LightDeviceComponent } from './light-device.component';

@NgModule({
  declarations: [
    LightDeviceComponent,
  ],
  imports: [
    NbCardModule,
    NbIconModule,
    NbRadioModule,
    NbToggleModule,
    MatSliderModule,
    ThemeModule,
  ],
  exports: [
    LightDeviceComponent,
  ],
})
export class LightDeviceModule {}
