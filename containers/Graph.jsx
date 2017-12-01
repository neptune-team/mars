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
      weeklyData: this.props.graphData.slice(0, 12),
      monthlyData: this.props.graphData.slice(0, 12),
      quarterlyData: this.props.graphData.slice(0, 4),
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

    var makeTimeFocusedData = function(countWeeks, data) {
   
      var answer = [];
      var tempPeriod = [];
      var tempPeriodFormatted = {};
      var tempTotal = 0;
      var averageTemp = 0;
      var counter = 0;
      
      if(data.length === undefined) {return data}
      for (var i = 0; i < data.length; i ++) {
          tempPeriod.push(presentationData[i]);
          tempTotal += data[i].primaryTrendVolume;
          counter +=1;
          //console.log(counter);
          
        if (counter === countWeeks ) {
          tempPeriodFormatted.primaryTrendVolume = tempTotal/countWeeks;
          tempPeriodFormatted.date = tempPeriod[0].date;
          answer.push(tempPeriodFormatted);
          tempPeriodFormatted = {};
          tempPeriod = [];
          tempTotal = 0;
          counter = 0;
        }
      }
      console.log('AVERAGES = ', answer)
      return answer;
    };

    
    var presentationData = [...this.props.graphData];
    if(this.state.focus === 'weekly') {
      presentationData = makeTimeFocusedData(1, this.props.graphData);
    }
    if(this.state.focus === 'monthly') {
      presentationData = makeTimeFocusedData(4, this.props.graphData);
    }
    if(this.state.focus === 'quarterly') {
      presentationData = makeTimeFocusedData(12, this.props.graphData);
      console.log('DATA YOU ARE USING = ', presentationData);
    }
    // this.props.graphData[0] ? console.log('GRAPHDATA SAMPLE 1234 = ', this.props.graphData[0]): console.log('not there')
    // this.props.primaryMovie.releaseDate ? console.log('RELEASE & TRENDDATA SAMPLE 1234 = ', this.props.primaryMovie.releaseDate, this.props.primaryMovie.trendData[0]): console.log('not there')
    

    
    if(this.state.status === "primaryOnly") {
      
      return (
        <div id="graph">
        {this.props.graphData[0] ? console.log('GRAPHDATA SAMPLE 456 = ', this.props.graphData[0]): console.log('not there')}
        {this.props.primaryMovie.releaseDate ? console.log('RELEASE & TREND DATA SAMPLE 1234 = ', this.props.primaryMovie.releaseDate, this.props.primaryMovie.trendData[0]): console.log('not there')}
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
