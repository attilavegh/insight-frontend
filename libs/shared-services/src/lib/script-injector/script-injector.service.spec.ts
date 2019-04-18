import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

import { ScriptInjectorService } from './script-injector.service';

describe('ScriptInjectorService', () => {
  let service: ScriptInjectorService;

  const mockScriptElement = {} as HTMLScriptElement;
  const documentMock = {
    createElement: jasmine.createSpy('createElement').and.returnValue(mockScriptElement),
    getElementById: jasmine.createSpy('getElementById').and.returnValue(null),
    body: {
      appendChild: jasmine.createSpy('appendChild')
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: documentMock }, ScriptInjectorService]
    }).compileComponents();

    service = TestBed.get(ScriptInjectorService);
  });

  it('injects the proper script to the body', () => {
    // given
    const url = 'test-script-url';
    const id = 'id';

    // when
    service.inject(id, url);

    // then
    expect(documentMock.createElement).toHaveBeenCalledWith('script');
    expect(documentMock.body.appendChild).toHaveBeenCalledWith(mockScriptElement);
  });
});
