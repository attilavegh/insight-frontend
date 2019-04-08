import { InjectionToken } from '@angular/core';

import { environment } from '../../apps/insight-frontend/src/environments/environment';

export const environmentToken = new InjectionToken<string>('insight');
export const environmentProvider = { provide: environmentToken, useValue: environment.apiUrl };
