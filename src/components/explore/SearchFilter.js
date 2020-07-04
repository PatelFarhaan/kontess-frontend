import React from 'react';

const SearchFilter = () => {
    return(
        <div className="filter_row">
            <div className="filter_col">
                <label>Location</label>
                <input type="text" placeholder="Enter Your Location" name />
            </div>
            <div className="filter_col">
                <label>Type</label>
                <select>
                    <option>Business competition </option>
                    <option>Engineering and technology </option>
                    <option>Math and science </option>
                    <option>Arts and designs</option>
                    <option>cases studies</option>
                </select>
            </div>
            <div className="filter_col aditional">
                <label>Aditional Option</label>
                <div className="wrap_cstmbox">
                <div className="cstm_checkbox">
                    <input type="checkbox" id="competition" />
                    <label htmlFor="competition">Public competitions</label>
                </div>
                <div className="cstm_checkbox">
                    <input type="checkbox" id="application" />
                    <label htmlFor="application">Application still open</label>
                </div>
                </div>
            </div>
            <button type="button" className="default_btn">
                Search
            </button>
        </div>

    );
}

export default SearchFilter;