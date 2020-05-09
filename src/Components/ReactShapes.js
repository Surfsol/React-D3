import React from 'react'
import D3Shapes from './d3Shape'

const ReactShapes = () => {

    const data = [24, 43, 5, 17]

    return(
        <div>
        <React.Fragment>
        <div>
        <svg >
         {data.map(value => (
           <circle r={value}></circle>
         ))}
        </svg>
        </div>
        
      </React.Fragment>
      </div>
    )

}
 export default ReactShapes