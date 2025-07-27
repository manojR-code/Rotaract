import React from 'react';
import '../Styles/WhatsNew.css'
function WhatsNew(props) {
    return (
        <>
            <div className="container">
                <div className="title"><h1>What's New</h1></div>
                <div className="UpcommingEvents">
                    <div className="blocks"></div>
                    <div className="blocks"></div>
                </div>
            </div>
        </>
    );
}

export default WhatsNew;