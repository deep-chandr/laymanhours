import React, { Component } from 'react';
import Navigation from './navigation/navigation';
import Routes from './routes';

class index extends Component{

    render(){
        return <Navigation>
            <Routes />
        </Navigation>
    }
}

export default index;