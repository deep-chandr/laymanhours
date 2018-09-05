import React , {Component} from 'react';
import classes from './indivisualPost.css';
import MyContainer from '../hoc/myContainer';
import imgsmp from '../2.jpg';
import { inject, observer } from 'mobx-react';
import queryString from 'query-string';
import { getTopPostData } from '../utils/apiCall';
import { NotifyMe } from '../utils/notifyMe';

class IndivisualPost extends Component{
    state = {
        currentPost : {}
    }
    componentWillMount(){
        const store = this.props.mainStore;
        if(!store.posts.length){
            this.getPosts();
        }else{
            this.searchThePost();
        }
    }
    searchThePost = () => {
        const store = this.props.mainStore;
        const parsedObj = queryString.parse(this.props.location.search);
        Object.keys(store.posts).map((val, i) => {
            if(store.posts[val].id === parseInt(parsedObj.id)){
                this.setState({
                    currentPost : store.posts[val]
                })
            }
        })
    }
    getPosts = () => {
        const store = this.props.mainStore; 
        getTopPostData()
            .then(res => {
                store.posts = res.data;
                this.searchThePost();
            })
            .catch(err => NotifyMe('error', JSON.stringify(err)))
    }
    render(){
        const currentPost = this.state.currentPost;
        return <MyContainer>
            <div className={classes.postContent}>
                <h1 className={classes.mainHeading}>{currentPost.title}</h1>
                <img alt='' src={currentPost.imgList} style={{'width': '100%'}} />
                <p>{currentPost.content}</p>
            </div>
            <div className={classes.postFeedback}></div>
        </MyContainer>;
    }
}

export default inject('mainStore')(observer(IndivisualPost));