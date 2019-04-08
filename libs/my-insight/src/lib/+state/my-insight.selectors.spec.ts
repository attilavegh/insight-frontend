import { Entity, MyInsightState } from './my-insight.reducer';
import { myInsightQuery } from './my-insight.selectors';

describe('MyInsight Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMyInsightId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createMyInsight = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      myInsight: {
        list: [
          createMyInsight('PRODUCT-AAA'),
          createMyInsight('PRODUCT-BBB'),
          createMyInsight('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('MyInsight Selectors', () => {
    it('getAllMyInsight() should return the list of MyInsight', () => {
      const results = myInsightQuery.getAllMyInsight(storeState);
      const selId = getMyInsightId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedMyInsight() should return the selected Entity', () => {
      const result = myInsightQuery.getSelectedMyInsight(storeState);
      const selId = getMyInsightId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = myInsightQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = myInsightQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
