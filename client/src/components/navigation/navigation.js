import React, {Component} from 'react'; 
import classes from './navigation.css';
import Aux from '../hoc/Aux';

import imgtitle from '../2.jpg';
import Link from 'react-router-dom/Link';


import { Flip } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

class Navigation extends Component{
    w3_open() {
        
        this.mainContent.current.style.marginLeft = "20%";
        this.mainContent.current.classList.add("w3-animate-left");
        this.mainContent.current.classList.remove("w3-animate-right");
        this.mySidebar.current.style.width = "20%";
        this.mySidebar.current.style.display = "block";
        this.openNav.current.style.display = 'none';
    }
    w3_close() {
        this.mainContent.current.style.marginLeft = "0%";
        this.mainContent.current.classList.remove("w3-animate-left");
        this.mainContent.current.classList.add("w3-animate-right");
        this.mySidebar.current.style.display = "none";
        this.openNav.current.style.display = "inline-block";
    }

    constructor(props) {
        super(props)

        this.mySidebar = React.createRef();
        this.mainContent = React.createRef();
        this.openNav = React.createRef();

        this.w3_open = this.w3_open.bind(this);
        this.w3_close = this.w3_close.bind(this);

        this.state = {
            navItems : []
        }
    }
    componentDidMount(){
        this.setState({
            navItems:[
                {'name': 'Sign In', 'route' : '/signin'},
                {'name': 'Profile', 'route' : '/profile'},
                {'name': 'home', 'route' : '/'}, 
                {'name': 'A History Of Layman Hours-All Post', 'route' : '/post'}, 
                {'name': 'About Us', 'route' : '/'}, 
                {'name': 'Contact Page', 'route' : '/'}, 
                {'name': 'Privacy Policy', 'route' : '/'}, 
                {'name': 'Media', 'route' : '/'}, 
                {'name': 'Add New Post', 'route' : '/addnewpost'}
            ]
        })
    }

    render(){
        return(
            <Aux>
                {/* for rendering notifications */}
                <ToastContainer 
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable={false}
                    pauseOnHover
                    transition={Flip}
                />
                
                {/* this part belongs to rendering the navigation contents on all routes */}
                <div className="w3-sidebar w3-bar-block w3-card w3-animate-left" 
                style={{'display': 'none'}} 
                // id="mySidebar"
                ref={this.mySidebar}
                >
                    
                    <div style={{'height': '100%'}}>
                        <button className="w3-bar-item w3-button w3-large"
                        onClick={this.w3_close} style={{'text-align': 'center'}}>Close &times;</button>
                        <div className={classes.makeCenter}>
                            <div>
                                <h1 style={{'text-align': 'center'}}>Layman Hours</h1>
                                <ul className={classes.basicList}>
                                    {this.state.navItems.map(val => {
                                        return <Link to={val.route}><li>{val.name}</li></Link>
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <div 
                // id="mainContent"
                    ref={this.mainContent}
                >
                    <div>
                        <div>
                            <div style={{"position": 'absolute', 'z-index': '-100'}}>
                                <img alt='' src={imgtitle} style={{'object-fit': 'cover', 'height': '100px', 'width': '100%'}} />
                            </div>

                            <div style={{  'height': '100px', 
                                    'color': 'white', 
                                    'position': 'relative'
                                }}>
                                <button 
                                // id="openNav" 
                                ref={this.openNav}
                                className="w3-button w3-teal w3-xlarge" 
                                onClick={this.w3_open}
                                style={{ 'position': 'absolute', 'bottom': '0', 'left': '50px'}}>&#9776;</button>

                                <h1 style={{ 'font-size': '60px',
                                    'position': 'absolute', 
                                    'bottom': '0', 
                                    'right': '50px' 
                                }}>Layman Hours</h1>
                            </div>
                        </div>
                        
                    </div>

                    <div className="w3-container" style={{'height': '100%','min-height': '95vh','background-color': 'rgb(250, 250, 250)', 'margin': '0', 'padding': '0' }}>
                        {this.props.children}
                    </div>
                </div>
            </Aux>
        )
    }
}

export default Navigation;