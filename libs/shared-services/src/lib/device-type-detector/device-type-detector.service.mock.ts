import { DeviceType } from '@insight/shared-model';

import { DeviceTypeDetectorServiceShape } from './device-type-detector.service';

export class DeviceTypeDetectorServiceMock implements DeviceTypeDetectorServiceShape {
  detect(): DeviceType {
    return DeviceType.DESKTOP;
  }
}
