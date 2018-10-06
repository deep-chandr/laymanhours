import React, { Component } from 'react';
import classes from './topPost.css';
import { Grid, Image, Card, Icon } from 'semantic-ui-react';
import Slider from "react-slick";
import { getTopPostData } from '../utils/apiCall';
import { NotifyMe } from '../utils/notifyMe';
import { inject, observer } from 'mobx-react';
import {Link} from 'react-router-dom';
import withRouter from 'react-router-dom/withRouter';
import CommentHandler from '../utils/commentHandler/commentHandler';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import MediaQuery from 'react-responsive';

class topPost extends Component{
    constructor(props) {
        super(props)
        this.sliderNext = this.sliderNext.bind(this)
        this.sliderPrevious = this.sliderPrevious.bind(this)
        this.state = {
            posts : []
        }
    }
    componentWillMount(){
        const store = this.props.mainStore; 
        if(!store.posts.length){
            this.getPosts();
        }
    }

    getPosts = () => {
        const store = this.props.mainStore; 
        getTopPostData()
            .then(res => {
                store.posts = res.data;
            })
            .catch(err => NotifyMe('error', JSON.stringify(err)))
    }
    sliderNext() {
        this.carousel.slickNext();
    }
    sliderPrevious() {
        this.carousel.slickPrev();
    }
    updatePage =() => {
        NotifyMe('success', 'imcalled')
        this.getPosts();
    }
    render(){
        const store = this.props.mainStore;
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable : true,
            adaptiveHeight: true
          };
        return <div className={classes.topPost}>
            <MediaQuery minWidth={1224}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={1} className={classes.arrowSpace}>
                            <div onClick={this.sliderPrevious} style={{ 'display': 'flex', 'align-items': 'center','justify-content': 'center', 'height': '100vh'}}>
                                <i class="massive chevron left icon"></i>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={14}>
                            <div>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={12} className={classes.main}>
                                            <h1 className={classes.header} style={{ 'background-color': 'rgb(250, 250, 250)' }} size='huge'>
                                                <span className={classes.headWord1}>Top</span> 
                                                <span className={classes.headWord2}>Post</span>
                                            </h1>
                                            <Grid >
                                                <Grid.Row>
                                                    <Grid.Column width={16} className={classes.main}>
                                                    <Slider {...settings} ref={node => this.carousel = node } >
                                                        {
                                                            Object.keys(store.posts).map((item, i) => {
                                                                const val = store.posts[item];
                                                                return <div>
                                                                    <div>
                                                                        <Image style={{'max-height': '500px'}} centered src={val.imgList} />
                                                                    </div>
                                                                    <div  style={{ 'padding': '5vh 5vw' , 'overflow': 'hidden' }}>
                                                                        <div className={classes.center} >
                                                                            <Link to={{ pathname: this.props.location.pathname  +'post', search : '?id=' + val.id }}><h1>{val.title}</h1></Link>
                                                                            <span>
                                                                            { moment.unix(parseInt(val.datetime, 10)/1000).format("MMMM Do YYYY, h:mm:ss a") !== 'Invalid date'
                                                                                ? moment.unix(parseInt(val.datetime, 10)/1000).format("MMMM Do YYYY, h:mm:ss a")
                                                                                : ''
                                                                            } 
                                                                            </span>
                                                                        </div>
                                                                        <div className={classes.content} style={{ 'overflow': 'hidden'}}>
                                                                            <p><i>{val.description}</i></p>
                                                                        </div>
                                                                        {/* <h3>Comments</h3>
                                                                        <CommentHandler post={val} updateComment={this.updatePage} />  */}
                                                                        
                                                                    </div>
                                                                </div>
                                                            })
                                                        }
                                                            
