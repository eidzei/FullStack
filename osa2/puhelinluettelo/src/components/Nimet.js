import React from 'react';

const Nimet = ({luettelo, filter ,removePerson}) => luettelo.map(p => {
    console.log(p)

    if(p.name.toUpperCase().includes(filter.toUpperCase())){
      return(
        <tr key={p.id}>
          <td>{p.name}</td>
          <td>{p.number}</td>
          <td>
            <button onClick={removePerson(p.id)}>poista</button>
          </td>
        </tr>
      )
    }
    else {
      return (
        <tr key={0}>
          <td>
          </td>
        </tr>
      )
    }
  })
  
  export default Nimet