import { mockBehaviourSubject, spyPropertyGetter } from "../../testing/service.mocks";

export function createAICServiceMock(){
  const aicServiceSpy = jasmine.createSpyObj('AICService', ['login'], ['loggedIn', 'selectedGroup']);
  spyPropertyGetter(aicServiceSpy, 'loggedIn').and.returnValue(mockBehaviourSubject(true));
  spyPropertyGetter(aicServiceSpy, 'selectedGroup').and.returnValue(mockBehaviourSubject(undefined));
  return aicServiceSpy
}