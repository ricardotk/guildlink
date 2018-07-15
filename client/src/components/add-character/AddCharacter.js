import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AddCharacter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: '',
      realm: '',
      name: '',
      main: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const charData = {
      region: this.state.region,
      realm: this.state.realm,
      name: this.state.name,
      main: this.state.main
    };

    console.log(charData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      main: !this.state.main
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-character">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Character</h1>
              <p className="lead text-center">
                Add a character from your in-game account
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Region"
                  name="region"
                  value={this.state.region}
                  onChange={this.onChange}
                  error={errors.region}
                />
                <TextFieldGroup
                  placeholder="* Realm"
                  name="realm"
                  value={this.state.realm}
                  onChange={this.onChange}
                  error={errors.realm}
                />
                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="main"
                    value={this.state.main}
                    checked={this.state.main}
                    onChange={this.onCheck}
                    id="main"
                  />
                  <label htmlFor="main" className="form-check-label">
                    Main Character
                  </label>
                </div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddCharacter.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(AddCharacter));
