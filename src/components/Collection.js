import React, {Component} from 'react';
import {connect} from 'react-redux';
import html2canvas from 'html2canvas';
import $ from 'jquery';





import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText, UncontrolledCollapse, Modal, ModalHeader, ModalBody, ModalFooter  
} from 'reactstrap';
import ModalGear from './ModalGear';

import {deleteCharacterFromDB, refreshStateWithToken} from '../actions';
require("jquery-ui/ui/effects/effect-slide");

let canvasCount = 35;
let imageDataArray = [];

        // Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

// Use Chance here.
// var  = chance.string();

class Collection extends Component {
    state = {
        modal: false
    };



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

    deleteCharacterFromCollection = (e, username, characterID, cardID, cardIndex) => {
        imageDataArray = [];

        e.preventDefault();
        console.log('we are deleting ' + characterID);
        console.log(cardID);

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
                // $(".wrapper").append(c);
                        //MAY NEED TO APPEND TO CARDID Variable???
                // $(".marvelCharacterCard").prepend(c);
                $(".marvelCharacterCard")[cardIndex].append(c);

                

              }

            //clear all children except the canvas == Will e.target.children work??? we'll see!
            // console.log(document.getElementById(cardID));
            // document.getElementById('characterCollectionUL').children.not(".dust").fadeOut(3500);
            // $('#characterCollectionUL').children().not(".dust").fadeOut(3500);

            // $('.marvelCharacterCard').children().not(".dust").fadeOut(3500);


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


    render() {
        console.log(this.props);
        console.log(this.state);
        
       

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
                <Button className="marvelCharacterDeleteButton" onClick={(e)=>{this.deleteCharacterFromCollection(e, this.props.username, character.id, cardID, cardIndex )}} >X</Button>
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