import React, {Component} from 'react';
import {Route, Link } from 'react-router-dom';
import Index from './components/index';
import Aux from './components/hoc/Aux';
import IndivisualPost from './components/indivisualPost/indivisualPost';
import Main from './components/main/main';


class Routes extends Component{
    render(){
        return <Aux>
            <Route path='/post'
                exact
                component={IndivisualPost} />
            <Route path='/'
                exact
                component={Main} />
        </Aux>
    }
}

export default Routes;