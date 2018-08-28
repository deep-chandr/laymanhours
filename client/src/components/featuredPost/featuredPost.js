import React, { Component } from 'react';

import classes from './featuredPost.css';
import { Grid, Image, Header,Segment } from 'semantic-ui-react';
import imgsmp from './1.png';

class featuredPost extends Component{
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
                                    <Grid.Column  className={classes.main}>
                                        <Grid doubling>
                                            <Grid.Row stretched>
                                                <Grid.Column width={11}>
                                                    <Grid  columns={2} >
                                                        <Grid.Row stretched>
                                                        <Grid.Column>
                                                            <img src={imgsmp} style={{'height': '100%', 'object-fit': 'cover', 'width': '100%'}} />
                                                            <img src={imgsmp} style={{'height': '100%', 'object-fit': 'cover', 'width': '100%'}} />
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <img src={imgsmp} style={{'height': '100%', 'object-fit': 'cover', 'width': '100%'}} />
                                                            <img src={imgsmp} style={{'height': '100%', 'object-fit': 'cover', 'width': '100%'}} />
                                                        </Grid.Column>
                                                        </Grid.Row>
                                                    </Grid>
                                                </Grid.Column>
                                                <Grid.Column width={5}>
                                                    <img src={imgsmp} style={{ 'object-fit': 'cover', 'width': '100%'}} />
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                        {/* <img src={imgsmp} style={{'max-height': '400px', 'object-fit': 'cover', 'width': '100%'}} /> */}
                                    </Grid.Column>

                                    <Grid.Column  className={classes.main}>
                                        <img src={imgsmp} style={{'max-height': '400px', 'object-fit': 'cover', 'width': '100%'}} />
                                    </Grid.Column>
                                    <Grid.Column  className={classes.main}>
                                        <img src={imgsmp} style={{'max-height': '400px', 'object-fit': 'cover', 'width': '100%'}} />
                                    </Grid.Column>
                                    <Grid.Column  className={classes.main}>
                                        <img src={imgsmp} style={{'max-height': '400px', 'object-fit': 'cover', 'width': '100%'}} />
                                    </Grid.Column>
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