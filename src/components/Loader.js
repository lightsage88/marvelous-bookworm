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
            <div>
                <div className='sweet-loading'>
        <GridLoader
          css={override}
          sizeUnit={"px"}
          size={150}
          color={'#123abc'}
          loading={props.loading}
        />
        <p>{props.loadingMessage}</p>
      </div> 
            </div>
        )
    }


export default Loader;