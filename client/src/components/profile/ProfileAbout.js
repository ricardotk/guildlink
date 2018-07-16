import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Interest List
    const interests = profile.interests.map((interest, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {interest}
      </div>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">Bio</h3>
            <p>
              {isEmpty(profile.bio) ? (
                <span>Profile does not have a bio</span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Interests</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {interests}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
