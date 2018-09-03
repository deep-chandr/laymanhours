import React, { Component } from 'react';

import classes from './featuredPost.css';
import { Grid } from 'semantic-ui-react';
import imgsmp from './1.png';

class featuredPost extends Component{
    state={
        samplecontent: []
    }
    componentDidMount(){
        const samplecontent = [
            {
                'mainHeading': 'padmavati',
                'mainDate' : '27th Sept 18',
                'mainTime' : '02:00 pm',
                'content' : 'Now that’s what I call stupid: In my junior year of high school, this guy asked me on a date. He rented a Redbox movie and made a pizza. We were watching the movie and the oven beeped so the pizza was done. He looked me dead in the eye and said, “This is the worst part.” I then watched this boy open the oven and pull the pizza out with his bare hands, rack and all, screaming at the top of his lungs. We never had a second date.',
                'imgArr' : [imgsmp, imgsmp, imgsmp, imgsmp, imgsmp]
            },{
                'mainHeading': 'padmavati',
                'mainDate' : '27th Sept 18',
                'mainTime' : '02:00 pm',
                'content' : 'Now that’s what I call stupid: In my junior year of high school, this guy asked me on a date. He rented a Redbox movie and made a pizza. We were watching the movie and the oven beeped so the pizza was done. He looked me dead in the eye and said, “This is the worst part.” I then watched this boy open the oven and pull the pizza out with his bare hands, rack and all, screaming at the top of his lungs. We never had a second date.',
                'imgArr' : [imgsmp, imgsmp, imgsmp, imgsmp, imgsmp]
            },{
                'mainHeading': 'padmavati',
                'mainDate' : '27th Sept 18',
                'mainTime' : '02:00 pm',
                'content' : 'Now that’s what I call stupid: In my junior year of high school, this guy asked me on a date. He rented a Redbox movie and made a pizza. We were watching the movie and the oven beeped so the pizza was done. He looked me dead in the eye and said, “This is the worst part.” I then watched this boy open the oven and pull the pizza out with his bare hands, rack and all, screaming at the top of his lungs. We never had a second date.',
                'imgArr' : [imgsmp, imgsmp, imgsmp, imgsmp, imgsmp]
            },{
                'mainHeading': 'padmavati',
                'mainDate' : '27th Sept 18',
                'mainTime' : '02:00 pm',
                'content' : 'Now that’s what I call stupid: In my junior year of high school, this guy asked me on a date. He rented a Redbox movie and made a pizza. We were watching the movie and the oven beeped so the pizza was done. He looked me dead in the eye and said, “This is the worst part.” I then watched this boy open the oven and pull the pizza out with his bare hands, rack and all, screaming at the top of his lungs. We never had a second date.',
                'imgArr' : [imgsmp, imgsmp, imgsmp, imgsmp, imgsmp]
            }
        ]
        this.setState({
            samplecontent : samplecontent
        })
    }
    render(){
        return <div className={classes.topPost}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={1} className={classes.arrowSpace}>
                        {/* <div style={{ 'display': 'flex', 'align-items': 'center','justify-content': 'center', 'height': '100vh'}}>
                            <i class="massive chevron left icon"></i>
                        </div> */}
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div>
                            <Grid>
                                <Grid.Row>
                                    <Grid.Column width={12} className={classes.main}>

                                        <h1 className={classes.header} size='huge'>
                                            <span className={classes.headWord1}>Featured</span> 
                                            <span className={classes.headWord2}>Post</span>
                                        </h1>
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
                        {/* <div style={{ 'display': 'flex', 'align-items': 'center','justify-content': 'center', 'height': '100vh'}}>
                            <i class="massive chevron right icon"></i>
                        </div> */}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <div style={{ 'background-color': '', 'padding': '0 5%' }}>
                            <Grid doubling columns={2}>
                                <Grid.Row stretched >
                                    {
                                        this.state.samplecontent.map((val, i) => {
                                            
                                            return <Grid.Column  className={classes.main} style={{ 'padding': '0 5% 5% 5%' }}>
                                                <Grid doubling>
                                                    <Grid.Row stretched>
                                                        <Grid.Column width={11} style={{ 'padding': '2%'}}>
                                                            
                                                            <Grid  columns={2} >
                                                                <Grid.Row stretched>
                                                                <Grid.Column style={{ 'padding': '0'}}>
                                                                    <img alt='' src={val.imgArr[0]} style={{'height': '100%', 'object-fit': 'cover', 'width': '100%', 'background-color': 'red'}} />
                                                                    <img alt='' src={val.imgArr[1]} style={{'height': '100%', 'object-fit': 'cover', 'width': '100%'}} />
                                                                </Grid.Column>
                                                                <Grid.Column  style={{ 'padding': '0'}}>
                                                                    <img alt='' src={val.imgArr[2]} style={{'height': '100%', 'object-fit': 'cover', 'width': '100%'}} />
                                                                    <img alt='' src={val.imgArr[3]} style={{'height': '100%', 'object-fit': 'cover', 'width': '100%'}} />
                                                                </Grid.Column>
                                                                </Grid.Row>
                                                            </Grid>
                                                        </Grid.Column>
                                                        <Grid.Column width={5} style={{ 'padding': '0'}}>
                                                            <img alt='' src={val.imgArr[4]} style={{ 'object-fit': 'cover', 'width': '100%'}} />
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </Grid.Column>
                                        })
                                    }
                                    

                                    {/* <Grid.Column  className={classes.main} style={{ 'padding': '0 5% 5% 5%' }}>
                                        <img src={imgsmp} style={{'max-height': '400px', 'object-fit': 'cover', 'width': '100%'}} />
                                    </Grid.Column>
                                    <Grid.Column  className={classes.main} style={{ 'padding': '0 5% 5% 5%' }}>
                                        <img src={imgsmp} style={{'max-height': '400px', 'object-fit': 'cover', 'width': '100%'}} />
                                    </Grid.Column>
                                    <Grid.Column  className={classes.main} style={{ 'padding': '0 5% 5% 5%' }}>
                                        <img src={imgsmp} style={{'max-height': '400px', 'object-fit': 'cover', 'width': '100%'}} />
                                    </Grid.Column> */}
                                </Grid.Row>
                                {/* <Grid.Row>
                                    <Grid.Column width={12} className={classes.main} style={{'background-color': 'red'}}>
                                        <img src={imgsmp} style={{'max-height': '400px', 'object-fit': 'cover', 'width': '100%'}} />
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <div style={{'height': '100%', 'background-color': 'rgb(246, 247, 251)'}}>
                                            <img src={imgsmp}  />
                                        </div>
                                    </Grid.Column>
                                </Grid.Row> */}
                                
                            </Grid>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
        </div>
    }
}

export default featuredPost;
