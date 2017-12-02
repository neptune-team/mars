import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Label, Tooltip, Legend } from 'recharts';

class Graph extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      status: 'primaryOnly',
      focus: 'monthly',
      cleanData: this.props.graphData,
      
    };
  }

  changeDataShownFn (e) {
    this.setState({focus: e.target.id});
  }


  

  render() {
    //////////
 
      // console.log('YOU ARE SORTING THROUGH THIS!!!! ', data);
      // return data;

      // var answer = [];
      // for (var i = 0; i < 5; i++) {
      //   answer.push(data[i]);
      // }
      // return answer;

      // var answer = [];
      // for (var i = 0; i < data.length+1; i++) {
      //   answer.push(data[i]);
      // }
      // return answer;

    //  var makeTimeFocusedData = function(countWeeks, data) {
   
    //   var answer = [];
    //   var tempPeriod = [];
    //   var tempPeriodFormatted = {};
    //   var tempTotal = 0;
    //   var averageTemp = 0;
    //   var counter = 0;

    //   console.log('YOU ARE SORTING THROUGH THIS!!!! ', data);
   
    //   if(data.length === undefined) {return data}

    //   for (var i = 0; i < data.length+1; i ++) {
    //     // if (data[i].secondaryTrendVolume){
    //     //   console.log('FOUND!');
    //     // }
    //     if (counter === countWeeks ) {
    //       tempPeriodFormatted.primaryTrendVolume = tempTotal/countWeeks;
    //       tempPeriodFormatted.date = tempPeriod[0].date;
    //       answer.push(tempPeriodFormatted);
    //       tempPeriodFormatted = {};
    //       tempPeriod = [];
    //       tempTotal = 0;
    //       counter = 0;
    //     } else {
    //       if (!data[i]){
    //         continue;
    //       }
    //       tempPeriod.push(presentationData[i]);
    //       tempTotal += data[i].primaryTrendVolume;
    //       counter +=1;
    //     }
    //   }
    //   return answer;
    // };


    //CREATE 2 CLEAN DATASETS

    var dataCleanerMovie1 = function(data) {
      var cleanArray = [];
      for (var i = 0; i < data.length ; i++) {
        if (data[i] && data[i].primaryTrendVolume !== undefined) {
          var temp = {}
          temp.date = data[i].date
          temp.primaryTrendVolume = data[i].primaryTrendVolume
          cleanArray.push(temp);
        }
      }
      return cleanArray;
    }

    var dataCleanerMovie2 = function(data) {
      var cleanArray = [];
      for (var i = 0; i < data.length ; i++) {
        if (data[i] && data[i].secondaryTrendVolume !== undefined) {
          var temp = {}
          temp.date = data[i].date
          temp.secondaryTrendVolume = data[i].secondaryTrendVolume
          cleanArray.push(temp);
        }
      }
      return cleanArray;
    }

    console.log('GRAPH DATA BEING CLEANED 1 2 = ', this.props.graphData)
    var Movie1CleanData = dataCleanerMovie1(this.props.graphData);
    console.log('CLEAN MOVIE 1 DATA = ', Movie1CleanData);
    var Movie2CleanData = dataCleanerMovie2(this.props.graphData);
    console.log('CLEAN MOVIE 2 DATA = ', Movie2CleanData);





    //TEST
    //var usedTempData = [];
    //console.log('HERE!!!! USEDTEMPDATA = ', usedTempData)
    //console.log('1233456789', this.props.graphData)
    var zipperInMovies = function (movie1Data, movie2Data) {
      // if (data.length > 1) {
      //   usedTempData = data.slice(0, 52);
      //   //console.log('HERE!!!! USEDTEMPDATA 1 MOVE = ', usedTempData)
      //   return data.slice(0, 52);
      // }
      // if (data.length > 52) {
      //   usedTempData = data.slice(53, 104);
      //   //console.log('HERE!!!! USEDTEMPDATA 2 MOVIES = ', usedTempData)
      //   return data.slice(54, 104);
      // }


      if (movie2Data.length < 1) { return movie1Data }
      if(movie1Data.length > 1 && movie2Data.length > 1) {
        var cleanCombinedMovieData = [];
        var temp = {};
        for (var i = 0; i < 52; i ++) {
          temp.date = movie1Data[i].date;
          temp.primaryTrendVolume = movie1Data[i].primaryTrendVolume;
          temp.secondaryTrendVolume = movie2Data[i].secondaryTrendVolume;
          cleanCombinedMovieData.push(temp);
          temp = {};
        }
        return cleanCombinedMovieData;
      }


      return movie1Data;
    }

    
    var sortedBetweenMoveiesData = [...zipperInMovies(Movie1CleanData, Movie2CleanData)];
    console.log('COMBINED CLEAN DATA PERFECT!!! = ', sortedBetweenMoveiesData);

    var context = this;
    var makeTimeFocusedData = function(countWeeks, data) {
      //console.log('AAAAAA123 = ', data);
      var answer = [];
  var tempPeriod = [];
  var tempPeriodFormatted = {};
  var tempTotal = 0;
  var tempTotal2 = 0;
  var tempSecond = 0;
  var tempTotalSecond = 0;
  var averageTemp = 0;
  var counter = 0;
  var periodCounter = 1;
      
      if(data.length === undefined) {return data}
      if (data[0] && data[0].secondaryTrendVolume === undefined) {
        for (var i = 0; i < data.length; i ++) {
            tempPeriod.push(data[i]);
            tempTotal += data[i].primaryTrendVolume;
            counter +=1;
            //console.log(counter);
            
          if (counter === countWeeks ) {
            if(context.state.focus === 'monthly' && periodCounter === 13) {
              break;
            }
            tempPeriodFormatted.primaryTrendVolume = tempTotal/countWeeks;
            tempPeriodFormatted.date = periodCounter;
            //tempPeriodFormatted.date = tempPeriod[0].date;
            answer.push(tempPeriodFormatted);
            tempPeriodFormatted = {};
            tempPeriod = [];
            tempTotal = 0;
            counter = 0;
            periodCounter +=1;
          }
        }
        //console.log('AVERAGES PART 1 RAN OF SORTER= ', answer)
        return answer;
      }

      ///HERE!!!
        if (data[0] && data[0].hasOwnProperty("secondaryTrendVolume")) {
    for (var i = 0; i < data.length; i ++) {
        tempPeriod.push(data[i]);
        tempTotal += data[i].primaryTrendVolume;
        tempTotal2 += data[i].secondaryTrendVolume;
        counter +=1;
        //console.log(counter);
        
      if (counter === countWeeks ) {
        // if(context.state.focus === 'monthly' && periodCounter === 13) {
        //   break;
        // }
        tempPeriodFormatted.primaryTrendVolume = tempTotal/countWeeks;
        tempPeriodFormatted.secondaryTrendVolume = tempTotal2/countWeeks;
        tempPeriodFormatted.date = periodCounter;
        //tempPeriodFormatted.date = tempPeriod[0].date;
        answer.push(tempPeriodFormatted);
        tempPeriodFormatted = {};
        tempPeriod = [];
        tempTotal = 0;
        counter = 0;
        periodCounter +=1;
      }
    }
    //console.log('AVERAGES PART 1 RAN OF SORTER= ', answer)
    return answer;
  }
      return data;
    };

    
    var presentationData = sortedBetweenMoveiesData;
    if(this.state.focus === 'weekly') {
      presentationData = makeTimeFocusedData(1, sortedBetweenMoveiesData);
    }
    if(this.state.focus === 'monthly') {
      presentationData = makeTimeFocusedData(4, sortedBetweenMoveiesData);
    }
    if(this.state.focus === 'quarterly') {
      presentationData = makeTimeFocusedData(12, sortedBetweenMoveiesData);
      //console.log('DATA YOU ARE USING = ', presentationData);
    }
    // this.props.graphData[0] ? console.log('GRAPHDATA SAMPLE 1234 = ', this.props.graphData[0]): console.log('not there')
    // this.props.primaryMovie.releaseDate ? console.log('RELEASE & TRENDDATA SAMPLE 1234 = ', this.props.primaryMovie.releaseDate, this.props.primaryMovie.trendData[0]): console.log('not there')
    

    
    if(this.state.status === "primaryOnly") {
      
      return (
        <div id="graph">
        {/*this.props.graphData[0] ? console.log('GRAPHDATA SAMPLE 456 = ', this.props.graphData[0]): console.log('not there')*/}
        {/*this.props.primaryMovie.releaseDate ? console.log('RELEASE & TREND DATA SAMPLE 1234 = ', this.props.primaryMovie.releaseDate, this.props.primaryMovie.trendData[0]): console.log('not there')*/}
        {/*console.log('PRESENTATION DATA USED IN RENDER FUNCTION = ', presentationData)*/} 
          <LineChart width={900} height={400} data={presentationData}>
            <XAxis dataKey="date"/>
            <YAxis/>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
            <Line name={this.props.primaryMovie.title || ''} type="monotone" dataKey="primaryTrendVolume" stroke="#8884d8" />
            <Line name={this.props.secondaryMovie.title || ''} type="monotone" dataKey="secondaryTrendVolume" stroke="#82ca9d" />
            <Tooltip />
            <Legend verticalAlign="top" />
          </LineChart>
          <div>
            <button id="weekly" onClick={this.changeDataShownFn.bind(this)}>Weekly</button>
            <button id="monthly" onClick={this.changeDataShownFn.bind(this)}>Monthly</button>
            <button id="quarterly" onClick={this.changeDataShownFn.bind(this)}>Quarterly</button>
          </div>
          <div>
            <button>NEXT CHART LEFT</button>
            <button>NEXT CHART RIGHT</button>
          </div>
         {/* <LineChart width={1000} height={400} data={props.graphData}>
            <Line name={props.primaryMovie.title || ' '} type="monotone" dataKey="primaryTrendVolume" stroke="#8884d8" />
            <Line name={props.secondaryMovie.title || ' '} type="monotone" dataKey="secondaryTrendVolume" stroke="#FF0000" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date">
              <Label value="Date" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis label={{ value: 'Relative Search Volume', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend verticalAlign="top" />
          </LineChart>*/}
          {this.props.graphData && this.props.primaryMovie.title? <div>{this.props.primaryMovie.title} Release Date: {this.props.primaryMovie.releaseDate}</div> : ''}
        </div>
      );
    } else {
      return (
        <div>
          <h1>Alternate Graph</h1>


        </div>
      );
    }
  }
}

Graph.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  primaryMovie: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  secondaryMovie: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

function mapStateToProps({ graphData }) {
  return { graphData };
}

export default connect(mapStateToProps)(Graph);
