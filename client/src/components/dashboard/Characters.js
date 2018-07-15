import React, { Component } from 'react';
import { connect } from 'react-redux';

class Characters extends Component {
  render() {
    const characters = this.props.characters.map(char => (
      <tr key={char._id}>
        <td>{char.region}</td>
        <td>{char.realm}</td>
        <td>{char.name}</td>
        <td>
          {char.main ? <i className="fa fa-check text-info mr-1" /> : null}
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Characters</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Region</th>
              <th>Realm</th>
              <th>Name</th>
              <th>Main</th>
              <th />
            </tr>
            {characters}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect()(Characters);
