import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCharacter } from '../../actions/profileActions';

class Characters extends Component {
  onDeleteClick(id) {
    this.props.deleteCharacter(id);
  }

  render() {
    const characters = this.props.characters.map(char => (
      <tr key={char._id}>
        <td>{char.region}</td>
        <td>{char.realm}</td>
        <td>{char.name}</td>
        <td>
          {char.main ? <i className="fa fa-check text-info mr-1" /> : null}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, char._id)}
            className="btn btn-danger"
          >
            Delete
          </button>
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

Characters.propTypes = {
  deleteCharacter: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteCharacter }
)(Characters);