                                                    </Slider>
                                                        
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                            {
                                                !Object.keys(store.posts).length 
                                                    ? <noscript />
                                                    : <div style={{'height': '100%', 'background-color': 'rgb(246, 247, 251)', 'padding': '10vh 15px', 'text-align': 'center'}}>
                                                        <div>
                                                            <h4>Recent Posts</h4>
                                                        </div>
                                                        <div>
                                                            {
                                                                Object.keys(store.posts).map((val) => {
                                                                    return <Link to={{ pathname: this.props.location.pathname  +'post', search : '?id=' + store.posts[val]['id'] }}>
                                                                        <Card fluid style={{'margin-top': '15px'}}>
                                                                            <Image src={store.posts[val]['imgList']} />
                                                                            <Card.Content>
                                                                                {/* <Card.Header>Matthew</Card.Header> */}
                                                                                <Card.Meta>
                                                                                    <span className='date'>
                                                                                        { moment.unix(parseInt(store.posts[val]['datetime'], 10)/1000).format("MMMM Do YYYY, h:mm:ss a") !== 'Invalid date'
                                                                                            ? moment.unix(parseInt(store.posts[val]['datetime'], 10)/1000).format("MMMM Do YYYY, h:mm:ss a")
                                                                                            : ''
                                                                                        }
                                                                                    </span>
                                                                                </Card.Meta>
                                                                                <Card.Description>{store.posts[val]['title']}</Card.Description>
                                                                            </Card.Content>
                                                                            {/* <Card.Content extra>
                                                                                <a>
                                                                                    <Icon name='user' />
                                                                                    22 Friends
                                                                                </a>
                                                                            </Card.Content> */}
                                                                        </Card>
                                                                    </Link>
                                                                })
                                                            }
                                                        </div>
        
                                                        {/* <Image style={{'max-height': '500px'}} centered src='https://i.pinimg.com/736x/a9/d6/54/a9d654bf6c1c80f95ee13e47a475e6f0.jpg' />
                                                        <Image style={{'max-height': '500px'}} centered src='https://i.pinimg.com/736x/a9/d6/54/a9d654bf6c1c80f95ee13e47a475e6f0.jpg' />
                                                        <Image style={{'max-height': '500px'}} centered src='https://i.pinimg.com/736x/a9/d6/54/a9d654bf6c1c80f95ee13e47a475e6f0.jpg' /> */}
        
                                                    </div>
                                            }
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={1} className={classes.arrowSpace}>
                            <div  onClick={this.sliderNext}
                                style={{ 'display': 'flex', 'align-items': 'center','justify-content': 'center', 'height': '100vh'}}>
                                <i class="massive chevron right icon" ></i>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </MediaQuery>
            
            <MediaQuery maxWidth={1224}>
                <Grid>
                    <Grid.Row>
                        {/* <Grid.Column width={1} className={classes.arrowSpace}>
                            <div onClick={this.sliderPrevious} style={{ 'display': 'flex', 'align-items': 'center','justify-content': 'center', 'height': '100vh'}}>
                                <i class="massive chevron left icon"></i>
                            </div>
                        </Grid.Column> */}
                        <Grid.Column width={16}>
                            <div>
                                <Grid>
                                    <Grid.Row>
                                        <Grid.Column width={16} className={classes.main}>
                                            <h1 className={classes.header} size='big'>
                                                <span className={classes.headWord1}>Top</span> 
                                                <span className={classes.headWord2}>Post</span>
                                            </h1>
                                            <Grid >
                                                <Grid.Row>
                                                    <Grid.Column width={16} className={classes.main}>
                                                    <Slider {...settings} ref={node => this.carousel = node } >
                                                        {
                                                            Object.keys(store.posts).map((item, i) => {
                                                                const val = store.posts[item];
                                                                return <div>
                                                                    <div>
                                                                        <Image style={{'max-height': '500px'}} centered src={val.imgList} />
                                                                    </div>
                                                                    <div  style={{ 'padding': '5vh 5vw' }}>
                                                                        <div className={classes.center} >
                                                                            <Link to={{ pathname: this.props.location.pathname  +'post', search : '?id=' + val.id }}><h1>{val.title}</h1></Link>
                                                                            <span>
                                                                            { moment.unix(parseInt(val.datetime, 10)/1000).format("MMMM Do YYYY, h:mm:ss a") !== 'Invalid date'
                                                                                ? moment.unix(parseInt(val.datetime, 10)/1000).format("MMMM Do YYYY, h:mm:ss a")
                                                                                : ''
                                                                            } 
                                                                            </span>
                                                                        </div>
                
                                                                        <div className={classes.content}>
                                                                            <p>{ ReactHtmlParser(val.content) }</p>
                                                                        </div>
                                                                        <h3>Comments</h3>
                                                                        <CommentHandler post={val} updateComment={this.updatePage} /> 
                                                                        
                                                                    </div>
                                                                </div>
                                                            })
                                                        }
                                                            
