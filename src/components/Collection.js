import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, UncontrolledCollapse } from 'reactstrap';
import {deleteCharacterFromDB, refreshStateWithToken} from '../actions';

class Collection extends Component {
    state = {

    };

    

    componentDidMount = () => {
        console.log('sdfsdfsdfsdf');
        this.props.dispatch(refreshStateWithToken(localStorage.getItem('authToken')));

    }

  

    arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    characterEvents = (data) => {
        console.log(data.name);
        console.log(data.events);
    }

    deleteCharacterFromCollection = (e, username, characterID) => {
        e.preventDefault();
        console.log('we are deleting ' + characterID);
        console.log(e.target);
        //now we dispatch a thunk action that takes the character ID;
        this.props.dispatch(deleteCharacterFromDB(username, characterID));
    }

    render() {
        console.log(this.props);
        


        const charactersInCollection = (this.props.characters).map((character, index) => {
            console.log(character.image.data)
            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr = this.arrayBufferToBase64(character.image.data.data);
            let characterEvents = (character.events).map((event, index) => {

                let eventImageAddress = event.thumbnail !== null ? `${event.thumbnail.path}.${event.thumbnail.extension}` : '';


                return <div className="eventBox" key={index} style={{
                    background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
                    url(${eventImageAddress}) no-repeat`
                    }}>
                    <h3>{event.title || "N/A"}</h3>
                    <p>{event.description}</p>
                </div>
            })

            return <Card key={index}>
            <CardHeader>
                {character.name}
                <Button onClick={(e)=>{this.deleteCharacterFromCollection(e, this.props.username, character.id)}} >X</Button>
            </CardHeader>
            <img src={base64Flag + imageStr} />

            <CardBody>
                <CardText>
                    {character.description || 'N/A'}
                </CardText>
                <Button id={'toggler-' + index}>EVENTS</Button>    
            </CardBody>
            <UncontrolledCollapse toggler={'#' + 'toggler-' + index}>
                {characterEvents}
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
    username: state.user.username,
    characters: state.user.characters,
    books: state.user.books
})

export default connect(mapStateToProps)(Collection);