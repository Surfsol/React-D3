import React from 'react';
import ReactShapes from './Components/ReactShapes'
import D3Shapes from './Components/d3Shape'
import D3Rect from './Components/d3Rect'
import D3Line from './Components/D3Line'

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
   </div>
   </>
  );
}

export default App;
