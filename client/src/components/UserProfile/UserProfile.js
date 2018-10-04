import React, {Component} from 'react';
import {Grid, Image, Button} from 'semantic-ui-react';
import classes from './UserProfile.css';
import { inject, observer } from 'mobx-react';
import withRouter from 'react-router-dom/withRouter';
import InputComponent from '../utils/inputComponent';
import { updateuserprofiledata, currentUserDetails } from '../utils/apiCall';
import { NotifyMe } from '../utils/notifyMe';
import MyContainer from '../hoc/myContainer';
import MediaQuery from 'react-responsive';
import profile from '../profile.jpg';

const enter_profile_details = [
    {'name': 'Display Name', 'key': 'dname', 'type': 'stringtype', 'not-empty': true},
    {'name': 'Age', 'key': 'age', 'type': 'stringtype', 'not-empty': true},
    {'name': 'Gender', 'key': 'gender', 'type': 'stringtype', 'not-empty': true},
    {'name': 'About Yourself', 'key': 'about', 'type': 'stringtype', 'not-empty': true},
    {'name': 'Mobile', 'key': 'mobile', 'type': 'stringtype', 'not-empty': true},
    {'name': 'Social Links', 'key': 'socialLinks', 'type': 'stringtype', 'not-empty': true},
    {'name': 'Profession', 'key': 'profession', 'type': 'stringtype', 'not-empty': true}
];

class UserProfile extends Component{
    state = {
        editMode: false,
        currentUser : {}
    }
    componentWillMount(){
        this.getProfileData();
    }
    getProfileData(){
        currentUserDetails()
            .then(response => {
                if(response.data.result === 'success'){
                    this.setState({
                        currentUser : response.data.content
                    })
                }else{
                    NotifyMe('error', response.data.message);
                    this.props.history.replace('/signin')
                }
            })
            .catch(err => {
                NotifyMe('error', JSON.stringify(err));
            })
    }
    enterEditMode = () => {
        this.setState({
            editMode : !this.state.editMode
        })
    }
    onSubmitFormData = (data) => {
        data['email'] = this.state.currentUser.email;
        updateuserprofiledata(data)
            .then(response => {
                NotifyMe('success', JSON.stringify(response.data))
            })
            .catch(err => {
                NotifyMe('error', JSON.stringify(err.data));
            })
    }
    setDefaultValues = (propertyName) => {
        if(propertyName){
            return propertyName;
        }else{
            return 'default'
        }
    }
    render(){
        console.log('user: ', this.state.currentUser)
        return <div className={classes.wrapper}>
            <MyContainer>
                <MediaQuery minWidth={1224}>
                    <Grid stackable columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <div style={{ 'margin': '20px 5%', 'padding': '20px' }} className={classes.wrapperCard} >
                                    <div className={classes.cardColumns}>
                                        <Image 
                                            src={profile} 
                                            style={{'object-fit': 'cover','height': 'inherit', 'width': '100%'}} 
                                        />
                                    </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div style={{ 'margin': '20px 5%', 'padding': '20px' }} className={classes.wrapperCard} >
                                    <div className={classes.cardColumns}>
                                        <div className={classes.wrapperContent}>
                                            <div style={{ 'padding' : '100px 20px', 'margin': '1% auto', 'background-color': 'rgba(246, 246, 251, .5)' }}>
                                                <div style={{ 'text-align' : 'center', 'padding': '15px 0' }}>
                                                    <Button 
                                                        onClick={this.enterEditMode}>
                                                        {this.state.editMode ? 'Back' : 'Edit'}
                                                    </Button>
                                                </div>
                                                {
                                                    this.state.editMode === true &&
                                                        <div style={{ 'padding' : '20px 15px' }}>
                                                            <InputComponent 
                                                                data={enter_profile_details}
                                                                click={this.onSubmitFormData} />
                                                        </div>
                                                }
                                                {
                                                    this.state.editMode === false &&
                                                    Object.keys(this.state.currentUser).length &&
                                                    Object.keys(this.state.currentUser).map(val => {
                                                        return <div style={{'width': '100%'}}>
                                                            <div className={classes.headings}>{val}: </div>
                                                            <p className={classes.content}>{ this.state.currentUser[val] }</p>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </MediaQuery>

                <MediaQuery maxWidth={1224}>
                    {/* <Grid stackable columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <div style={{ 'margin': '20px 1%', 'padding': '0' }} className={classes.wrapperCard} >
                                    <div className={classes.cardColumns}>
                                        <Image 
                                            src={profile} 
                                            style={{'object-fit': 'cover','height': 'inherit', 'width': '100%'}} 
                                        />
                                    </div>
                                </div>
                            </Grid.Column>
                            <Grid.Column>
                                <div style={{ 'margin': '20px 1%', 'padding': '0' }} className={classes.wrapperCard} >
                                    <div className={classes.cardColumns}>
                                        <div className={classes.wrapperContent}>
                                            <div style={{ 'padding' : '100px 20px', 'margin': '1% auto', 'background-color': 'rgba(246, 246, 251, .5)' }}>
                                                <div style={{ 'text-align' : 'center', 'padding': '15px 0' }}>
                                                    <Button 
                                                        onClick={this.enterEditMode}>
                                                        {this.state.editMode ? 'Back' : 'Edit'}
                                                    </Button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid> */}
                </MediaQuery>
                
            </MyContainer>
        </div>
    }
}
export default inject('mainStore')(withRouter(observer(UserProfile)));