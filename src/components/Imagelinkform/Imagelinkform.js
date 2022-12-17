import React from 'react';
import './Imagelinkform.css'

const Imagelinkform= ({ onInputChange, onButtonClick }) => {
	return (
		<div>
			<p className='f3 b'>
				{'This Magic guy would detect faces in your Image. Give him a try!'}
			</p> 
			<div className='center imageLinkForm'>
			    <div className='form center pa4 br3 shadow-5'>
				    <input 
				        className='pa2 f4 w-70 center'
				        type='text'
				        placeholder = 'ENTER IMAGE URL HERE'
			            onChange={onInputChange}
				    />
				    <button 
				        className='w-50 grow ph3 f4 bg-light-purple link  dib white' 
				        onClick={onButtonClick}
			        >Detect </button>
			    </div>
			</div>
		</div>  
		);
}

export default Imagelinkform;