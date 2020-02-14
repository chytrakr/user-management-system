const collection = require('./model.js');

function updateUser(id, updateData){
  return new Promise(function(resolve, reject) {
    collection.findOneAndUpdate(
      {_id: id},
      updateData,
      {new: true},
      function (err, resp) {
        if (err) return reject("Something went wrong please try after sometime");
        if (!resp) return reject("User not found");
        return resolve(resp);
    });
  })
}

function deleteUser(id){
  return new Promise(function(resolve, reject) {
    collection.deleteOne({_id: id}, function (err, resp) {
        if (err) return reject("Something went wrong please try after sometime");
        return resolve("Deleted successfully");
    }).remove().exec();
  })
}

module.exports = {
	updateUser,
  deleteUser
}