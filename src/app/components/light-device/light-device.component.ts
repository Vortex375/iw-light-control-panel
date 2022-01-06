import { Component, Input } from '@angular/core';
import { LightDeviceService } from 'app/services/light-device.service';

@Component({
  selector: 'ngx-light-device',
  templateUrl: './light-device.component.html',
  styleUrls: ['./light-device.component.css'],
})
export class LightDeviceComponent {

  @Input() device: any;

  colorTempModeEnabled: boolean = false;

  constructor(private readonly deviceService: LightDeviceService) {}

  toggle(onOff: boolean) {
    if (onOff) {
      this.deviceService.setDevice(this.device.$name, { state: 'ON' });
    } else {
      this.deviceService.setDevice(this.device.$name, { state: 'OFF' });
    }
  }

  changeBrightness({ value }: { value: number }) {
    this.deviceService.setDevice(this.device.$name, { brightness: value });
  }

  changeColorTemp({ value }: { value: number }) {
    this.colorTempModeEnabled = true;
    this.deviceService.setDevice(this.device.$name, { color_temp_percent: undefined, color: undefined, color_temp: value });
  }
}
