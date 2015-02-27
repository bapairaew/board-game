/**
* @jsx React.DOM
*/
'use strict';

var React = require('react');

var PlayerSettings = React.createClass({
  render: function () {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading">General</div>
          <div className="panel-body">
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="email" className="form-control naked" />
              </div>
              <div className="form-group">
                <label>Profile picture</label>
                <br />
                <a href>Change picture</a>
              </div>
              <div className="form-group">
                <label>Password</label>
                <br />
                <a href>Change Password</a>
              </div>
            </form>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Actions</div>
          <div className="panel-body">
            <button className="btn btn-block btn-danger">Logout</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PlayerSettings;
