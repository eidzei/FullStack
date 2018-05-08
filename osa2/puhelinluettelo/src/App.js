import React from 'react';
import Nimet from './components/Nimet'
import NewPerson from './components/NewPerson'
import FilterForm from './components/FilterForm'
import numberService from './services/phonenumbers'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null,
      error: null
    }
  }

  componentDidMount() {
    numberService
    .getAll()
    .then(response => {
      this.setState({persons: response.data})
    })
  }


  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    if (!this.state.persons.map(p => p.name).includes(this.state.newName)) {
      numberService
        .create(personObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            message: `nimi ${this.state.newName} ja numero ${this.state.newNumber} lisätty`, 
            newName:'',
            newNumber: ''
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)
        })    
    } else {
        if(window.confirm(`${this.state.newName} on jo luettelossa, korvataanko vanha numero uudella?`)){
          const person = this.state.persons.find(p=> p.name === this.state.newName)
          const changedNumber =  {...person, number: this.state.newNumber}
          numberService
            .update(
              person.id,
              personObject)
            .then(response => {
              this.setState({
                persons: this.state.persons.map(p => p.name !== this.state.newName ? p: changedNumber ),
                message: `${this.state.newName} uusi numero ${this.state.newNumber}`,
                newName:'',
                newNumber: ''
              })
              setTimeout(() => {
                this.setState({message: null})
              }, 5000)
            })
            .catch(error => {
              const errorAdd = {
                name: changedNumber.name,
                number: changedNumber.number
              }
              this.setState({
                persons: this.state.persons.concat(errorAdd),
                message: `nimi ${this.state.newName} ja numero ${this.state.newNumber} lisätty`,
                newName:'',
                newNumber: ''
              })
              setTimeout(() => {
                this.setState({message: null})
              }, 5000)
            })  
        }
    }
  }

  removePerson = (id) => {
    return () =>{
      if(window.confirm(`poistetaanko ${this.state.persons[id-1].name}`)){
        numberService
          .remove(id)
          .then(responce =>{
            this.setState({
              message: `${this.state.persons[id-1].name} poistettu`,
              persons: this.state.persons.filter(n => n.id !== id)
            })
          })
          .catch(error => {
            console.log('poistettu')
          })
          setTimeout(() => {
            this.setState({message: null})
          }, 5000)
      }
    }
  }

  filterDisplayed = (event) => {
    event.preventDefault()

  } 

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value})
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value})
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value})
  }

  
  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>

        <Notification message={this.state.message}/>

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
        <table className="note">
          <tbody>
          <Nimet 
            luettelo={this.state.persons} 
            filter={this.state.filter}
            removePerson={this.removePerson}
          />
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
