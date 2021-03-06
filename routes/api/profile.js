const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateCharacterInput = require('../../validation/character');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'nickname', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find()
    .populate('user', ['name', 'nickname', 'avatar'])
    .then(profiles => {
      if (profiles) {
        return res.json(profiles);
      }

      errors.noprofile = 'There are no profiles';
      res.status(404).json(errors);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'nickname', 'avatar'])
    .then(profile => {
      if (profile) {
        return res.json(profile);
      }

      errors.noprofile = 'There is no profile for this user';
      res.status(404).json(errors);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'nickname', 'avatar'])
    .then(profile => {
      if (profile) {
        return res.json(profile);
      }

      errors.noprofile = 'There is no profile for this user';
      res.status(404).json(errors);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

// @route   POST api/profile
// @desc    Create or Edit user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.discord) profileFields.discord = req.body.discord;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    // Interests - Split into array
    if (typeof req.body.interests !== 'undefined') {
      profileFields.interests = req.body.interests.split(',');
    }

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        return Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      }

      // Create
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = 'Handle already exists';
          res.status(400).json(errors);
        }

        new Profile(profileFields).save().then(profile => res.json(profile));
      });
    });
  }
);

// @route   POST api/profile/character
// @desc    Add a character to profile
// @access  Private
router.post(
  '/character',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCharacterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newChar = {
        region: req.body.region,
        realm: req.body.realm,
        name: req.body.name,
        main: req.body.main
      };

      profile.characters.push(newChar);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/character/:char_id
// @desc    Delete character from profile
// @access  Private
router.delete(
  '/character/:char_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.characters
          .map(item => item.id)
          .indexOf(req.params.char_id);

        // Splice out of array
        if (removeIndex !== -1) {
          profile.characters.splice(removeIndex, 1);
        }

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id })
          .then(() => res.json({ success: true }))
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
