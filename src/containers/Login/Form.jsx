import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Box, TextField, Button, Paper, Card, CardHeader, CardContent } from '@material-ui/core'
import {get as _get  } from 'lodash'

import { login } from './../../state/user/action'


class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            emailErr: false,
            passwordErr: false
        }
    }

    componentDidMount = () => {
        if(this.props.isLoggedIn)
        this.props.history.replace('/')
    }

    componentDidUpdate = () => {
        if(this.props.isLoggedIn)
        this.props.history.replace('/')
    }

    handleSubmit = event => {
        event.preventDefault()
        if(!this.state.email.length) return this.setState({emailErr: true})
        else this.setState({emailErr: false})

        if(!this.state.password.length) return this.setState({passwordErr: true})
        else this.setState({passwordErr: false})



        /////////
        this.props.login({
            email: this.state.email,
            password: this.state.password,
        })

    }

    render() {
        return (
            <Container maxWidth='xs'>
                    <Card>
                        <CardHeader title="Login">
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={this.handleSubmit}>
                                <TextField required 
                                    error={this.state.emailErr || (this.props.errMessage ? true : false)}
                                    fullWidth 
                                    label="Email" type="email" 
                                    value={this.state.email} 
                                    onChange={
                                        event => this.setState({email: event.target.value})
                                    }
                                />
                                <br/><br/>
                                <TextField required 
                                    error={this.state.passwordErr || (this.props.errMessage ? true : false)}
                                    fullWidth 
                                    label="Password" type="password" 
                                    value={this.state.password} 
                                    onChange={
                                        event => this.setState({password: event.target.value})
                                    }
                                />
                                <br/><br/>
                                <Button variant="contained" color="primary" type="submit" 
                                    onClick={this.handleSubmit}
                                >Login</Button>
                            </form>
                        </CardContent>
                    </Card>
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    isLoggedIn: _get(state, 'userReducer.user.isLoggedIn', false),
    errMessage: _get(state, 'userReducer.user.errMessage', null)
})

const mapDispatchToProps = dispatch => ({
    login: formBody => dispatch(login(formBody)),

})


export default connect(mapStateToProps, mapDispatchToProps)(Login)