                                                    </Slider>
                                                        
                                                    </Grid.Column>
                                                </Grid.Row>
                                            </Grid>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width={16}>
                                            <div style={{'height': '100%', 'background-color': 'rgb(246, 247, 251)'}}>
                                                {/* <Image style={{'max-height': '500px'}} centered src='https://i.pinimg.com/736x/a9/d6/54/a9d654bf6c1c80f95ee13e47a475e6f0.jpg' />
                                                <Image style={{'max-height': '500px'}} centered src='https://i.pinimg.com/736x/a9/d6/54/a9d654bf6c1c80f95ee13e47a475e6f0.jpg' />
                                                <Image style={{'max-height': '500px'}} centered src='https://i.pinimg.com/736x/a9/d6/54/a9d654bf6c1c80f95ee13e47a475e6f0.jpg' /> */}
                                                {
                                                    !Object.keys(store.posts).length 
                                                        ? <noscript />
                                                        : <div style={{'height': '100%', 'background-color': 'rgb(246, 247, 251)', 'padding': '10vh 15px', 'text-align': 'center'}}>
                                                            <div>
                                                                <h4>Recent Posts</h4>
                                                            </div>
                                                            <div>
                                                                {
                                                                    Object.keys(store.posts).map((val, id) => {
                                                                        // return <div style={{ 'border': '1px solid black', 'margin-top': '10px', 'background-color': 'white' }}>
                                                                        //     {store.posts[val]['title']}
                                                                        // </div>
                                                                        return <Card fluid>
                                                                            <Card.Content>
                                                                                {/* <Card.Header>Matthew</Card.Header> */}
                                                                                <Card.Meta>
                                                                                    <span className='date'>
                                                                                        { moment.unix(parseInt(store.posts[val]['datetime'], 10)/1000).format("MMMM Do YYYY, h:mm:ss a") !== 'Invalid date'
                                                                                            ? moment.unix(parseInt(store.posts[val]['datetime'], 10)/1000).format("MMMM Do YYYY, h:mm:ss a")
                                                                                            : ''
                                                                                        }
                                                                                    </span>
                                                                                </Card.Meta>
                                                                                <Card.Description>{store.posts[val]['title']}</Card.Description>
                                                                            </Card.Content>
                                                                            {/* <Card.Content extra>
                                                                                <a>
                                                                                    <Icon name='user' />
                                                                                    22 Friends
                                                                                </a>
                                                                            </Card.Content> */}
                                                                        </Card>
                                                                    })
                                                                }
                                                            </div>
            
                                                            {/* <Image style={{'max-height': '500px'}} centered src='https://i.pinimg.com/736x/a9/d6/54/a9d654bf6c1c80f95ee13e47a475e6f0.jpg' />
                                                            <Image style={{'max-height': '500px'}} centered src='https://i.pinimg.com/736x/a9/d6/54/a9d654bf6c1c80f95ee13e47a475e6f0.jpg' />
                                                            <Image style={{'max-height': '500px'}} centered src='https://i.pinimg.com/736x/a9/d6/54/a9d654bf6c1c80f95ee13e47a475e6f0.jpg' /> */}
            
                                                        </div>
                                                }
                                            </div>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </div>
                        </Grid.Column>
                        {/* <Grid.Column width={1} className={classes.arrowSpace}>
                            <div  onClick={this.sliderNext}
                                style={{ 'display': 'flex', 'align-items': 'center','justify-content': 'center', 'height': '100vh'}}>
                                <i class="massive chevron right icon" ></i>
                            </div>
                        </Grid.Column> */}
                    </Grid.Row>
                </Grid>
            </MediaQuery>
        </div>
    }
}

export default inject('mainStore')(withRouter(observer(topPost)));