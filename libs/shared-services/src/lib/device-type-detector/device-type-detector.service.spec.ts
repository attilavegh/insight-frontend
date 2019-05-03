import { TestBed } from '@angular/core/testing';

import { DeviceTypeDetectorService } from './device-type-detector.service';

import { DeviceDetectorModule } from 'ngx-device-detector';

describe('DeviceTypeDetectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      DeviceDetectorModule.forRoot()
    ]
  }));

  it('should be created', () => {
    const service: DeviceTypeDetectorService = TestBed.get(DeviceTypeDetectorService);
    expect(service).toBeTruthy();
  });
});
