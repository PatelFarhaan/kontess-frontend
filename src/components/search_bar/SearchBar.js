import React from 'react';

const SearchBar = () => {
    return(
        <div className="serch_row">
            <input type="search" placeholder="Search.." />
            <button>
                <i className="fa fa-search" aria-hidden="true" />
            </button>
        </div>
    );
}

export default SearchBar;