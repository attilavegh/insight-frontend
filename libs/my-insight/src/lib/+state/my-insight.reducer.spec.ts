import { MyInsightLoaded } from './my-insight.actions';
import {
  MyInsightState,
  Entity,
  initialState,
  myInsightReducer
} from './my-insight.reducer';

describe('MyInsight Reducer', () => {
  const getMyInsightId = it => it['id'];
  let createMyInsight;

  beforeEach(() => {
    createMyInsight = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid MyInsight actions ', () => {
    it('should return set the list of known MyInsight', () => {
      const myInsights = [
        createMyInsight('PRODUCT-AAA'),
        createMyInsight('PRODUCT-zzz')
      ];
      const action = new MyInsightLoaded(myInsights);
      const result: MyInsightState = myInsightReducer(initialState, action);
      const selId: string = getMyInsightId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = myInsightReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
