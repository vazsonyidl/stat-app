const {getUnemploymentSchema, getFilteredUnemployment} = require('../models/unemployment');
const {getPrePrimarySchema, getFilteredPrePrimary} = require('../models/preprimary_education');
const {getBirthSchema} = require('../models/births');

module.exports = {
  setAppRoutes: (app) => {
    app.get('/births', getBirthSchema);

    app.get('/unemployment_rate', getUnemploymentSchema);
    app.post('/unemployment_rate', getFilteredUnemployment);

    app.get('/education_preprimary', getPrePrimarySchema);
    app.post('/education_preprimary', getFilteredPrePrimary);
  }
}
