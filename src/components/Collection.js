import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, UncontrolledCollapse } from 'reactstrap';

class Collection extends Component {
    state = {

    };

    arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    render() {
        console.log(this.props);

        // const characterEvents = (this.props.characters).map((character, index)=>{
        //     //in here we set up stuff to go intot he uncontrolled collapse for each one...this could be itneresting
        // })


        const charactersInCollection = (this.props.characters).map((character, index) => {
            console.log(character.image.data)
            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr = this.arrayBufferToBase64(character.image.data.data);


            return <Card key={index}>
            <CardHeader>{character.name}</CardHeader>
            <img src={base64Flag + imageStr} />

            <CardBody>
                <CardText>
                    {character.description || 'N/A'}
                </CardText>
                <Button id="toggler">EVENTS</Button>    
            </CardBody>
            <UncontrolledCollapse toggler="#toggler">
                <p>this is where we should have the names of the events, an image for the event, and a year, then a link to amazon.</p>
            </UncontrolledCollapse>
                   </Card>
        }) 
        return (
            <React.Fragment>
                <h1>This is your collection!</h1>
                <ul>
                    {charactersInCollection}
                </ul>
            </React.Fragment>
        )
    }

}

const mapStateToProps = (state) => ({
    characters: state.user.characters,
    books: state.user.books
})

export default connect(mapStateToProps)(Collection);