import React, {Component} from 'react';
import MyContainer from '../hoc/myContainer';
import InputComponent from '../utils/inputComponent';

import { Button } from 'semantic-ui-react';
import {NotifyMe} from '../utils/notifyMe';
import { getApiTestData } from '../utils/apiCall';



class AddNewPost extends Component{

    constructor(props) {
        super(props)
        this.state = {
            posts : [],
            input_fields: [
                {'name': 'Title', 'key': 'title', 'type': 'stringtype', 'not-empty': true},
                {'name': 'Description', 'key': 'description', 'type': 'stringtype', 'not-empty': true},
                {'name': 'Category', 'key': 'category', 'type': 'stringtype', 'not-empty': true},
                {'name': 'Content', 'key': 'content', 'type': 'editor', 'not-empty': true}
            ]
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

    onSubmit = (data) => {
        console.log('Im called', data)
        data = JSON.stringify(data);
    }
    render(){
        return(<MyContainer>
            <Button onClick={this.notify}>Make Notify</Button>
            <Button onClick={this.makeApiCall}>Test Api</Button>

            <div style={{'background-color': ''}}>
                <h1>Add New Post</h1>
                <br /><br />
                <InputComponent 
                    data={this.state.input_fields}
                    click={this.onSubmit} />
                <br /><br />
            </div>
        </MyContainer>);
    }
}

export default AddNewPost;