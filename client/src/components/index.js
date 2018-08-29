import React, { Component } from 'react';
import TopPost from './topPost/topPost';
import FeaturedPost from './featuredPost/featuredPost';
import Title from './title/title';
import Navigation from './navigation/navigation';
import Routes from '../routes';



class index extends Component{

    render(){
        return <div>
            <Navigation>
                    <Routes />
            </Navigation>
        </div>
    }
}

export default index;