import React from 'react';
import { Image } from 'react-bootstrap';

const ImageModule = (props) => {
    return (
        <div className="image-module-container">
            <h2 className='header'>{props.header}</h2>
            <Image className='image' src={props.image} />
        </div>
    );
};

export default ImageModule;