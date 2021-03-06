import React from 'react';


const NewPerson = ({addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
    
    return (
        <form onSubmit={addPerson} className="note">
          <div>
            nimi: <input value={newName} onChange={handleNameChange}/>
          </div>
          <div>
            numero: <input value={newNumber} onChange={handleNumberChange}/>
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
    )
}

export default NewPerson