import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';



export const Landing = (props) => {
    console.log(props);
    return (
        <div>
            <h1>This is the landing</h1>
        </div>
    )
}

const mapStateToProps = (state) => ({
    username: state.user.username,
    loggedIn: state.user.loggedIn
})

export default connect(mapStateToProps)(Landing);