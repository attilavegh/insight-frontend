import { NewInsightLoaded } from './new-insight.actions';
import {
  NewInsightState,
  Entity,
  initialState,
  newInsightReducer
} from './new-insight.reducer';

describe('NewInsight Reducer', () => {
  const getNewInsightId = it => it['id'];
  let createNewInsight;

  beforeEach(() => {
    createNewInsight = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid NewInsight actions ', () => {
    it('should return set the list of known NewInsight', () => {
      const newInsights = [
        createNewInsight('PRODUCT-AAA'),
        createNewInsight('PRODUCT-zzz')
      ];
      const action = new NewInsightLoaded(newInsights);
      const result: NewInsightState = newInsightReducer(initialState, action);
      const selId: string = getNewInsightId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = newInsightReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
