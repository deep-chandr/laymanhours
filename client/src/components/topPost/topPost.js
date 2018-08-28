import React, { Component } from 'react';
import classes from './topPost.css';
import { Grid, Image, Header } from 'semantic-ui-react';
import imgsmp from './1.png';

class topPost extends Component{
    render(){
        return <div className={classes.topPost}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={1} className={classes.arrowSpace}>
                        <div style={{ 'display': 'flex', 'align-items': 'center','justify-content': 'center', 'height': '100vh'}}>
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
                                                    <Image src={imgsmp} />
                                                </Grid.Column>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Grid.Column width={16} className={classes.mainHeading}>
                                                    <div className={classes.center} >
                                                        <h1>Kerala Flood Relief</h1>
                                                        <span>date | time</span>
                                                    </div>

                                                    <div className={classes.content}>
                                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting 
                                                            industry. Lorem Ipsum has been the industry's standard dummy text
                                                            ever since the 1500s, when an unknown printer took a galley of
                                                            type and scrambled it to make a type specimen book. It has 
                                                            survived not only five centuries, but also the leap into
                                                            electronic typesetting, remaining essentially unchanged. 
                                                            It was popularised in the 1960s with the release of Letraset 
                                                            sheets containing Lorem Ipsum passages, and more recently with 
                                                            desktop publishing software like Aldus PageMaker including 
                                                            versions of Lorem Ipsum.</p>
                                                    </div>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        {/* <Image src='http://www.fanghuomen.org/data/out/149/648637.jpeg' /> */}
                                        <div style={{'height': '100%', 'background-color': 'rgb(246, 247, 251)'}}>
                                            
                                        </div>
                                        
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={1} className={classes.arrowSpace}>
                        <div style={{ 'display': 'flex', 'align-items': 'center','justify-content': 'center', 'height': '100vh'}}>
                            <i class="massive chevron right icon"></i>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
        </div>
    }
}

export default topPost;