import React, {Component} from 'react';
import {Grid, Image, Button} from 'semantic-ui-react';
import classes from './UserProfile.css';
import { inject, observer } from 'mobx-react';
import withRouter from 'react-router-dom/withRouter';
import InputComponent from '../utils/inputComponent';
import { updateuserprofiledata } from '../utils/apiCall';
import { NotifyMe } from '../utils/notifyMe';

const enter_profile_details = [
    {'name': 'Display Name', 'key': 'dname', 'type': 'stringtype', 'not-empty': true},
    {'name': 'Age', 'key': 'age', 'type': 'stringtype', 'not-empty': true},
    {'name': 'Gender', 'key': 'gender', 'type': 'stringtype', 'not-empty': true},
    {'name': 'About Yourself', 'key': 'about', 'type': 'stringtype', 'not-empty': true},
];

class UserProfile extends Component{
    state = {
        editMode: false
    }
    enterEditMode = () => {
        this.setState({
            editMode : !this.state.editMode
        })
    }
    onSubmitFormData = (data) => {
        console.log(data);
        data['email'] = this.props.mainStore.currentUser.email;
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
        const store = this.props.mainStore;
        const user = store.currentUser;
        return <div className={classes.wrapper}>
            {
                Object.keys(store.currentUser).length
                    ? <noscript />
                    : <div className={classes.wrapperStyle}>
                        <Grid stackable columns={2}>
                            <Grid.Row>
                                <Grid.Column>
                                    <div className={classes.wrapperCard} >
                                        <div className={classes.cardColumns}>
                                            <Image 
                                                src='http://images.moviepostershop.com/popeye-the-sailor-man-movie-poster-1934-1020198356.jpg' 
                                                style={{'object-fit': 'cover','height': 'inherit', 'width': '100%'}} 
                                            />
                                        </div>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className={classes.wrapperCard} >
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
                                                        this.state.editMode 
                                                            ? <div style={{ 'padding' : '20px 15px' }}>
                                                                <InputComponent 
                                                                    data={enter_profile_details}
                                                                    click={this.onSubmitFormData} />
                                                            </div>
                                                            : <div>
                                                                <p className={classes.content}>{this.setDefaultValues(user.age)} | Male</p>
                                                                <div className={classes.headings}>About</div>
                                                                <p className={classes.content}>This is us. Our employees are highly decorated in skills and you should get inspiration from them</p>
                                                                <div className={classes.headings}>Email</div>
                                                                <p className={classes.content}>{this.setDefaultValues(user.email)}</p>
                                                                <div className={classes.headings}>Display Name</div>
                                                                <p className={classes.content}>addictd</p>
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
            }
        </div>
    }
}
export default inject('mainStore')(withRouter(observer(UserProfile)));