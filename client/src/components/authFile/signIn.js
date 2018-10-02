import React, {Component} from 'react';
import MyContainer from '../hoc/myContainer';
import { Grid, Menu, Segment, Button } from 'semantic-ui-react';
import InputComponent from '../utils/inputComponent';
import { authenticateUser, newAuthenticateUser, currentUserDetails, signoutuser, createNewUserProfile, fetchprofiledata } from '../utils/apiCall';
import { NotifyMe } from '../utils/notifyMe';
import { inject, observer } from 'mobx-react';
import withRouter from 'react-router-dom/withRouter';
import { myCurrentUserDetails } from '../utils/utilityFunctions';

const input_fields_for_signin_signup =  [
    {'name': 'Email', 'key': 'email', 'type': 'stringtype', 'not-empty': true},
    {'name': 'Password', 'key': 'password', 'type': 'stringtype', 'not-empty': true},
];

class SignIn extends Component{
    state = { activeItem: 'signin' }
  
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    onSubmitFormData = (data) => {
        if(this.state.activeItem === 'signin'){
            authenticateUser(data)
                .then(response => {
                    if(response.data.result === 'success'){
                        this.props.mainStore.currentUser = response.data.content;
                        NotifyMe('success', JSON.stringify(response.data));
                        this.props.history.push('/profile')
                    }else{
                        NotifyMe('error', JSON.stringify(response.data.message));
                    }
                })
                .catch(err => {
                    NotifyMe('error', JSON.stringify(err));
                })
        }else if(this.state.activeItem === 'signup'){
            newAuthenticateUser(data)
                .then(response => {
                    if(response.data.result === 'success'){
                        this.props.mainStore.currentUser = response.data.content;
                        NotifyMe('success', JSON.stringify(response.data));
                    }else{
                        NotifyMe('error', JSON.stringify(response.data));
                    }
                })
                .catch(err => {
                    NotifyMe('error', JSON.stringify(err.data));
                })
        }
    }
    // createUserProfile = () => {
    //     const email = this.props.mainStore.currentUser.email;
    //     createNewUserProfile({email : email })
    //         .then(response => {
    //             NotifyMe('success', JSON.stringify(response))
    //         })
    //         .catch(err => {
    //             NotifyMe('error', JSON.stringify(err.data));
    //         })
    // }
    // fetchProfileData = () => {
    //     const email = this.props.mainStore.currentUser.email;
    //     fetchprofiledata({email : email })
    //         .then(response => {
    //             let obj = {
    //                 ...this.props.mainStore.currentUser,
    //                 ...response.data
    //             }
    //             this.props.mainStore.currentUser = obj;
    //             NotifyMe('success', JSON.stringify(response.data))
    //         })
    //         .catch(err => {
    //             NotifyMe('error', JSON.stringify(err.data));
    //         })
    // }
    fetchCurrentUserDetails = () => {
        currentUserDetails()
            .then(response => {
                if(response.data.result === 'success'){
                    this.props.mainStore.currentUser = response.data;
                    NotifyMe('success', JSON.stringify(response.data.content));
                }else{
                    NotifyMe('error', response.data.message);
                }
            })
            .catch(err => {
                NotifyMe('error', JSON.stringify(err));
            })
    }
    signout = () => {
        signoutuser()
                .then(response => {
                    this.props.mainStore.currentUser = {};
                    NotifyMe('success', response.data);
                })
                .catch(err => {
                    NotifyMe('error', err.data);
                })
    }
    render(){
        const { activeItem } = this.state
        return (
            <MyContainer>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Menu pointing>
                                <Menu.Item 
                                    name='signin' 
                                    active={activeItem === 'signin'} 
                                    onClick={this.handleItemClick} />
                                <Menu.Item
                                    name='signup'
                                    active={activeItem === 'signup'}
                                    onClick={this.handleItemClick}
                                />
                            </Menu>

                            <Segment>
                                <InputComponent 
                                    data={input_fields_for_signin_signup}
                                    click={this.onSubmitFormData} />
                                {/* <Image src={imgsmp} /> */}
                            </Segment>
                            <Button onClick={() => {this.fetchCurrentUserDetails('signin')}}>currentUserDetails</Button>
                            <Button onClick={this.signout}>Sign Out</Button>
                            
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </MyContainer>
        );
    }
}

export default inject('mainStore')(withRouter(observer(SignIn)));