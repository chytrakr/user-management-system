const config = require('../config/routes.js');
const router = config.express.Router();
const collection = require('./model.js');
const bcrypt = require("bcryptjs");
const functions = require('./functions.js');

// @route GET api/v1/users
// @desc get users list with pagination
// @access Public
router.get('/', function (req, res) {

  // Create Options
  let options = { sort: '-createdAt' };
  options.page = (req.query.page)? Number(req.query.page): 1;
  options.limit = (req.query.limit)? Number(req.query.limit): 20;

  // Create query params
  let query = {};
  if(req.query.search) {
    query["$or"] = [
      {"fullName": { $regex: `${req.query.search}.*`, $options: "i" }},
      {"userId": { $regex: `${req.query.search}.*`, $options: "i" }},
      {"email": { $regex: `${req.query.search}.*`, $options: "i" }},
      {"contactNumber": { $regex: `${req.query.search}.*`, $options: "i" }}
    ]
  }
  collection.paginate(query, options, function(err, result) {
    if (err) return res.status(500).send("Something went wrong, please try after sometime");
    res.status(200).send(result);
  });
});

// @route CREATE api/v1/users/create
// @desc create user
// @access Public
router.post('/create', function(req, res) {

  const { errors, isValid } = config.validators.signUpValidator(req.body);

  // Checking Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }


  let {fullName, password, userId, email, url, contactNumber, address, userType, gender} = req.body;

  let userData = {
      fullName,
      password: bcrypt.hashSync(password, 5),
      userId,
      email,
      url,
      address,
      contactNumber,
      userType,
      gender
    };

  collection.create(userData, function (err, user) {
    if (!err) {
      return res.status(200).json({error: false, message: 'Signup successful'})
    } else {
      if (err.code ===  11000) { // this error gets thrown only if similar userId already exist.
        return res.status(409).send({error: true, message: 'User already exist!'})
      } else {
        return res.status(500).send({error: true, message: 'Error signing up user'})
      }
    }
  });
});

// @route api/v1/users/login
// @desc user login
// @access Public
router.post('/login', function(req, res) {

  let {password, userId} = req.body;

  // Checking Validation
  if (!password) {
      return res.status(400).json({error: true, message: "Password is required"});
  }

  if (!userId) {
      return res.status(400).json({error: true, message: "User ID is required"});
  }

  collection.findOne({userId: userId}, function (err, user) {
    if (!err && user) {

      let passwordCheck = bcrypt.compareSync(password, user.password);

      if (passwordCheck) {
        req.session.user = {
          email: user.email,
          userId: user.userId,
          id: user._id
        }; // saving some user's data into user's session
        req.session.user.expires = new Date(
          Date.now() + 3 * 24 * 3600 * 1000 // session expires in 3 days
        );
        res.status(200).send({error: false, message: 'You are logged in, Welcome!'});
      } else {
        res.status(401).send({error: true, message: 'Incorrect password'});
      }
    } else {
      res.status(401).send({error: true, message: 'Invalid login credentials'})
    }
  });
});

// @route UPDATE api/v1/users/update/<_id>
// @desc update user details
// @access Public
router.put('/update/:id', function(req, res) {
  if (!req.params.id) {
    return res.status(400).json({error: true, message: "ID is required"});
  }

  const { errors, isValid } = config.validators.userUpdateValidator(req.body);

  // Checking Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let {fullName, email, url, contactNumber, address} = req.body;

  let updateData = {
    $set: {
      fullName,
      email,
      url,
      contactNumber,
      updatedAt: Date.now(),
      address
    }
  }
  console.log(updateData)
  functions.updateUser(req.params.id, updateData).then((user) => {
    return res.status(200).json({error: false, message: 'Updated successfully'})
  }, err => {
    return res.status(500).send({error: true, message: err})
  })
});

// @route UPDATE api/v1/users/delete/<_id>
// @desc delete user
// @access Public
router.delete('/delete/:id', function(req, res) {

  if (!req.params.id) {
    return res.status(400).json({error: true, message: "ID is required"});
  }

  functions.deleteUser(req.params.id).then((resp) => {
    return res.status(200).json({error: false, message: resp})
  }, err => {
    return res.status(500).send({error: true, message: err})
  })
});


module.exports = router