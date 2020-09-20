import React, { Component } from 'react'
import { connect } from 'react-redux'
import validator from 'validator'
import { Container, Grid, Box, TextField, Button, Paper, Card, CardHeader, CardContent, FormControlLabel, Checkbox } from '@material-ui/core'
import {get as _get  } from 'lodash'

import { register } from './../../state/user/action'

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            isUploader: false,
            nameErr: false,
            emailErr: false,
            passwordMatchErr: false
        }
    }


    componentDidMount = () => {
        if(this.props.isLoggedIn)
        this.props.history.replace('/')
    }

    componentDidUpdate = () => {
        if(
            (this.props.isLoggedIn && !this.props.isUploader) 
            || 
            (this.props.isLoggedIn && this.props.isUploader && this.props.paidPremium)
        ) this.props.history.replace('/')
        else if (this.props.isLoggedIn && this.props.isUploader && !this.props.paidPremium)
        this.props.history.replace('/pay')
    }

    
    handleSubmit = event => {
        event.preventDefault()
        if(!this.state.name.length) return this.setState({nameErr: true})
        else this.setState({nameErr: false})

        if(!validator.isEmail(this.state.email)) return this.setState({emailErr: true})
        else this.setState({emailErr: false})

        if(!this.state.password.length || this.state.password !== this.state.rePassword) return this.setState({passwordMatchErr: true})
        else this.setState({passwordMatchErr: false})

        //////
        this.props.register({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            isUploader: this.state.isUploader,
        })
    }

    render() {
        return (
            <Container maxWidth='xs'>
                    <Card>
                        <CardHeader title="Register">
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={this.handleSubmit}>
                                <TextField required 
                                    error={this.state.nameErr} 
                                    // helperText="Please, enter your name" 
                                    fullWidth 
                                    label="Name" name="name" type="text" 
                                    value={this.state.name} 
                                    onChange={
                                        event => this.setState({name: event.target.value}, 
                                        () => {if(this.state.name.length) this.setState({nameErr: false})})
                                    }
                                />
                                <br/><br/>
                                <TextField required 
                                    error={this.state.emailErr} 
                                    // helperText="Please, enter your correct email" 
                                    fullWidth 
                                    label="Email" name="email" type="email" 
                                    value={this.state.email} 
                                    onChange={
                                        event => this.setState({email: event.target.value},
                                        () => {if(validator.isEmail(this.state.email)) this.setState({emailErr: false})})
                                    }
                                />
                                <br/><br/>
                                <TextField required 
                                    error={this.state.passwordMatchErr} 
                                    fullWidth 
                                    label="Password" name="password" type="password" 
                                    value={this.state.password} 
                                    onChange={
                                        event => this.setState({password: event.target.value})
                                    }
                                />
                                <br/><br/>
                                <TextField required 
                                    error={this.state.passwordMatchErr} 
                                    // helperText="Passwords don't match!" 
                                    fullWidth 
                                    label="Re-write password" name="rePassword" type="password" 
                                    value={this.state.rePassword} 
                                    onChange={
                                        event => this.setState({rePassword: event.target.value})
                                    }                                    
                                />
                                <br/><br/>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={this.state.isUploader} name="isUploader" onChange={
                                            event => this.setState({isUploader: event.target.checked})
                                        }/>
                                    }
                                    label="join to provide/upload learnings"
                                />
                                <br/><br/>
                                <Button variant="contained" color="primary" type="submit" 
                                    onClick={this.handleSubmit}
                                >Register</Button>
                            </form>
                        </CardContent>
                    </Card>
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    isLoggedIn: _get(state, 'userReducer.user.isLoggedIn', false),
    isUploader: _get(state, 'userReducer.user.isUploader', false),
    paidPremium: _get(state, 'userReducer.user.paidPremium', false)
})

const mapDispatchToProps = dispatch => ({
    register: formBody => dispatch(register(formBody)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Register)