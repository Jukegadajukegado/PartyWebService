import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import autobind from 'autobind-decorator';
import * as Colors from 'material-ui/styles/colors';
import {Link} from 'react-router';
import { hashHistory } from 'react-router';
import Sound from 'react-sound';
import map from './map';
import superagent from 'superagent';
import FontIcon from 'material-ui/FontIcon';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {menuOpen: false, largeWindow: false};
    this.pageNames = {
      '/': 'home',
      '/join': 'join',
      '/create': 'create',
      '/settings': 'settings',
      '/game': 'game'
    };
    window.onresize = this.checkResize;
    var instance = this;
    instance.props.dispatch.settings.updatePatch("Loading patch notes...");
    superagent.get('/documents/patch.md').end(function(err, res){
      instance.props.dispatch.settings.updatePatch(res.text);
    });
  } 
  componentDidMount(){
    this.checkResize();
  }
  @autobind
  checkResize(){
      this.setState({largeWindow: window.innerWidth > 1270});
  }
  @autobind
  toggleMenu(){
    this.setState({menuOpen: !this.state.menuOpen});
  }
  @autobind
  handleClose(){
    this.setState({menuOpen: false});
  } 
  focused(page){
    const currentPage = this.pageNames[this.props.location.pathname];
    return currentPage == page ? {color: Colors.green600, fontWeight: 'bold'} : {};
  }
  render() {
    const currentPage = this.pageNames[this.props.location.pathname];
    return (  
      <div>
        <Drawer className="drawer" width={300} docked={this.state.largeWindow} open={this.state.menuOpen || this.state.largeWindow} onRequestChange={(open) => this.setState({menuOpen: open})} >
          <AppBar title="PartyWebService" onLeftIconButtonTouchTap={this.handleClose}/> 
          <div style={{position:'relative'}} >
            <div style={{position:'absolute', bottom:3, left: 0, padding: '1em', fontWeight: 'bold', boxSizing:'border-box', width: '100%', background: 'rgba(0,0,0,0.7)', color: '#FFF'}}>{currentPage.toUpperCase()}</div>
            <img src="/img/banner.jpg" style={{width:'100%'}} />
          </div>
          <Link to={'/'} onTouchTap={this.handleClose}><MenuItem style={this.focused('home')} leftIcon={<FontIcon style={this.focused('home')} className="material-icons">&#xE88A;</FontIcon>} >Home</MenuItem></Link>
          <Link to={'/join'} onTouchTap={this.handleClose}><MenuItem style={this.focused('join')} leftIcon={<FontIcon style={this.focused('join')} className="material-icons">&#xE8BE;</FontIcon>} >Join Game</MenuItem></Link>
          <Link to={'/create'} onTouchTap={this.handleClose}><MenuItem style={this.focused('create')} leftIcon={<FontIcon style={this.focused('create')} className="material-icons">&#xE03B;</FontIcon>} >Create Game</MenuItem></Link>
          <Link to={'/settings'} onTouchTap={this.handleClose}><MenuItem style={this.focused('settings')} leftIcon={<FontIcon style={this.focused('settings')} className="material-icons">&#xE8B8;</FontIcon>} >Settings</MenuItem></Link>
        </Drawer>
        <AppBar style={this.state.largeWindow?{zIndex: 1400}:{}} showMenuIconButton={!this.state.largeWindow} title="PartyWebService" onLeftIconButtonTouchTap={this.toggleMenu} />
        <div className="container">{this.props.children}</div>
        <Sound url="audio/bg.mp3" playStatus={this.props.settings.audio?Sound.status.PLAYING:Sound.status.PAUSED} />
      </div>
    );
  }
}

export default map(App);  