import React, { Component } from 'react';
import classes from './topPost.css';
import { Grid, Image, Header, Button } from 'semantic-ui-react';
import imgsmp from './1.png';
import Slider from "react-slick";
import { getTopPostData } from '../utils/apiCall';
import { NotifyMe } from '../utils/notifyMe';


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
        getTopPostData()
            .then(res => {
                this.setState({
                    posts : res.data
                })
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
        var settings = {
            dots: true,
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
                                                        this.state.posts.map((val, i) => {
                                                            return <div>
                                                                <Image src={val.imgList} />
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
                                            {/* <Grid.Row>
                                                <Grid.Column width={16} className={classes.mainHeading}>
                                                    
                                                </Grid.Column>
                                            </Grid.Row> */}
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

export default topPost;