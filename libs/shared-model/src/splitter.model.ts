import { DeviceType } from './device-type.model';

export interface AssignmentDetail {
  googleId: string;
  deviceType: DeviceType;
}

export interface AssignmentResult {
  experimentName: string;
  bucketName: string;
}
