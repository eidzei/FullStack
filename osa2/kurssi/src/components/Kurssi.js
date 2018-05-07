import React from 'react'

const Kurssi = ({kurssit}) => kurssit.map(k => {
    const Otsikko = () => <h1 key={k.id}>{k.nimi}</h1> 

    let sisalto = k.osat
    const Sisalto = () => sisalto.map(osat => 
      <p key={osat.id}>
        {osat.nimi} {osat.tehtavia}
      </p>  
    )
    
    const Yhteensa = () => <p>yhteensä {sisalto.map(osat => 
      osat.tehtavia).reduce((a,c)=> a+c)} tehtävää</p>
      
    return (
      <div key={k.id}>
        <Otsikko/> 
        <Sisalto/>
        <Yhteensa />
      </div>
    )
    }  
  )

export default Kurssi