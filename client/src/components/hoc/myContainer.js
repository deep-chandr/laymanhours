import React  from 'react';

const MyContainer = (props) => {

    return (<div style={{ 'margin': '0 15%' }}>
        {props.children}
    </div>)
}
export default MyContainer;