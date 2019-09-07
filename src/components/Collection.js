import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Media, Card} from 'reactstrap';

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
        const charactersInCollection = (this.props.characters).map((character, index) => {
            console.log(character.image.data)
            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr = this.arrayBufferToBase64(character.image.data.data);


            return <Card key={index}>
            <img src={base64Flag + imageStr} />
                        {character.description || 'N/A'}
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