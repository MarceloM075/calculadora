import React, { Component } from "react"
import Button from "../components/button/Button"
import Display from "../components/display/Display"

import './Calculator.css'

const initialState = {
    value: '',
    result: 0,
    clearDisplay: false,
    values: [0, 0],
    currentValuesIndex: 0,
    operation: null,
    calculation: ''
}

export default class Calculator extends Component{
    state = {...initialState}

    constructor(props){
        super(props)

        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
        this.clearMemory = this.clearMemory.bind(this)
        this.displayDigit = this.displayDigit.bind(this)
    }

    clearMemory(){
        this.setState({...initialState}) // Sets the calculator state to its initial state.
    }
    
    setOperation(operation){
        if(this.state.currentValuesIndex === 0){
            this.setState({operation, currentValuesIndex: 1, clearDisplay: true}) // 
        }else{
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            
            switch(currentOperation){
                case '+':
                    values[0] = values[0] + values[1]
                    values[1] = 0

                    this.setState({
                        result: values[0], 
                        operation: equals ? null : operation, 
                        currentValuesIndex: equals ? 0 : 1,
                        clearDisplay: !equals,
                        values
                    })
                    break

                case '-':
                    values[0] = values[0] - values[1]
                    values[1] = 0

                    this.setState({
                        result: values[0], 
                        operation: equals ? null : operation, 
                        currentValuesIndex: equals ? 0 : 1,
                        clearDisplay: !equals,
                        values
                    })
                    break

                case 'x':
                    values[0] = values[0] * values[1]
                    values[1] = 0

                    this.setState({
                        result: values[0], 
                        operation: equals ? null : operation, 
                        currentValuesIndex: equals ? 0 : 1,
                        clearDisplay: !equals,
                        values
                    })
                    break
                
                case '/':
                    values[0] = values[0] / values[1]
                    values[1] = 0

                    this.setState({
                        result: values[0], 
                        operation: equals ? null : operation, 
                        currentValuesIndex: equals ? 0 : 1,
                        clearDisplay: !equals,
                        values
                    })
                    break

                case '=':
                    break
                
                default:
                    break
            }
        }
        this.displayDigit(operation)
    }

    addDigit(digit){
        if(digit === '.' && this.state.value === '') return this.setState({value: ''}) // Checks if the first digit is a dot.
        if(digit === '.' && this.state.value.includes('.')) return // Checks if value already has a dot.

        let clearDisplay = this.state.value === '0' || this.state.clearDisplay // Variable to prevent leading zeros.

        if(this.state.value === '0' && digit === '.') clearDisplay = false // Checks if the second digit is a dot, so the calculation display isn't cleared.
        
        const currentValue = clearDisplay ? '' : this.state.value
        const value = currentValue + digit

        this.setState({value, clearDisplay: false})

        // This adds the current value to an array of values to enable the calculation
        if(digit !== '.'){
            const i = this.state.currentValuesIndex
            const newValue = parseFloat(value)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({values})
        }
        
        this.displayDigit(digit)
    }

    displayDigit(digit){
        let leadingZero = (this.state.calculation[0] === '0' && digit === '0') ? true : false
        if(this.state.calculation.length > 1) leadingZero = false

        this.setState({
            calculation: leadingZero ? '0' : this.state.calculation + digit
        })
    }

    render(){
        return(
            <div id="calculator">
                <Display result={this.state.result} calculation={this.state.calculation}/>
                <Button label='AC' triple click={this.clearMemory}/>
                <Button label='/' operation click={this.setOperation}/>
                <Button label='7' click={this.addDigit}/>
                <Button label='8' click={this.addDigit}/>
                <Button label='9' click={this.addDigit}/>
                <Button label='x' operation click={this.setOperation}/>
                <Button label='4' click={this.addDigit}/>
                <Button label='5' click={this.addDigit}/>
                <Button label='6' click={this.addDigit}/>
                <Button label='-' operation click={this.setOperation}/>
                <Button label='1' click={this.addDigit}/>
                <Button label='2' click={this.addDigit}/>
                <Button label='3' click={this.addDigit}/>
                <Button label='+' operation click={this.setOperation}/>
                <Button label='0' double click={this.addDigit}/>
                <Button label='.' click={this.addDigit}/>
                <Button label='=' operation click={this.setOperation}/>
            </div>
        )
    }
}