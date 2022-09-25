import React from 'react';
import {
    IoMailOutline,
    IoLogoTwitter,
} from 'react-icons/io5';

const LandingFooter = () => {
    return (
        <footer className='landing-footer-container'>
            <p className='connect-header'>Connect with us:</p>
            <div className='connect-wrapper'>
                <a href='mailto:team@invex.dev' className='connect-link'> 
                    <svg width="0" height="0">
                        <linearGradient id="gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                            <stop stopColor="#8F0CAF" offset="0%" />
                            <stop stopColor="#5AFFFF" offset="100%" />
                        </linearGradient>
                    </svg>
                    <IoMailOutline className='mail-icon ' style={{ stroke: "url(#gradient)" }} /> team@invex.dev
                </a>
                <a href='https://twitter.com/invex.dev' className='connect-link'><IoLogoTwitter className='twitter-icon'/> @invex.dev</a>
            </div>
        </footer>
    );
};

export default LandingFooter;
