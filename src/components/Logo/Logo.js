import React from 'react';
import './Logo.css';
import Tilt from 'react-parallax-tilt';
import face from './face.png'

const Logo = () => {
	return (
		    <div className='ma4 mt0'>
		    	<Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 130, width: 130 }} >
				    <div className="Tilt-inner">
					    <img style={{width:120, height:120, paddingTop:'5px'}} alt='logo' src={face}/>
				    </div>
				</Tilt>
		    </div>
		)
};

export default Logo;