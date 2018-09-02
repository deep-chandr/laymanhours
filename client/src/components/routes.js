import React, {Component} from 'react';
import {Route } from 'react-router-dom';
import Aux from './hoc/Aux';
import IndivisualPost from './indivisualPost/indivisualPost';
import Main from './main/main';
import AddNewPost from './addNewPost/addNewPost';


class Routes extends Component{
    render(){
        return <Aux>
            <Route path='/post'
                exact
                component={IndivisualPost} />
            <Route path='/addnewpost'
                exact
                component={AddNewPost} />
            <Route path='/'
                exact
                component={Main} />
        </Aux>
    }
}

export default Routes;