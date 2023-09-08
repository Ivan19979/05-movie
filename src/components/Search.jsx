import React from "react";

class Search extends React.Component {
  state = {
    search: "",
    default: "avengers",
    type: "all",
  };

  handleKey = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      this.props.searchMovies(this.state.search, this.state.type);
    }
  };

  handleChecked = (e) => {
    this.setState(
      () => ({ type: e.target.dataset.type }),
      () => this.props.searchMovies(this.state.search, this.state.type)
    );
  };

  render() {
    return (
      <div className="row">
        <div className="input-field col s12">
          <input
            type="search"
            className="validate input"
            placeholder="search"
            value={this.state.search}
            onChange={(e) => this.setState({ search: e.target.value })}
            onKeyDown={this.handleKey}
          />
          <button
            className="btn indigo light-3 search-btn"
            onClick={this.handleKey}
          >
            Search
          </button>
          <div className="radio-button">
            <p>
              <label>
                <input
                  className="indigo light-3"
                  checked={this.state.type === "all"}
                  name="filter"
                  data-type="all"
                  type="radio"
                  onChange={this.handleChecked}
                />
                <span>All</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  className="indigo light-3"
                  checked={this.state.type === "movie"}
                  name="filter"
                  type="radio"
                  data-type="movie"
                  onChange={this.handleChecked}
                />
                <span>Movies Only</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  className="indigo light-3"
                  checked={this.state.type === "series"}
                  name="filter"
                  type="radio"
                  data-type="series"
                  onChange={this.handleChecked}
                />
                <span>Series Only</span>
              </label>
            </p>
            <p>
              <label>
                <input
                  className="indigo light-3"
                  checked={this.state.type === "game"}
                  name="filter"
                  type="radio"
                  data-type="game"
                  onChange={this.handleChecked}
                />
                <span>Game Only</span>
              </label>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export { Search };
