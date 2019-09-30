import React from 'react';
import {connect} from 'react-redux'
import styled from 'styled-components';



export const Landing = (props) => {
    return (
        <div id="landingDiv">
            <h1 id="landingH1">Welcome!!</h1>
            <section id="landingDivSection">
                <p>
                    You've found your way to Marvelous Bookworm, a web app to help you learn more about your favorite Marvel Characters. For more information, visit the 'About' page.
                </p>
            </section>
        </div>
    )
}

const mapStateToProps = (state) => ({
    username: state.user.username,
    loggedIn: state.user.loggedIn
})

export default connect(mapStateToProps)(Landing);