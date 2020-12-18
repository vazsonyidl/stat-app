module.exports = {
  transformSearchData: (q) => {
    const responseType = {
      'response': {
        'format': 'json'
      }
    };
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
  }
}
