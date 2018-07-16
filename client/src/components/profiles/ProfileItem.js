import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    let profileCharacters;

    if (profile.characters.length > 0) {
      profileCharacters = (
        <h6 className="font-italic font-weight-light text-secondary">
          <i className="fas fa-child mr-1" /> {profile.characters[0].name}
        </h6>
      );
    }

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} alt="" className="rounded-circle" />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{profile.user.name}</h3>
            {profileCharacters}
            <Link to={`/profile/${profile.handle}`} className="btn btn-info">
              View Profile
            </Link>
          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Interests</h4>
            <ul className="list-group">
              {profile.interests.slice(0, 4).map((interest, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
