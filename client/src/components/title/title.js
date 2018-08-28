import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import imgtitle from './2.jpg';

class title extends Component{
    render(){
        return <div>
            <div style={{"position": 'absolute', 'z-index': '-100'}}>
                <img src={imgtitle} style={{'object-fit': 'cover', 'height': '100px', 'width': '100%'}} />
            </div>
            <div style={{  'height': '100px', 
                    'color': 'white', 
                    'position': 'relative'
                }}>
                <h1 style={{ 'font-size': '60px',
                    'position': 'absolute', 
                    'bottom': '0', 
                    'right': '50px' 
                }}>Layman Hours</h1>
            </div>
        </div>
    }
}

export default title;