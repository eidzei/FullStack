import React from 'react';
import Nimet from './components/Nimet'
import NewPerson from './components/NewPerson'
import FilterForm from './components/FilterForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          number: '040-123456',
          id: 1}
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

 

  addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber,
      id: this.state.persons.length + 1
    }

    const person = this.state.persons.concat(newPerson)

    if (!this.state.persons.map(p => p.name).includes(this.state.newName)) {
      this.setState({
        persons: person,
        newName: '',
        newNumber: ''
      })
    
    } else {
        alert("Nimi on jo puhelinluettelossa")
        this.setState({newName: '', newNumber: ''})
    }
  }

  filterDisplayed = (event) => {
    event.preventDefault()

  } 

  handleNameChange = (event) => {
    console.log(event.target.value)
    this.setState({ newName: event.target.value})
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value})
  }

  
  render() {
    
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <FilterForm 
          filterDisplayed={this.filterDisplayed}
          filter={this.state.filter}
          handleFilterChange={this.handleFilterChange}
        />
        
        <h2>Lisää uusi</h2>
        <NewPerson 
          addPerson={this.addPerson} 
          newName={this.state.newName}
          newNumber ={this.state.newNumber}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
        />
        
        <h2>Numerot</h2>
        <table>
          <tbody>
          <Nimet luettelo={this.state.persons} filter={this.state.filter}/>
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
