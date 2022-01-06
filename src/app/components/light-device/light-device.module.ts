import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbRadioModule, NbToggleModule } from '@nebular/theme';
import { MatSliderModule } from '@angular/material/slider';
import { ThemeModule } from 'app/@theme/theme.module';
import { LightDeviceComponent } from './light-device.component';
import { NgxColorsModule } from 'ngx-colors';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LightDeviceComponent,
  ],
  imports: [
    FormsModule,
    NbCardModule,
    NbIconModule,
    NbRadioModule,
    NbToggleModule,
    NgxColorsModule,
    MatSliderModule,
    ThemeModule,
  ],
  exports: [
    LightDeviceComponent,
  ],
})
export class LightDeviceModule {}
