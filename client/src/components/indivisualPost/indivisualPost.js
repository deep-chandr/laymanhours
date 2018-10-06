import React , {Component} from 'react';
import classes from './indivisualPost.css';
import MyContainer from '../hoc/myContainer';
import imgsmp from '../2.jpg';
import { inject, observer } from 'mobx-react';
import queryString from 'query-string';
import { getTopPostData, getAuthorDetails } from '../utils/apiCall';
import { NotifyMe } from '../utils/notifyMe';
import { Grid, Image, Button } from 'semantic-ui-react';
import SocialMediaLinks from '../utils/socialMedia/socialMediaLinks';
import moment from 'moment';
import MediaQuery from 'react-responsive';
import CommentHandler from '../utils/commentHandler/commentHandler';

class IndivisualPost extends Component{
    state = {
        currentPost : {},
        authorDetails : {},
        demoContent : `What is Lorem Ipsum?
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        
        Why do we use it?
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`

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
        Object.keys(store.posts).map(val => {
            if(parseInt(val, 10) === parseInt(parsedObj.id, 10)){
                this.setState({
                    currentPost : store.posts[val]
                })
            }
            return null;
        })
    }
    searchTheAuthor = () => {
        const author = this.state.currentPost.author;
        getAuthorDetails(author)
            .then(res => {
                this.setState({
                    authorDetails : res.data
                })
            })
            .catch(err => NotifyMe('error', JSON.stringify(err.message)))
    }

    getPosts = () => {
        const store = this.props.mainStore; 
        getTopPostData()
            .then(res => {
                store.posts = res.data;
                this.searchThePost();
                this.searchTheAuthor();
            })
            .catch(err => NotifyMe('error', JSON.stringify(err)))
    }
    updatePage =() => {
        NotifyMe('success', 'imcalled')
        this.getPosts();
    }
    render(){
        const currentPost = this.state.currentPost;
        return <MyContainer>
            <MediaQuery minWidth={1224}>
                <Grid style={{ 'margin-top': '15px' }}>
                    <Grid.Row>
                        <Grid.Column width={11}>
                            <div style={{ 'text-align': 'center' }}>
                                <Button onClick={() => this.props.history.push('/')} style={{ 'background-color': 'white',  'border-radius': '10%' }}>Back to home</Button>
                            </div>
                            <br/>
                            <div>
                                <img alt='' src={currentPost.imgList} style={{'width': '100%'}} />
                                {/* <p>{currentPost.content}</p> */}
                                <h1 className={classes.mainHeading}>{currentPost.title}</h1>
                                <h3 className={classes.mainHeading}>
                                    { moment.unix(parseInt(currentPost.datetime, 10)/1000).format("MMMM Do YYYY, h:mm:ss a") !== 'Invalid date'
                                        ? moment.unix(parseInt(currentPost.datetime, 10)/1000).format("MMMM Do YYYY, h:mm:ss a")
                                        : ''
                                    }  
                                    |  {currentPost.description}
                                </h3>
                                
                                <p className={classes.content}>{this.state.demoContent}</p>
                            </div>
                            <br/>
                            <div style={{ 'text-align': 'center' }}>
                                <Button onClick={() => this.props.history.push('/')} style={{ 'background-color': 'white',  'border-radius': '10%' }}>Back to home</Button>
                            </div>
                            <h3>Comments</h3>
                            <CommentHandler post={currentPost} updateComment={this.updatePage} /> 
                            <br/>
                            <div style={{ 'text-align': 'center' }}>
                                <Button onClick={() => this.props.history.push('/')} style={{ 'background-color': 'white',  'border-radius': '10%' }}>Back to home</Button>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <div className={classes.authorWrapper}>
                                <div style={{  'height': '100px', 'margin-bottom': '50px', 'background-color': 'grey'}}>
                                    Advertisement
                                </div>
                                <div>
                                    <Image circular src={imgsmp} width='100%' / >
                                </div>
                                
                                {/* {
                                    Object.keys(this.state.authorDetails).length && 
                                    <SocialMediaLinks details={this.state.authorDetails} />
                                } */}
                                {
                                    Object.keys(this.state.authorDetails).length 
                                        ? Object.keys(this.state.authorDetails).map(val => <div>
                                            {/* <span>{val}:</span> */}
                                            <p style={{ 'text-align': 'center' }}>{this.state.authorDetails[val]}</p>
                                        </div>)
                                        : <p>Author details couldn't be fetched.</p>
                                }
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </MediaQuery>
            
            <MediaQuery maxWidth={1224}>
                <Grid style={{ 'margin-top': '15px' }}>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <div>
                                <img alt='' src={currentPost.imgList} style={{'width': '100%'}} />
                                {/* <p>{currentPost.content}</p> */}
                                <h1 className={classes.mainHeading}>{currentPost.title}</h1>
                                <h3 className={classes.mainHeading}>
                                    { moment.unix(parseInt(currentPost.datetime, 10)/1000).format("MMMM Do YYYY, h:mm:ss a") !== 'Invalid date'
                                        ? moment.unix(parseInt(currentPost.datetime, 10)/1000).format("MMMM Do YYYY, h:mm:ss a")
                                        : ''
                                    }  
                                    |  {currentPost.description}
                                </h3>
                                
                                <p className={classes.content}>{this.state.demoContent}</p>
                            </div>
                            <div className={classes.postFeedback}></div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <div className={classes.authorWrapper}>
                                <Image src={imgsmp} width='100%' / >
                                {
                                    Object.keys(this.state.authorDetails).length && 
                                    <SocialMediaLinks details={this.state.authorDetails} />
                                }
                            </div>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </MediaQuery>

        </MyContainer>;
    }
}

export default inject('mainStore')(observer(IndivisualPost));