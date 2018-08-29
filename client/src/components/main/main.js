import React, {Component} from 'react';
import Aux from '../hoc/Aux';
import TopPost from '../topPost/topPost';
import FeaturedPost from '../featuredPost/featuredPost';

class Main extends Component {
    render(){
        return (
            <div>
                <TopPost />
                <FeaturedPost />
            </div>
        );
    }
}
export default Main;