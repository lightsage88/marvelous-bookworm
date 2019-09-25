import React from 'react';
import spideyLogo from '../../src/assets/pictures/spideyLogo.png';
const About = () => {
    return (
        <div id="aboutDiv">
            <h2 id="aboutDivH2" >About</h2>
            <section id="aboutSection">
                <h4>Wherefore, whence...bookworm?</h4>
                <p>Marvelous Bookworm is an application built to help fans of Marvel Comics 
                discover series and events that their favorite characters from the company are involved with.
                Comic book characters frequently have spin-off series or collections of stories that focus on a particular
                version of that character. 
                <br/><br/>
                <img id="aboutPic" src={spideyLogo} alt=''/>

                Some of them take place on parallel worlds or universes and are short. Others go on for quite a while.
                If you have even a passing interest in the many characters who have donned
                the mantle of Spider-Man or Captain America, for example, you'll enjoy how easily this app can make you aware of how to 
                read more comic books of that particular character.</p>
            </section>
            
            <p>

            </p>
        </div>
    )
}

export default About

