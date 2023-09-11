import React, { useState } from "react";

const Search = (props) => {
  const { searchMovies = Function.prototype } = props;

  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");

  const handleKey = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      searchMovies(search, type);
    }
  };

  const handleChecked = (e) => {
    setType(e.target.dataset.type);
    searchMovies(search, e.target.dataset.type);
  };

  return (
    <div className="row">
      <div className="input-field col s12">
        <input
          type="search"
          className="validate input"
          placeholder="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKey}
        />
        <button className="btn indigo light-3 search-btn" onClick={handleKey}>
          Search
        </button>
        <div className="radio-button">
          <p>
            <label>
              <input
                className="indigo light-3"
                checked={type === "all"}
                name="filter"
                data-type="all"
                type="radio"
                onChange={handleChecked}
              />
              <span>All</span>
            </label>
          </p>
          <p>
            <label>
              <input
                className="indigo light-3"
                checked={type === "movie"}
                name="filter"
                type="radio"
                data-type="movie"
                onChange={handleChecked}
              />
              <span>Movies Only</span>
            </label>
          </p>
          <p>
            <label>
              <input
                className="indigo light-3"
                checked={type === "series"}
                name="filter"
                type="radio"
                data-type="series"
                onChange={handleChecked}
              />
              <span>Series Only</span>
            </label>
          </p>
          <p>
            <label>
              <input
                className="indigo light-3"
                checked={type === "game"}
                name="filter"
                type="radio"
                data-type="game"
                onChange={handleChecked}
              />
              <span>Game Only</span>
            </label>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Search };
