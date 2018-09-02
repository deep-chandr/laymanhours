import React, {Component} from 'react';
import MyContainer from '../hoc/myContainer';

class AddNewPost extends Component{
    render(){
        return(<MyContainer>
            <div style={{'background-color': 'red'}}>
                <h1>Add New Post</h1>
                <p>heading</p>
                <input type='text' placeholder='enter heading...' /> 
            </div>
        </MyContainer>);
    }
}

export default AddNewPost;