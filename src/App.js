import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import autobind from 'autobind-decorator';
import {Link} from 'react-router';
import { hashHistory } from 'react-router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false};
  } 
  @autobind
  toggleMenu(){
    this.setState({menuOpen: !this.state.menuOpen});
  }
  @autobind
  handleClose(){
    this.setState({menuOpen: false});
  } 
  render() {
    return (  
      <div>
        <Drawer className="drawer" width={300} docked={false} open={this.state.menuOpen} onRequestChange={(open) => this.setState({menuOpen: open})} >
          <AppBar title="PartyWebService" onLeftIconButtonTouchTap={this.handleClose}/>
          <Link to={'/'} onTouchTap={this.handleClose}><MenuItem>Home</MenuItem></Link>
          <Link to={'/join'} onTouchTap={this.handleClose}><MenuItem>Join Game</MenuItem></Link>
          <Link to={'/create'} onTouchTap={this.handleClose}><MenuItem>Create Game</MenuItem></Link>
        </Drawer>
        <AppBar title="PartyWebService" onLeftIconButtonTouchTap={this.toggleMenu} />
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}

