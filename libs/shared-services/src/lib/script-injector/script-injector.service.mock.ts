import { Observable, BehaviorSubject, throwError } from 'rxjs';

import { ScriptInjectorServiceShape } from './script-injector.service';

export class ScriptInjectorServiceMock implements ScriptInjectorServiceShape {
  shouldLoad = true;

  inject(_fromPath: string): Observable<Event> {
    return this.shouldLoad ? new BehaviorSubject<Event>({} as Event) : throwError('error');
  }
}
