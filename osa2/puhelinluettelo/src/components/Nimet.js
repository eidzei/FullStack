import React from 'react';

const Nimet = ({luettelo, filter}) => luettelo.map(p => {
    if(p.name.toUpperCase().includes(filter.toUpperCase())){
      return(
        <tr key={p.id}>
          <td>{p.name}</td>
          <td>{p.number}</td>
        </tr>
      )
    }
    else {
      return (
        <tr key={0}>
          <td>
            ei löydy
          </td>
        </tr>
      )
    }
  })
  
  export default Nimet