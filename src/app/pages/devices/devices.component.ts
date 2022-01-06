import { Component } from '@angular/core';
import { LightDeviceService } from 'app/services/light-device.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './devices.component.html',
})
export class DevicesComponent {

  constructor(readonly deviceService: LightDeviceService) {}
}
