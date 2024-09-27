import React from "react";
import './searchBar.modul.css';
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = ({ onFocus, onChangeText }) => {
  const handleTextChange = (event) => {
    onChangeText(event.target.value); 
  };

  return (
    <div className="inputContainer">
        <div className="icon-container">
            <SearchIcon className="icon-style"></SearchIcon>
        </div>
        
        <input
            className="input"
            placeholder="Search "
            onChange={()=>handleTextChange}
            onFocus={onFocus}
            placeholderTextColor="#7f7f7f"
        />
    </div>
  );
};

export default SearchBar;
