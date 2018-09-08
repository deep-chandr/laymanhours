import React, {Component} from 'react';
import MyContainer from '../hoc/myContainer';
import { Grid, Input, Menu, Segment, Image, Button } from 'semantic-ui-react';
import imgsmp from '../2.jpg';
import InputComponent from '../utils/inputComponent';
import { authenticateUser, newAuthenticateUser, currentUserDetails, signoutuser } from '../utils/apiCall';
import { NotifyMe } from '../utils/notifyMe';

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
                    NotifyMe('success', JSON.stringify(response.data));
                })
                .catch(err => {
                    NotifyMe('error', JSON.stringify(err));
                })
        }else if(this.state.activeItem === 'signup'){
            newAuthenticateUser(data)
                .then(response => {
                    NotifyMe('success', response.data);
                })
                .catch(err => {
                    NotifyMe('error', err.data);
                })
        }
    }
    fetchCurrentUserDetails = () => {
        currentUserDetails()
                .then(response => {
                    NotifyMe('success', JSON.stringify(response.data));
                })
                .catch(err => {
                    NotifyMe('error', JSON.stringify(err.data));
                })
    }
    signout = () => {
        signoutuser()
                .then(response => {
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
                            <Button onClick={this.fetchCurrentUserDetails}>currentUserDetails</Button>
                            <Button onClick={this.signout}>Sign Out</Button>
                            
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </MyContainer>
        );
    }
}

export default SignIn;