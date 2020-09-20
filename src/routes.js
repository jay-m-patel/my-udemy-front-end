import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { get as _get } from 'lodash'

import Home from './containers/Home/Home'
import Register from './containers/Register/Form'
import Login from './containers/Login/Form'
import Pay from './containers/Pay/Pay'
import Upload from './containers/Upload/Upload'
import Course from './containers/Course/Course'


function routes(props) {
    return (
        <React.Fragment>
            <Route exact path='/' component={Home}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/pay' render={
                defaultProps => (
                    <Pay 
                        payable={11999} 
                        uploaderId={props.uploaderId}
                        paymentType="premium" 
                        {...defaultProps}        
                    />
                )}
            />
            <Route exact path='/upload' component={Upload}/>
            <Route path='/course' component={Course} />
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    uploaderId: _get(state, 'userReducer.user._id', null)
})

export default connect(mapStateToProps, null)(routes)