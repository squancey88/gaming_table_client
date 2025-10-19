import { of } from 'rxjs';

export function spyPropertyGetter<T, K extends keyof T>(
  spyObj: jasmine.SpyObj<T>,
  propName: K
): jasmine.Spy<() => T[K]> {
  return Object.getOwnPropertyDescriptor(spyObj, propName)?.get as jasmine.Spy<() => T[K]>;
}

export function mockBehaviourSubject(value: any){
  const bs = jasmine.createSpyObj('bs', ['getValue', 'subscribe'])
  bs.getValue.and.returnValue(of(value));
  bs.subscribe.and.returnValue(of(value));
  return bs;
}

export function createTableInterfaceServiceMock(){
  const tableServiceSpy = jasmine.createSpyObj('TableInterfaceService', ['getStatus', 'getConfig', 'sendLightCommand'], ['connected'])
  spyPropertyGetter(tableServiceSpy, 'connected').and.returnValue(mockBehaviourSubject(true));
  return tableServiceSpy
}