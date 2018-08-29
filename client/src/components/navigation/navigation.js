import React from 'react'; 
import classes from './navigation.css';

const navigation = (props) => {
    return (
        <div className={classes.makeCenter}>
            <div>
                <h1 style={{'text-align': 'center'}}>Layman Hours</h1>
                <ul className={classes.basicList} style={{}}>
                    <li>Home</li>
                    <li>A History Of Layman Hours - All Post</li>
                    <li>About Us</li>
                    <li>Contact Page</li>
                    <li>Privacy Policy</li>
                    <li>Media</li>
                </ul>
            </div>
            
        </div>
    )
}

export default navigation;