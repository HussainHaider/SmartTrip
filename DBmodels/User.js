let mongoose = require('mongoose');

let User = mongoose.model('user', {
  Name: {
    type: String,
    required: true
  },
  Phone: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  City: {
    type: String,
    required: true
  },
  State: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Gender: {
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: true
   },
  BusinessUser: {
     type: String,
     required: true
   }
});

module.exports = {User};
