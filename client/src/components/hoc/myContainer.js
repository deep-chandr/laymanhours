import React  from 'react';
import Aux from './Aux';
import MediaQuery from 'react-responsive';
 
const MyContainer = (props) => {

    return (<Aux>
        <MediaQuery minWidth={1224}>
            <div  style={{ 'margin': '0 15%' }}>{props.children}</div>
        </MediaQuery>
        <MediaQuery maxWidth={1224}>
            <div  style={{ 'margin': '0 1%' }}>{props.children}</div>
        </MediaQuery>
        
    </Aux>)
}
export default MyContainer;