import React from 'react';
import ImageModule from './ImageModule';

import Step1 from '../../assets/images/howtoimages/Step1.png';
import Step2 from '../../assets/images/howtoimages/Step2.png';
import Step3 from '../../assets/images/howtoimages/Step3.png';

const HowToUse = () => {
    return (
        <div className="how-to-use-container">
            <h1 className='how-to-use-header'>How It <span className='gradient-text'>Works?</span></h1>
            <ImageModule 
                header = 'Explore Indices'
                image = {Step1}
            />
            <ImageModule 
                header = 'Connect Wallet'
                image = {Step2}
            />
            <ImageModule 
                header = 'Buy/Sell Indices'
                image = {Step3}
            />
        </div>
    );
};

export default HowToUse;


 

