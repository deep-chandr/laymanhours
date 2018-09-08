import React, {Component} from 'react';
import MyContainer from '../hoc/myContainer';
import InputComponent from '../utils/inputComponent';

import { Button } from 'semantic-ui-react';
import {NotifyMe} from '../utils/notifyMe';
import { getApiTestData, addNewPost, addNewAuthor } from '../utils/apiCall';
// import MyMasonry from '../utils/masonaryReactVirtualized/masonaryReactVirtualized'



class AddNewPost extends Component{

    constructor(props) {
        super(props)
        this.state = {
            posts : [],
            input_fields_for_post: [
                {'name': 'Title', 'key': 'title', 'type': 'stringtype', 'not-empty': true},
                {'name': 'Description', 'key': 'description', 'type': 'stringtype', 'not-empty': true},
                {'name': 'Category', 'key': 'category', 'type': 'stringtype', 'not-empty': true},
                {'name': 'Content', 'key': 'content', 'type': 'editor', 'not-empty': true},
                {'name': 'Author', 'key': 'author', 'type': 'stringtype', 'not-empty': true},
                {'name': 'Image Link', 'key': 'imgList', 'type': 'stringtype', 'not-empty': true}
            ],
            input_fields_for_author: [
                {'name': 'Author Name', 'key': 'name', 'type': 'stringtype', 'not-empty': true},
                {'name': 'Email', 'key': 'email', 'type': 'stringtype', 'not-empty': true},
                {'name': 'Mobile', 'key': 'mobile', 'type': 'stringtype', 'not-empty': true},
                {'name': 'About', 'key': 'about', 'type': 'stringtype', 'not-empty': true},
                {'name': 'Facebook', 'key': 'facebook', 'type': 'stringtype', 'not-empty': true},
                {'name': 'Google', 'key': 'google', 'type': 'stringtype', 'not-empty': true},
                {'name': 'Any other', 'key': 'other', 'type': 'stringtype', 'not-empty': true}
            ],

        }
    }

    notify = () => {
        NotifyMe('success', 'first notification');
        NotifyMe('info', 'first notification');
        NotifyMe('warning', 'first notification');
        NotifyMe('error', 'first notification');
    }
    makeApiCall = () => {
        getApiTestData()
            .then(response => {
                console.log(response)
                NotifyMe('success', JSON.stringify(response.data));
            })
            .catch(err => {
                console.log(err)
                NotifyMe('error', err);
            })
            

    }

    onSubmitPost = (data) => {
        addNewPost(data)
            .then(response => {
                NotifyMe('success', JSON.stringify(response.data));
            })
            .catch(err => {
                NotifyMe('error', JSON.stringify(err));
            })
    }
    onSubmitAuthor = (data) => { 
        data['socialmedialinks'] = [];
        if(data.facebook){
            data['socialmedialinks'].push({ 'type' : 'facebook' , 'link' : data.facebook });
        }
        if(data.google){
            data['socialmedialinks'].push({ 'type' : 'google' , 'link' : data.google });
        }
        if(data.other){
            data['socialmedialinks'].push({ 'type' : 'other' , 'link' : data.other });
        }
        delete data.other;
        delete data.google;
        delete data.facebook;

        addNewAuthor(data)
            .then(response => {
                NotifyMe('success', JSON.stringify(response.data));
            })
            .catch(err => {
                NotifyMe('error', JSON.stringify(err));
            })
    }
    render(){
        return(<MyContainer>
            {/* <MyMasonry /> */}
            <Button onClick={this.notify}>Make Notify</Button>
            <Button onClick={this.makeApiCall}>Test Api</Button>

            <div style={{'background-color': ''}}>
                <h1>Add New Post</h1>
                <br /><br />
                <InputComponent 
                    data={this.state.input_fields_for_post}
                    click={this.onSubmitPost} />
                <br /><br />

                <h1>Add New Author</h1>
                <br /><br />
                <InputComponent 
                    data={this.state.input_fields_for_author}
                    click={this.onSubmitAuthor} />
                <br /><br />
            </div>
        </MyContainer>);
    }
}

export default AddNewPost;