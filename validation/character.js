const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateCharacterInput(data) {
  let errors = {};

  data.region = !isEmpty(data.region) ? data.region : '';
  data.realm = !isEmpty(data.realm) ? data.realm : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.main = !isEmpty(data.main) ? data.main : false;

  if (Validator.isEmpty(data.region)) {
    errors.region = 'Region field is required';
  }

  if (Validator.isEmpty(data.realm)) {
    errors.realm = 'Realm field is required';
  }

  if (!Validator.isLength(data.name, { min: 4, max: 30 })) {
    errors.name = 'Name needs to be between 4 and 30 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
