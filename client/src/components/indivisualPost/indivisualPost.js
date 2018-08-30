import React , {Component} from 'react';
import classes from './indivisualPost.css';
import MyContainer from '../hoc/myContainer';
import imgsmp from '../2.jpg';

class IndivisualPost extends Component{
    state = {
        currentPost : {
            'title' : 'Kerala Flood Relief',
            'date' : '20 Oct',
            'time' : '02:00 pm',
            'author' : 'addictd',
            'content' : `Lorem Ipsum is simply dummy text of the printing and typesetting 
            industry. Lorem Ipsum has been the industry standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has 
            survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. 
            It was popularised in the 1960s with the release of Letraset 
            sheets containing Lorem Ipsum passages, and more recently with 
            desktop publishing software like Aldus PageMaker including 
            versions of Lorem Ipsum.`,
            'imgList' : imgsmp
        }
    }
    render(){
        const currentPost = this.state.currentPost;
        return <MyContainer>
            <div className={classes.postContent}>
                <h1 className={classes.mainHeading}>{currentPost.title}</h1>
                <img src={currentPost.imgList} style={{'width': '100%'}} />
                <p>{currentPost.content}</p>
            </div>
            <div className={classes.postFeedback}></div>
        </MyContainer>;
    }
}
export default IndivisualPost;