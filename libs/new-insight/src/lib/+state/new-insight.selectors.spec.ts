import { Entity, NewInsightState } from './new-insight.reducer';
import { newInsightQuery } from './new-insight.selectors';

describe('NewInsight Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNewInsightId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createNewInsight = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      newInsight: {
        list: [
          createNewInsight('PRODUCT-AAA'),
          createNewInsight('PRODUCT-BBB'),
          createNewInsight('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('NewInsight Selectors', () => {
    it('getAllNewInsight() should return the list of NewInsight', () => {
      const results = newInsightQuery.getAllNewInsight(storeState);
      const selId = getNewInsightId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedNewInsight() should return the selected Entity', () => {
      const result = newInsightQuery.getSelectedNewInsight(storeState);
      const selId = getNewInsightId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = newInsightQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = newInsightQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
