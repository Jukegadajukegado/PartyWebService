import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import autobind from 'autobind-decorator';

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
        <Drawer width={300} docked={false} open={this.state.menuOpen} onRequestChange={(open) => this.setState({menuOpen: open})} >
          <AppBar title="PartyWebService" />
          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
        <AppBar title="PartyWebService" onLeftIconButtonTouchTap={this.toggleMenu} />
      </div>
    );
  }
}

