import React from 'react';
import GraphOptionsComp from '../GraphOptionsComp.jsx';
import UpdateSettingsComp from '../UpdateSettingsComp';

class Settings extends React.Component {

	constructor() {
		super();
	}

	render () {
		return (
		<div id='Settings'>
		  	<i class="material-icons md-48">settings</i>
		    <UpdateSettingsComp />
		    <GraphOptionsComp />
		</div>
		)
	}
};

const styles = {
	chip: {
	    margin: 4
	}
};



export default Settings;