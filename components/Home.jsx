import React from 'react';
import SearchBox from '../containers/SearchBox';
import MovieDetail from '../containers/MovieDetail';
import Financials from '../containers/Financials';

//home has access to the logged boolean
function Home(props) {
  return (
    <div>
    	 {!props.logged && 
        <div id="welcome"><i>Welcome to MovieDB, to get access to more advance features please log in or sign up.</i></div>
        }
      <SearchBox />
      <MovieDetail />
    </div>
  );
}

export default Home;