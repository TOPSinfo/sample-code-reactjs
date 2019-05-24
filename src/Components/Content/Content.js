import React from 'react';

import './Content.css';

const content = (props) => {
	return (
		<div className="Content">
			<p onClick={props.click}>This is {props.name} and is number is {props.number}</p>
			<p>{props.children}</p>
			<input type="text" value={props.name} onChange={props.change}/>
		</div>
	);
};

export default content;