import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import autobind from 'autobind-decorator';
import { Link } from 'react-router'

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false};
  }
  render() {
    return (
      <div>
        <h1>Create a game</h1>
        <br></br>
        <form action="#">
          <select name="Games">
            <option value="mafia">Mafia</option>
            <option value="Spyfall">Spyfall</option>
          </select>
          <br></br>
          <input type="submit" >
        </form>
      </div>
    );
  }
}
