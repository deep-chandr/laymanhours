import React, {Component} from 'react';
import TopPost from '../topPost/topPost';
import FeaturedPost from '../featuredPost/featuredPost';
import MasonaryContainer from '../utils/masonaryReactVirtualized/masonaryContainer';
import {inject, observer } from 'mobx-react';

class Main extends Component {
    render(){
        return (
            <div>
                <TopPost />
                <FeaturedPost />
                {/* <div style={{ 'width': '90%', 'margin': '0 auto' }}>
                    <MasonaryContainer />
                </div> */}
            </div>
        );
    }
}

export default inject()(observer(Main));