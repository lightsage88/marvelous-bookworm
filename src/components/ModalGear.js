
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

import React from 'react';
import {connect} from 'react-redux';
import {Modal, ModalHeader, ModalBody, Button, ModalFooter} from 'reactstrap';

class ModalGear extends React.Component {
    state={
        modal:false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    render(){

              
        
        return (
            <div>
             <Button  id={this.props.key} color="danger" onClick={()=>{this.toggle()}}>{this.props.event.title}</Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>{this.props.event.title}</ModalHeader>
                            <ModalBody>
                                {this.props.event.description}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                            <ModalBody>
                                <img src={`${this.props.event.thumbnail.path}.${this.props.event.thumbnail.extension}`} alt=""/>
                            </ModalBody>
                        </Modal>
            </div>
        )
    }
}

export default ModalGear;