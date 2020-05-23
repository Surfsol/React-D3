import React from 'react';
import ReactShapes from './Components/ReactShapes'
import D3Shapes from './Components/d3Shape'
import D3Rect from './Components/d3Rect'
import D3Line from './Components/D3Line'
import Practice from './Components/javascript'
import BarChart from './Components/AnimatedBarChart'
import BarChartAdd from './Components/BarChartAdd'

import './App.css';



function App() {

  const styles={
    width:300,
    // length:500
  }
  return (
    <>
    <div style={styles}>
   <ReactShapes/>
   <D3Shapes/>
   <D3Rect/>
   <D3Line/>
   <Practice/>
   <BarChart/>
   <BarChartAdd/>
   </div>
   </>
  );
}

export default App;
