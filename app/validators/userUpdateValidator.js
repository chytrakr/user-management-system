const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function userUpdateValidator(data) {

  let errors = {};

  data.fullName = !isEmpty(data.fullName) ? data.fullName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.url = !isEmpty(data.url) ? data.url : '';
  data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : '';

  if(Validator.isEmpty(data.fullName)) {
    errors.message = "User full name is required";
  }

  if(Validator.isEmpty(data.email)) {
    errors.message = "Email ID is required";
  }

  if(Validator.isEmpty(data.address)) {
    errors.message = "Email ID is required";
  }

  if(!data.contactNumber) {
    errors.message = "Contact number is required"
  }

  if(typeof data.contactNumber !== 'number' && data.contactNumber.length !== 10) {
    errors.message = "Invalid contact number"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}