import React, { Component } from 'react'
import { connect } from 'react-redux'
import { get as _get, random as _random } from 'lodash'

import { Container, Grid, Box, TextField, Button, Paper, Card, CardHeader, CardContent, Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core'

import { selectCourse } from './../../state/user/action'

class Home extends Component {
    render() {
        return (
            <Container maxWidth='xs'>
                <Card>
                    <CardHeader title="Home">
                    </CardHeader>
                    <CardContent>
                        {/* <Grid container > */}
                        <List>
                            {this.props.allCourses.map(course => (
                                <React.Fragment key={_random(100000)}>
                                    <Divider light/>
                                    <ListItem button onClick={() => {
                                            this.props.history.push(`/course`)
                                            this.props.selectCourse(course._id)
                                        }}>
                                        <ListItemText primary={course.courseName}
                                            secondary={
                                                course.keywords.reduce((str, curStr) => `${str} ${curStr}`)
                                            }
                                        />
                                    </ListItem>
                                </React.Fragment>
                            ))}
                        </List>
                        {/* </Grid> */}
                    </CardContent>
                </Card>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    allCourses: _get(state, 'userReducer.user.allCourses', [])
})

const mapDispatchToProps = dispatch => ({
    selectCourse: selectedCourseId => dispatch(selectCourse(selectedCourseId))
})


export default connect(mapStateToProps, mapDispatchToProps)(Home)