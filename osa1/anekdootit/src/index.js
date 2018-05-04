import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      pisteet: [{piste: 0, id: 0},
                {piste: 0, id: 1}, 
                {piste: 0, id: 2},
                {piste: 0, id: 3},
                {piste: 0, id: 4},
                {piste: 0, id: 5}],
      suurin: 0,
      indeksi: 0
    }
  }

  render() {
    const setToValue = (newValue) => () => { 
        this.setState({ selected: newValue })
    }
    

    const vote = () => () => {
        const kopio = [ ...this.state.pisteet]
        console.log(kopio)
        kopio[this.state.selected].piste += 1
        console.log(kopio)
        const suuri = kopio.reduce((max, order) => order.piste>max ? order.piste: max, 0)
        const index = kopio.find(function(order) {return order.piste === suuri} )
        console.log(suuri, index)
        return (
            this.setState({pisteet: kopio}),
            this.setState({suurin: suuri}),
            this.setState({indeksi: index.id})
        )
        
    }


    return (  
      <div>
          <div>
            {this.props.anecdotes[this.state.selected]}
          </div>
          <div>
             has {this.state.pisteet[this.state.selected].piste} votes
          </div>
          <button onClick={vote()}>
              vote
          </button> 
          <button onClick={setToValue(Math.floor(Math.random()*6))}>
             next anecdote
          </button>
          <h2>anecdote with most votes:</h2>
          <div>  
            {this.props.anecdotes[this.state.indeksi]}
          </div>
          <div>
            has {this.state.suurin} votes
          </div>
          
      </div>
    )
  }
}



const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
