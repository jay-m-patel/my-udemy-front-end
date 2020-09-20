import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Box, TextField, Button, Paper, Card, CardHeader, CardContent, Input } from '@material-ui/core'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { upload } from './../../state/user/action'

class Upload extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit = async event => {
        event.preventDefault()
        this.props.showLoading()

        const form = new FormData(event.target)
        console.log(form)
        this.setState({
            title: '',
            details: '',
            keywords: '',
            price: ''
        })
        event.target.upload.value = null
        const returnedHideLoading = await this.props.upload(form)
        if(returnedHideLoading) {   
            returnedHideLoading()
            this.props.history.push('/')
        }
    }


    render() {
        return (
            <Container maxWidth='xs'>
                <Card>
                    <CardHeader title="Upload a new course">
                    </CardHeader>
                    <CardContent>
                    <form onSubmit={this.handleSubmit}>

                        <input required type='file' accept="video/mp4" name="upload" id="fileInputNewCourse" multiple placeholder="Upload Images"></input>
                        <br/>
                        <label style={{color: 'grey', fontSize: "0.75rem"}} htmlFor="fileInputNewCourse">Select one/multiple, each max 50 MB.</label>

                        <br/><br/>
                        <TextField required onChange={this.handleChange} value={this.state.title || ''} name="title" id="titleNewCourse" fullWidth placeholder="Title" />
                        <br/><br/>
                        <TextField onChange={this.handleChange} value={this.state.details || ''} name="details" id="detailsNewCourse" fullWidth placeholder="Details" />
                        <br/><br/>
                        <TextField onChange={this.handleChange} value={this.state.price || ''} name="price" id="priceNewCourse" type="number" fullWidth placeholder="Price" />
                        <br/><br/>
                        <TextField onChange={this.handleChange} value={this.state.keywords || ''} name="keywords" id="keywordsNewCourse" fullWidth placeholder="Keywords(space-separated)" />
                        <br/><br/>
                        <Button variant="contained" color="primary" type="submit" >Upload</Button>


                        {/* <input required type='file' accept="image/png, image/jpeg, image/jpg, image/gif" name="upload" id="fileInputPost" multiple placeholder="Upload a new course"></input>
                        <input required onChange={this.handleChange} value={this.state.title || ''} name="title" id="titleNewCourse" placeholder="Title"></input>
                        <input onChange={this.handleChange} value={this.state.details || ''} name="details" id="detailsNewCourse" placeholder="Details"></input>
                        <input type="submit" value="Post"/> */}
                    </form>
                    </CardContent>
                </Card>
                
            </Container>
        )
    }
}
const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    upload: body => dispatch(upload(body)),
    showLoading: () => dispatch(showLoading()),
    // hideLoading: () => dispatch(hideLoading())
})

export default connect(mapStateToProps, mapDispatchToProps)(Upload)