import React, {Component} from 'react';
import { Comment } from 'semantic-ui-react';
import InputComponent from '../inputComponent';
import { NotifyMe } from '../notifyMe';
import { addComment, currentUserDetails } from '../apiCall';
import moment from 'moment';
import { isObjEmpty } from '../utilityFunctions';

const commentFormData = [
    {'name': 'Name', 'key': 'name', 'type': 'stringtype', 'not-empty': true},
    {'name': 'Avatar', 'key': 'avatar', 'type': 'stringtype', 'not-empty': true},
    {'name': 'Comment', 'key': 'comment', 'type': 'textareaType', 'not-empty': true}
];

class CommentHandler extends Component{
    state = {
        replyformstatus : false,
        currentUser : {}
    }
    submitHandler = (data) => {
        data['postid'] = this.props.post.id;
        addComment(data)
            .then(response => {
                NotifyMe('success', JSON.stringify(response.data));
                this.props.updateComment();
            })
            .catch(err => {
                NotifyMe('error', JSON.stringify(err));
            })
    }
    componentDidMount(){
        this.checkLoginStatus();
    }
    checkLoginStatus = () => {
        currentUserDetails()
            .then(response => {
                if(response.data.result === 'success'){
                    this.setState({
                        currentUser : response.data.content
                    })
                }else{
                    this.setState({ currentUser : {} })
                }
            })
            .catch(err => {
                NotifyMe('error', JSON.stringify(err));
            })
    }
    onReply = () => {
    }
    render(){

        console.log('current user:  ', this.state.currentUser)

        return <div>
            <Comment.Group>
                {   
                    !isObjEmpty(comments) &&
                    Object.keys(comments).map((val, id) => {
                        var comment = comments[val];
                        return <Comment>
                            <Comment.Avatar src={comment.avatar} />
                            <Comment.Content>
                                <Comment.Author as='a'>{comment.name}</Comment.Author>
                                <Comment.Metadata>
                                <div>
                                { moment.unix(parseInt(comment.datetime, 10)/1000).format("MMMM Do YYYY, h:mm:ss a") !== 'Invalid date'
                                    ? moment.unix(parseInt(comment.datetime, 10)/1000).format("MMMM Do YYYY, h:mm:ss a")
                                    : ''
                                } </div>
                                </Comment.Metadata>
                                <Comment.Text>{comment.comment}</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action onClick={this.onReply}>Reply</Comment.Action>
                                </Comment.Actions>
                                {/* {this.state.replyformstatus && replyform } */}
                            </Comment.Content>
                        </Comment>
                    })
                }
                {   
                    isObjEmpty(this.state.currentUser) 
                    ? <div>
                        <h5>Please sign in to comment.</h5>
                    </div>
                    : <div>
                        <h3>Your comment</h3>
                        <InputComponent 
                            data={commentFormData}
                            click = {this.submitHandler} />
                    </div> 
                }
                
                
            </Comment.Group>
        </div>


        const comments = this.props.post.comments;
        if(!comments){
            return <div>
                <p>Be the first one to comment!</p>
                <InputComponent 
                    data={commentFormData}
                    click = {this.submitHandler} />
            </div>
        }else{
            
        }
    }
}

export default CommentHandler;