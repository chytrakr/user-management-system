const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function signUpValidator(data) {

  let errors = {};

  data.fullName = !isEmpty(data.fullName) ? data.fullName : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.userId = !isEmpty(data.userId) ? data.userId : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.url = !isEmpty(data.url) ? data.url : '';
  data.contactNumber = !isEmpty(data.contactNumber) ? data.contactNumber : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';

  if(Validator.isEmpty(data.fullName)) {
    errors.message = "User full name is required";
  }

  if(Validator.isEmpty(data.password)) {
    errors.message = "Password is required";
  }

  if(Validator.isEmpty(data.userId)) {
    errors.message = "User ID is required";
  }

  if(Validator.isEmpty(data.email)) {
    errors.message = "Email ID is required";
  }

  if(typeof data.contactNumber !== 'number' && data.contactNumber.length !== 10) {
    errors.message = "Invalid contact number"
  }

  if(Validator.isEmpty(data.address)) {
    errors.message = "Address is required";
  }

  if(Validator.isEmpty(data.gender)) {
    errors.message = "Address is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}