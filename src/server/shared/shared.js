import {responseType} from '../constants/route-options.const.js';

const transformSearchData = (q) => {
  return {
    query: Object.entries(q).map(([key, value]) => ({
        code: key,
        selection: {
          filter: 'item',
          // TODO refactor this area, do not rely on typeof comparison
          values: typeof value === 'string' ? [value] : value
        }
      })
    ),
    ...responseType
  };
};

export {transformSearchData};
