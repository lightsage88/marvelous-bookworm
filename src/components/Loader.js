import React from 'react';
import {css} from '@emotion/core';
import {GridLoader} from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

function Loader(props) {
    
        return (
            <div id="loaderDiv">
                <div className='sweet-loading'>
        <GridLoader
          css={override}
          sizeUnit={"px"}
          size={20}
          color={'#123abc'}
          loading={props.loading}
          position={"fixed"}
        />
        <p id="loaderMessage">{props.loadingMessage}</p>
      </div> 
            </div>
        )
    }


export default Loader;