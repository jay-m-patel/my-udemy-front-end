import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/styles'
import { Container, Grid, Box, TextField, Button, Paper, Card, CardHeader, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core'

import { get as _get, random as _random } from 'lodash'

const useStyles = () => ({
    videoParent: {
        display: 'flex',
        flexDirection: 'column'
    }
})

class Course extends Component {
    constructor(props) {
        super(props) 

        this.state = {}
    }

    componentDidMount() {
        if(!this.props.selectedCourseId) this.props.history.replace('/')
        else {
            const selectedCourse = this.props.allCourses.find(course => course._id === this.props.selectedCourseId)
            const authenticatedForCourse = this.props.uploadedCourses.includes(this.props.selectedCourseId) || this.props.purchasedCourses.includes(this.props.selectedCourseId)
            this.setState({
                selectedCourse,
                authenticatedForCourse
            })
        }
    }

    render() {
        const { classes } = this.props

        return (
            <Container maxWidth='xs'>
                <Card>
                    <CardHeader 
                        title={_get(this.state, 'selectedCourse.courseName', null)}
                        subheader={
                            _get(this.state, 'selectedCourse.keywords', [])
                            .reduce((str, curStr) => `${str} ${curStr}`, '')
                        }
                    ></CardHeader>
                    <CardContent>
                        <Grid container spacing={3} className={classes.videoParent}>
                            <Grid item xs={12}>
                                {_get(this.state, 'selectedCourse.details', null)}
                            </Grid>
                            {this.state.authenticatedForCourse || !_get(this.state, 'selectedCourse.price')
                            ?
                            _get(this.state, 'selectedCourse.contentUrls', []).map(url => (
                                <Grid key={_random(10000)}>
                                    <video width="350px" controls>
                                        <source src={`${url}`} />
                                    </video>
                                </Grid>
                            ))
                            :
                                <Button variant="contained" color="primary"
                                    onClick={() => {
                                        if(this.props.isLoggedIn)
                                        this.props.history.replace({
                                            pathname: '/pay',
                                            state: {
                                                paymentType: 'purchase',
                                                payable: _get(this.state, 'selectedCourse.price'),
                                                purchaserId: this.props.userId,
                                                courseId: this.props.selectedCourseId
                                            }
                                        })
                                        else
                                        this.props.history.push('/login')
                                    }}
                                >Please, pay {`${_get(this.state, 'selectedCourse.price')}`}/- INR to access the content</Button>
                            }
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        )
    }
}


const mapStateToProps = state => ({
    isLoggedIn: _get(state, 'userReducer.user.isLoggedIn', false),
    userId: _get(state, 'userReducer.user._id', null),
    purchasedCourses: _get(state, 'userReducer.user.purchasedCourses', []),
    uploadedCourses: _get(state, 'userReducer.user.uploadedCourses', []),
    selectedCourseId: _get(state, 'userReducer.user.selectedCourseId', null),
    allCourses: _get(state, 'userReducer.user.allCourses', [])
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Course))