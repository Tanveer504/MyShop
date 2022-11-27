
import './FeatureBox.scss'
import React from 'react'

// Render the FeatureBox component
const FeatureBox = (props) => {
    return (
      <div className='endPart'>
          <img src={props.imgUrl} alt={props.Heading} />
          <p style={{width :'100%'}}>
          <strong>{props.Heading}</strong>
          <br/>{props.SubHeading}
          </p>
        
      </div>
    )
}

export default FeatureBox
