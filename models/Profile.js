const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  discord: {
    type: String
  },
  location: {
    type: String
  },
  interests: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  characters: [
    {
      region: {
        type: String,
        required: true
      },
      realm: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      main: {
        type: Boolean,
        default: false
      }
    }
  ],
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
