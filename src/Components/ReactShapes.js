import React from 'react'


const ReactShapes = () => {

    const data = [24, 43, 5, 17]

    return(
        <React.Fragment>
        <div style={{marginLeft: 20}}>
        <svg >
         {data.map(value => (
           <circle r={value}></circle>
         ))}
        </svg>
        </div>
      </React.Fragment>
    )

}
 export default ReactShapes