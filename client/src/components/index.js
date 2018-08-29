import React, { Component } from 'react';
import TopPost from './topPost/topPost';
import FeaturedPost from './featuredPost/featuredPost';
import Title from './title/title';
import Navigation from './navigation/navigation';
import imgtitle from './2.jpg';



class index extends Component{
    constructor(props) {
        super(props)

        this.mySidebar = React.createRef();
        this.mainContent = React.createRef();
        this.openNav = React.createRef();

        this.w3_open = this.w3_open.bind(this);
        this.w3_close = this.w3_close.bind(this);

        this.state = {}
    }
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
    render(){
        return <div>
            <div className="w3-sidebar w3-bar-block w3-card w3-animate-left" 
            style={{'display': 'none'}} 
            // id="mySidebar"
            ref={this.mySidebar}
            >
                
                <div style={{'height': '100%'}}>
                    <button className="w3-bar-item w3-button w3-large"
                    onClick={this.w3_close} style={{'text-align': 'center'}}>Close &times;</button>
                    <Navigation />
                </div>
            </div>


            <div 
            // id="mainContent"
                ref={this.mainContent}
            >
                <div>
                    <div>
                        <div style={{"position": 'absolute', 'z-index': '-100'}}>
                            <img src={imgtitle} style={{'object-fit': 'cover', 'height': '100px', 'width': '100%'}} />
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

                <div className="w3-container">
                    {/* <Title /> */}
                    <TopPost />
                    <FeaturedPost />
                </div>
            </div>
            
        </div>
    }
}

export default index;