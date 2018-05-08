import React from 'react';

const FilterForm = ({filterDisplayed, filter, handleFilterChange}) => {
    return(
        <form onSubmit={filterDisplayed} className="note">
          <div>
            rajaa näytettäviä: <input value={filter} onChange={handleFilterChange}/>
          </div>
        </form>
    )
}

export default FilterForm