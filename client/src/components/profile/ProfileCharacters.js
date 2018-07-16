import React, { Component } from 'react';

class ProfileCharacters extends Component {
  render() {
    const { characters } = this.props;

    const charItems = characters.map(char => (
      <li key={char._id} className="list-group-item">
        <h4>{char.name}</h4>
        <p>
          {char.region} - {char.realm}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-center text-info">Characters</h3>
          {charItems.length > 0 ? (
            <ul className="list-group">{charItems}</ul>
          ) : (
            <p className="text-center">No Characters Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCharacters;
