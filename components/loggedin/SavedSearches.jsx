import React from 'react';
import Chip from 'material-ui/Chip';
import { connect } from 'react-redux';
import Avatar from 'material-ui/Avatar';

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import TableComponent from '../TableComponent.jsx';
import { bindActionCreators } from 'redux';
import { fetchSavedMovies } from '../../actions/MovieAction';
import { fetchMovie1, fetchMovie2 } from '../../actions/MovieAction';

var styles ={
	color: 'red',
	chip: {
		margin: 4,
		padding: 20,
		fontSize: 20
	}
}
//probably need to make this into a class later and add the above functions
//if have time, make it so that when user clicks on picture it just searches for that.
class SavedSearches extends React.Component {
	constructor() {
		super();
		this.imgUrl = 'https://image.tmdb.org/t/p/w92';
	}

	componentWillMount() {
		this.props.fetchSavedMovies(this.props.username);
	}

	subComponent() {
		
		if (this.props.savedMovies.length > 0) {
			return (
				<TableComponent username={this.props.username} savedMovies={this.props.savedMovies}/>
			)
		} else {
			return (
				<div>
					<div style={{width: '50%', position: 'relative', left:'25%', backgroungColor:'blue', margin: '30px'}}>
						<img style={{width: '30%'}} src="emptypage.png"/>
					</div>
				</div>
			)
		}

	}
  render() {
  	return (
	 	<div id='savedMoviesWarpper'>
	    <div style={{textAlign: 'center'}}>
	    	{this.subComponent()}
	    </div>
	  </div>  	
  	)
  }
};


function mapStateToProps({ savedMovies, username }) {
  return { savedMovies, username };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSavedMovies}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedSearches);







