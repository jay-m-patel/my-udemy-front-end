import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { get as _get} from 'lodash'
import { AppBar, Tabs, Tab, Button } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { withStyles } from '@material-ui/styles'
import LoadingBar from 'react-redux-loading-bar'
import Routes from './routes'
import './App.css';

import { logout, checkLoggedIn } from './state/user/action'

const useStyles = () => ({
  homeBtn: {
    marginRight: 'auto'
  },
  invisible: {
    display: 'none'
  }
})

const getIndex = (arr, field, val) => {
  let index
  arr.find((obj, i) => {
    if(obj[field] === val) {
      index = i
      return obj
    }
  })
  return index
}

class App extends Component {
  constructor(props) {
    super(props)

    this.routesArr = [
      {
        route: '/',
        label: 'You Learn '
      }, {
        route: '/register',
        label: 'Register'
      }, {
        route: '/login',
        label: 'Login'
      }, {
        route: '/pay',
        label: 'Pay Premium'
      }, {
        route: '/upload',
        label: 'Upload'
      }, 
      {
        route: '/course',
        label: 'Selected Course'
      }, {
        route: '/logout',
        label: 'Logout'
      }
    ]

    this.state = {
      tabIndex: getIndex(this.routesArr, 'route', this.props.location.pathname),
    }
  }

  componentDidMount = () => {
    this.props.checkLoggedIn()
  }

  componentDidUpdate = () => {
    if(this.props.location.pathname !== this.routesArr[this.state.tabIndex].route)
    this.setState({tabIndex: getIndex(this.routesArr, 'route', this.props.location.pathname)})
  }
  
  handleTabClick = (newRoute, tabIndex) => {
    this.setState({tabIndex})
    if(this.props.location.pathname !== newRoute)
    this.props.history.push(newRoute)
  }
  
  render() {
    const { classes } = this.props
    return (
      <div className="App">
        <AppBar 
          position="static"
        >
          <Tabs 
            variant="scrollable"
            value={this.state.tabIndex}
          >
            <Tab className={classes.homeBtn} label={this.routesArr[0].label} onClick={() => this.handleTabClick('/', 0)}/>
            <Tab className={this.props.isLoggedIn ? classes.invisible : ''} label={this.routesArr[1].label} onClick={() => this.handleTabClick('/register', 1)}/>
            <Tab className={this.props.isLoggedIn ? classes.invisible : ''} label={this.routesArr[2].label} onClick={() => this.handleTabClick('/login', 2)}/>
            <Tab className={(this.props.isLoggedIn && this.props.isUploader && !this.props.paidPremium) ? '' : classes.invisible} label={this.routesArr[3].label} onClick={() => this.handleTabClick('/pay', 3)}/>
            <Tab className={(this.props.isLoggedIn && this.props.isUploader && this.props.paidPremium) ? '' : classes.invisible} label={this.routesArr[4].label} onClick={() => this.handleTabClick('/upload', 4)}/>

            <Tab className={this.props.selectedCourseId ? '' : classes.invisible} label={this.routesArr[5].label} onClick={() => this.handleTabClick('/course', 5)}/>


            <Tab className={this.props.isLoggedIn ? '' : classes.invisible} label={this.routesArr[6].label} onClick={() => {
              this.handleTabClick('/', 6)
              this.props.logout()
              document.cookie = `token=; expires=${new Date()} path='/'`
            }}/>
          </Tabs>

          <LoadingBar />

        </AppBar>

        {this.props.errMesage ? <Alert severity="error">{this.props.errMesage}<br/>Please reload, if could not get data.</Alert> : null}
        <br/>
        <Routes/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errMesage: _get(state, 'userReducer.user.errMessage'),
  isLoggedIn: _get(state, 'userReducer.user.isLoggedIn', false),
  isUploader: _get(state, 'userReducer.user.isUploader', false),
  paidPremium: _get(state, 'userReducer.user.paidPremium', false),
  selectedCourseId: _get(state, 'userReducer.user.selectedCourseId', null)
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  checkLoggedIn: () => dispatch(checkLoggedIn())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)
  (withStyles(useStyles)(App))
);
