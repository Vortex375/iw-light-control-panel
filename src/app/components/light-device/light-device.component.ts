import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LightDeviceService } from 'app/services/light-device.service';

@Component({
  selector: 'ngx-light-device',
  templateUrl: './light-device.component.html',
  styleUrls: ['./light-device.component.css'],
})
export class LightDeviceComponent implements OnChanges {

  @Input() device: any;

  colorTempModeEnabled: boolean = false;
  colorModeEnabled: boolean = false;

  selectedColorTemp: number;
  selectedColor: string;

  constructor(private readonly deviceService: LightDeviceService) {}

  ngOnChanges() {
    if (this.device) {
      setTimeout(() => this.updateValuesFromDevice());
    }
  }

  updateValuesFromDevice() {
    if (this.device.color_temp !== undefined) {
      this.colorTempModeEnabled = true;
      this.colorModeEnabled = false;
      this.selectedColorTemp = this.device.color_temp;
    }
  }

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
    this.deviceService.setDevice(this.device.$name, { color_temp_percent: undefined, color: undefined, color_temp: value });
  }

  changeColor() {
  }
}
