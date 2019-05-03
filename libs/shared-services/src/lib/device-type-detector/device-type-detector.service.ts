import { Injectable } from '@angular/core';

import { DeviceType } from '@insight/shared-model';

import { DeviceDetectorService } from 'ngx-device-detector';

export interface DeviceTypeDetectorServiceShape {
  detect(): DeviceType;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeDetectorService {

  constructor(private deviceService: DeviceDetectorService) {}

  detect(): DeviceType {
    if (this.deviceService.isDesktop()) {
      return DeviceType.DESKTOP;
    } else if (this.deviceService.isTablet()) {
      return DeviceType.TABLET;
    } else {
      return DeviceType.MOBILE;
    }
  }
}
