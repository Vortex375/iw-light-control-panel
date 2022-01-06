import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LightDeviceService } from 'app/services/light-device.service';
import rgb from 'color-space/rgb';
import hsv from 'color-space/hsv';
import xyy from 'color-space/xyy';
import xyz from 'color-space/xyz';
import { padStart } from 'lodash';

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
    switch (this.device.color_mode) {
      case 'color_temp':
        this.colorTempModeEnabled = true;
        this.colorModeEnabled = false;
        if (this.device.color_temp !== undefined) {
          this.selectedColorTemp = this.device.color_temp;
        }
        break;
      case 'xy':
        this.colorTempModeEnabled = false;
        this.colorModeEnabled = true;
        if (this.device.color !== undefined) {
          const [r, g, b] = xyz.rgb(xyy.xyz([this.device.color.x, this.device.color.y, 100]));
          this.selectedColor = this.rgbToHex({ r, g, b });
          console.log('current color', this.selectedColor);
        }
        break;
      case 'hs':
        this.colorTempModeEnabled = false;
        this.colorModeEnabled = true;
        if (this.device.color !== undefined) {
          const [r, g, b] = hsv.rgb([this.device.color.hue, this.device.color.saturation, 100]);
          this.selectedColor = this.rgbToHex({ r, g, b });
          console.log('current color', this.selectedColor);
        }
        break;
      default:
        this.colorTempModeEnabled = false;
        this.colorModeEnabled = false;
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

  changeColorTemp({ value }: { value: number } = { value: undefined }) {
    if (value === undefined) {
      value = this.selectedColorTemp;
    }
    this.deviceService.setDevice(this.device.$name, {
      color_temp_percent: undefined,
      color: undefined,
      color_temp: value,
    });
  }

  changeColor() {
    if (this.selectedColor !== undefined && this.selectedColor !== '') {
      this.deviceService.setDevice(this.device.$name, {
        color_temp_percent: undefined,
        color_temp: undefined,
        color: this.hexToRgb(this.selectedColor),
      });
    }
  }

  private hexToRgb(hex: string) {
    return {
      r: parseInt(hex.substring(1, 3), 16),
      g: parseInt(hex.substring(3, 5), 16),
      b: parseInt(hex.substring(5, 7), 16),
    };
  }

  private rgbToHex({ r, g, b }: {r: number, g: number, b: number }) {
    console.log(r, g, b);
    return `#${padStart(Math.floor(r).toString(16), 2, '0')}${padStart(Math.floor(g).toString(16), 2, '0')}${padStart(Math.floor(b).toString(16), 2, '0')}ff`;
  }
}
