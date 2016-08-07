import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { Link } from 'react-router'

export default class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false};
  } 
  render() {
    return (
      <div>
        <h1>Whut..</h1>
        <p>*Sigh* You're in the middle of nowhere...</p>
        <p>Error Code 404</p>
      </div>
    );
  }
}

