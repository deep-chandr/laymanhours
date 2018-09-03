import React, { Component } from 'react';
import classes from './topPost.css';
import { Grid, Image } from 'semantic-ui-react';
import Slider from "react-slick";
import { getTopPostData } from '../utils/apiCall';
import { NotifyMe } from '../utils/notifyMe';
import { inject, observer } from 'mobx-react';


class topPost extends Component{
    constructor(props) {
        super(props)
        this.sliderNext = this.sliderNext.bind(this)
        this.sliderPrevious = this.sliderPrevious.bind(this)
        this.state = {
            posts : []
        }
    }
    componentDidMount(){
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
    
    render(){
        const store = this.props.mainStore;
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            draggable : true
          };
        return <div className={classes.topPost}>
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
                                        <h1 className={classes.header} size='huge'>
                                            <span className={classes.headWord1}>Top</span> 
                                            <span className={classes.headWord2}>Post</span>
                                        </h1>
                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={16} className={classes.main}>
                                                <Slider {...settings} ref={node => this.carousel = node } >
                                                    {
                                                        store.posts.map((val, i) => {
                                                            return <div>
                                                                <div style={{ 'background-color': 'rgb(246, 247, 251)'}}>
                                                                    <Image style={{'max-height': '500px'}} centered src={val.imgList} />
                                                                </div>
                                                                <div className={classes.center} >
                                                                    <h1>{val.title}</h1>
                                                                    <span>{val.date} | {val.time}</span>
                                                                </div>
        
                                                                <div className={classes.content}>
                                                                    <p>{val.content}</p>
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
                                        <div style={{'height': '100%', 'background-color': 'rgb(246, 247, 251)'}}>
                                            
                                        </div>
                                        
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
        </div>
    }
}

export default inject('mainStore')(observer(topPost));