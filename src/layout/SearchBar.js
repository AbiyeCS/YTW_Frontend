import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };
  // This function is called whenever the user types into the input field. It updates the searchTerm state with the 
  // new value and then calls the onSearch prop, passing the new search term to the parent component.

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>

  );
};

export default SearchBar;