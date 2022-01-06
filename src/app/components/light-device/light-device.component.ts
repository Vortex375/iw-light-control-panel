import { Component, Input } from '@angular/core';
import { LightDeviceService } from 'app/services/light-device.service';

@Component({
  selector: 'ngx-light-device',
  templateUrl: './light-device.component.html'
})
export class LightDeviceComponent {

  @Input() device: any;

  constructor(private readonly deviceService: LightDeviceService) {}

  toggle(onOff: boolean) {
    if (onOff) {
      this.deviceService.setDevice(this.device.$name, { state: 'ON' });
    } else {
      this.deviceService.setDevice(this.device.$name, { state: 'OFF' });
    }
  }
}
