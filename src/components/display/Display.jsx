import './Display.css'

const Display = props => 
    <div className='displayDiv'>
        <div className='display calculation'>{props.calculation}</div>
        <div className='display result'>{props.result}</div>
    </div>



export default Display