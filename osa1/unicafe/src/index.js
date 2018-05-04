import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            maara: 1,
            summa: 0,
            ka: 0,
            pos: 0
        }
    }

    whatIsArvo = (arvo) =>{
        if(arvo === 1){
            return (this.setState({hyva: this.state.hyva + 1}))
        } 
        if(arvo === -1) {
            return (this.setState({huono: this.state.huono + 1}))
        }
        if(arvo === 0) {
            return (this.setState({neutraali: this.state.neutraali + 1}))
        }    
    }

    lisays = (arvo) => {
        return () => {
            this.whatIsArvo(arvo)
            this.setState({
                    maara: this.state.maara + 1,
                    summa: this.state.summa + arvo,
                    ka: this.state.summa/this.state.maara,
                    pos: 100*(this.state.hyva/this.state.maara)
                })
            } 
        
    }

    render() {

        return (
            <div>
                <h1>anna palautetta</h1>
                <div>
                    <Button 
                        handleClick = {this.lisays(+1)}
                        text="hyvä" 
                    />
                    <Button 
                        handleClick = {this.lisays(0)}
                        text="neutraali" 
                    /> 
                    <Button 
                        handleClick = {this.lisays(-1)}
                        text="huono" 
                    />  
                </div>
                <h1>statistiikka</h1>
                <Taulukko 
                    hyva={this.state.hyva}
                    neutraali={this.state.neutraali}
                    huono={this.state.huono}
                    maara={this.state.maara}
                    ka={this.state.ka}
                    pos={this.state.pos}
                />

            </div>
        )
    }
}



const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({hyva, neutraali, huono, maara, ka, pos}) =>{
    if (maara === 0) {
        return(
            <div>ei yhtään palautetta annettu</div>
        )
    }
    return (
        <div>
            <Statistic 
                value = {hyva}
                text = "hyvä"
            />
            <Statistic 
                value = {neutraali}
                text = "neutraali"
            />
            <Statistic 
                value = {huono}
                text = "huono"
            />
            <Statistic
                value = {ka.toFixed(2)}
                text = "keskiarvo" 
            />
            <Statistic 
                value = {pos.toFixed(1)}
                text = "positiivisia"
                warn = {true}
            />
        </div>
    )
}

const Statistic = ({value, text, warn}) => {
    if (warn) {
        return (
            <div>{text}: {value} %</div>
        )
    }
    return (
        <div>{text}: {value}</div>
    )
}

const Taulukko = ({hyva, neutraali, huono, maara, ka, pos}) => {
    return (
        <div>
            <table>
              <tbody>  
                <tr>
                    <td>hyvä</td>
                    <td>{hyva}</td>
                </tr>
                <tr>
                    <td>neuraali</td>
                    <td>{neutraali}</td>
                </tr>
                <tr>
                    <td>huono</td>
                    <td>{huono}</td>
                </tr>
                <tr>
                    <td>kekskiarvo</td>
                    <td>{ka.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>positiivisia</td>
                    <td>{pos.toFixed(1)} %</td>
                </tr>
              </tbody>
            </table>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

