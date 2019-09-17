import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, UncontrolledCollapse, Modal, ModalHeader, ModalBody, ModalFooter  
} from 'reactstrap';
import ModalGear from './ModalGear';

import {deleteCharacterFromDB, refreshStateWithToken} from '../actions';

class Collection extends Component {
    state = {
        modal: false
    };

    toggle = () => {
       this.setState({
           modal: !this.state.modal
       })
    }

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
        console.log(this.state);
        
        // const eventModalGroup = (this.props.characters.events).forEach((event, index) => {
        //     return <ModalGear event={event} key={index}/>
        // })


        const charactersInCollection = (this.props.characters).map((character, index) => {
            const eventsWithDescriptionsAndPictures = (character.events).filter(event => {
                if(event.thumbnail) {
                    if(event.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
                        return event;
                    }
                } else {

                }
            });

            const eventModalGroup = eventsWithDescriptionsAndPictures.map((event, index) => {
                return <ModalGear event={event} key={index}/>
            })

            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr = this.arrayBufferToBase64(character.image.data.data);

            return <Card className="marvelCharacterCard" key={index}>
            <CardHeader className="marvelCharacterCardHeader">
                <h2 className="marvelCharacterCardName">{character.name}</h2>
                <Button className="marvelCharacterDeleteButton" onClick={(e)=>{this.deleteCharacterFromCollection(e, this.props.username, character.id)}} >X</Button>
            </CardHeader>
            <img className="marvelCharacterCardMainImage" src={base64Flag + imageStr} />

            <CardBody>
                <CardText>
                    { character.description ? <div>
                    <h3>BIO</h3>
                    <p>{character.description}</p>
                    </div> : ''}
                </CardText>
                <Button id={'toggler-' + index}>EVENTS</Button>    
            </CardBody>
            <UncontrolledCollapse toggler={'#' + 'toggler-' + index}>
                {eventModalGroup}
            </UncontrolledCollapse>
                   </Card>
        });


        return (
            <React.Fragment>
                <h1>This is your collection!</h1>
                <ul id="characterCollectionUL">
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