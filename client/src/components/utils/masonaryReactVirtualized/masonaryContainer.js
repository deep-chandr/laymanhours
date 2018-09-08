import React, {Component} from 'react';
import Dimensions from 'react-dimensions'
import  { customFunction } from './masonaryReactVirtualized'

class masonaryContainer extends Component{
    render(){
        return (
            <div>
                {customFunction(this.props.containerWidth)}
            </div>
        );
    }
}

export default Dimensions()(masonaryContainer);