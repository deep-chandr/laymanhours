import React  from 'react';

const MyContainer = (props) => {

    return (<div style={{ 'margin': '0 10%' }}>
        {props.children}
    </div>)
}
export default MyContainer;