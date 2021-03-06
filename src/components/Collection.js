import React, {Component} from 'react';
import {connect} from 'react-redux';
import html2canvas from 'html2canvas';
import $ from 'jquery';
import {Redirect} from 'react-router-dom';





import { Card, Button, CardHeader, Collapse, CardFooter, CardBody,
    CardTitle, CardText, UncontrolledCollapse, Modal, ModalHeader, ModalBody, ModalFooter  
} from 'reactstrap';
import ModalGear from './ModalGear';

import {deleteCharacterFromDB, refreshStateWithToken} from '../actions';
require("jquery-ui/ui/effects/effect-slide");

let canvasCount = 3;
let imageDataArray = [];

        // Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

// Use Chance here.
// var  = chance.string();

class Collection extends Component {
    constructor(props){
    super(props)
   
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false, modal: false };
}


modalMagic = (index, close) => {
    close === 'false' ?
    this.setState(state=>({
        modal: {
            [index]: false
        }
    })
    )
    :

    this.setState(state=>({
        modal: {
            [index]: !state.modal.index
        }
    })
    )
    
   
}


// this.setState(state=>({collapse: {
//     [index]:!state.collapse.index
// } }))

    weightedRandomDistrib = (peak)  => {
        var prob = [], seq = [];
        for(let i=0;i<canvasCount;i++) {
          prob.push(Math.pow(canvasCount-Math.abs(peak-i),3));
          seq.push(i);
        }
        return chance.weighted(seq, prob);
      }

      
 
      

      newCanvasFromImageData = (imageDataArray ,w , h) => {
        var canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            let tempCtx = canvas.getContext("2d");
            tempCtx.putImageData(new ImageData(imageDataArray, w , h), 0, 0);
            
        return canvas; 
      }

      createBlankImageData = (imageData) => {
        for(let i=0;i<canvasCount;i++)
        {
          let arr = new Uint8ClampedArray(imageData.data);
          for (let j = 0; j < arr.length; j++) {
              arr[j] = 0;
          }
          imageDataArray.push(arr);
        }
      }

    

    toggle = (index) => {
        
       this.setState(state=>({collapse: {
           [index]:!state.collapse.index
       } }))
    }

    componentDidMount = () => {
        this.props.dispatch(refreshStateWithToken(localStorage.getItem('authToken')));

    }

  

    arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

   

    deleteCharacterFromCollection = (e, username, characterID, cardID, cardIndex) => {
        imageDataArray = [];

        e.preventDefault();

        html2canvas($('.marvelCharacterCard')[cardIndex]).then(canvas => {


            const animateBlur = (elem,radius,duration) => {
                var r =0;
                $({rad:0}).animate({rad:radius}, {
                    duration: duration,
                    easing: "easeOutQuad",
                    step: function(now) {
                      elem.css({
                            filter: 'blur(' + now + 'px)'
                        });
                    }
                });
              }

              const animateTransform =(elem,sx,sy,angle,duration) => {
                // var td = tx = ty = 0;
                var td, tx, ty =0;
        
                $({x: 0, y:0, deg:0}).animate({x: sx, y:sy, deg:angle}, {
                    duration: duration,
                    easing: "easeInQuad",
                    step: function(now, fx) {
                      if (fx.prop == "x") 
                        tx = now;
                      else if (fx.prop == "y") 
                        ty = now;
                      else if (fx.prop == "deg") 
                        td = now;
                      elem.css({
                            transform: 'rotate(' + td + 'deg)' + 'translate(' + tx + 'px,'+ ty +'px)'
                        });
                    }
                });
              }


            //capture all div data as image
            let ctx = canvas.getContext("2d");
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let pixelArr = imageData.data;
            this.createBlankImageData(imageData);
       

            //////Now we have the distributed pixels data. we’ll create canvases from them,and assign a class name. Then append them to the wrapper.
            for (let i = 0; i < pixelArr.length; i+=4) {
                //find the highest probability canvas the pixel should be in
                let p = Math.floor((i/pixelArr.length) *canvasCount);
                let a = imageDataArray[this.weightedRandomDistrib(p)];
                a[i] = pixelArr[i];
                a[i+1] = pixelArr[i+1];
                a[i+2] = pixelArr[i+2];
                a[i+3] = pixelArr[i+3]; 
              }
              //create canvas for each imageData and append to target element
              for (let i = 0; i < canvasCount; i++) {
                let c = this.newCanvasFromImageData(imageDataArray[i], canvas.width, canvas.height);
                c.classList.add("dust");
              
                $(".marvelCharacterCard")[cardIndex].append(c);

                

              }



            $(".dust").each( function(index){
              
                animateBlur($(this),0.8,800);
                setTimeout(() => {
                  animateTransform($(this),100,-100,chance.integer({ min: -15, max: 15 }),800+(110*index));
                }, 70*index); 
                //remove the canvas from DOM tree when faded
                $(this).delay(70*index).fadeOut((110*index)+800,"easeInQuint",()=> {$( this ).remove();});
              });
              this.props.dispatch(deleteCharacterFromDB(username, characterID));


    });
        //now we dispatch a thunk action that takes the character ID;
    }

    renderRedirect = () => {
        if(!localStorage.getItem('authToken')) {
            return <Redirect to="/" />
        }   
    }

    render() {
       

        const charactersInCollection = (this.props.characters).map((character, index) => {
            let cardID = `${character.name}-characterCard`;
            let cardIndex = index;
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

            return <Card className="marvelCharacterCard" key={index} id={cardID}>
            <CardHeader className="marvelCharacterCardHeader">
                <h2 className="marvelCharacterCardName">{character.name}</h2>
                <Button className="marvelCharacterDeleteButton" 
                onClick={(e)=>{this.deleteCharacterFromCollection(e, this.props.username, character.id, cardID, cardIndex )}}>
                X
                </Button>
            </CardHeader>
            <img className="marvelCharacterCardMainImage" src={base64Flag + imageStr} />

            <CardBody>
                <CardText>
                    { character.description ? <div>
                
                    {character.description}
                    </div> : ''}
                </CardText>
                    {character.events.length <= 0 ?
                    ''
                    :
                    <React.Fragment>
                    
                        <Button onClick={()=>{this.modalMagic(index)}}>Series</Button>
                        <Modal isOpen={this.state.modal[index]}>
                        <ModalHeader toggle={()=>{this.modalMagic(index, 'false')}}>Series featuring {character.name}</ModalHeader>
          <ModalBody>
          {eventModalGroup}
          </ModalBody>
          <ModalFooter></ModalFooter>
            
                        </Modal>
                        </React.Fragment>

                    }
            </CardBody>
                    {
                        character.events.length <= 0 ?
                    ''
                    :
                    <Collapse isOpen={this.state.collapse[index]}>
                {eventModalGroup}
            </Collapse>

                    }
           
                   </Card>
        });

       


        return (
            <div id="collectionDiv">
                {this.renderRedirect()}
                <h1 id="collectionH1">ASSEMBLE!!</h1>
                <ul id="characterCollectionUL">
                    {charactersInCollection}
                </ul>
                
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    username: state.user.username,
    characters: state.user.characters,
    books: state.user.books,
    authToken: state.user.authToken
})

export default connect(mapStateToProps)(Collection);