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

            // let characterEventModalButton = (character.events).map((event, index) => {
            //   return  <div key={index}>
            //   <Button  id={index} color="danger" onClick={()=>{this.toggle(index)}}>{event.title}</Button>
            //             <Modal id={index + `-modal`} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            //                 <ModalHeader toggle={this.toggle}>{event.title}</ModalHeader>
            //                 <ModalBody>
            //                     {event.description}
            //                 </ModalBody>
            //                 <ModalFooter>
            //                     <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            //                     <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            //                 </ModalFooter>
            //                 <ModalBody>
            //                     <img src={`${event.thumbnail.path}.${event.thumbnail.extension}`} alt=""/>
            //                 </ModalBody>
            //             </Modal>
            //             </div>
            // });
                            // let characterEvents = (character.events).map((event, index) => {

                            //     let eventImageAddress = event.thumbnail !== null ? `${event.thumbnail.path}.${event.thumbnail.extension}` : '';


                            //     return <div className="eventBox" key={index} style={{
                            //         background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
                            //         url(${eventImageAddress}) no-repeat`
                            //         }}>
                            //         <h3>{event.title || "N/A"}</h3>
                            //         <p>{event.description}</p>
                            //     </div>
                            // })



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
                {eventModalGroup}
            </UncontrolledCollapse>
                   </Card>
        });


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