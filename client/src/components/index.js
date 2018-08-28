import React, { Component } from 'react';
import TopPost from './topPost/topPost';
import FeaturedPost from './featuredPost/featuredPost';
import Title from './title/title';

class index extends Component{
    render(){
        return <div>
            <Title />
            <TopPost />
            <FeaturedPost />

        </div>
    }
}

export default index;