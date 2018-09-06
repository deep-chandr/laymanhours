import React, {Component} from 'react';
import classes from './socialMediaLinks.css';
import { SocialIcon } from 'react-social-icons';

class socialMediaLinks extends Component{
    render(){
        return <div style={{ 'text-align': 'center', 'margin': '15px 0'}}>
            {
                this.props.details.socialmedialinks.map((val, id) => {
                    return <span style={{ 'padding': '5px' }}> 
                        <SocialIcon 
                            url={val.link}
                            style={{ height: 30, width: 30 }} />
                        </span>
                })
            }
        </div>

    }
}

export default socialMediaLinks;