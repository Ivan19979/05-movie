import React from "react";
import { Movies } from "../components/Movies";
import { Search } from "../components/Search";
import { Loader } from "./Loader";

const API_KEY = process.env.REACT_APP_API_KEY;

class Main extends React.Component {
  state = {
    movies: [],
    default: [
      "matrix",
      "avengers",
      "man",
      "fast",
      "astral",
      "girl",
      "car",
      "fight",
      "teacher",
      "red",
    ],
    page: 1,
    totalResults: 0,
    str: "",
    type: "all",
    loading: true,
  };

  random() {
    return Math.floor(Math.random() * this.state.default.length);
  }

  componentDidMount() {
    const defaultRandom = this.state.default[this.random()];
    this.setState({ str: defaultRandom, loading: false });
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${defaultRandom}`)
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          movies: data.Search,
          loading: true,
          totalResults: data.totalResults,
        })
      )
      .catch((err) => {
        console.err(err);
        this.setState({ loading: false });
      });
  }

  searchMovies = (str, type = "all") => {
    this.setState({ movies: [], page: 1, type: type, loading: false });
    if (str === "") {
      str = this.state.default[this.random()];
    }
    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${
        type !== "all" ? `&type=${type}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          movies: data.Search,
          str: str,
          loading: true,
          totalResults: data.totalResults,
        });
      })
      .catch((err) => {
        console.err(err);
        this.setState({ loading: false });
      });
  };

  moreArrow = () => {
    this.setState(
      () => ({ page: this.state.page + 1 }),
      () =>
        fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${
            this.state.str
          }&page=${this.state.page}${`&type=${
            this.state.type === "all" ? "" : this.state.type
          }`}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.Search) {
              this.state.movies.push(...data.Search);
              this.setState({ movies: this.state.movies });
            } else {
              this.setState({ movies: [{}] });
            }
          })
    ).catch((err) => {
      console.err(err);
      this.setState({ loading: false });
    });
  };

  render() {
    const { movies, loading, type } = this.state;

    return (
      <main className="container content" onScroll={() => this.handleScroll}>
        <Search searchMovies={this.searchMovies} />
        {loading ? (
          <Movies
            moreArrow={this.moreArrow}
            movies={movies}
            type={type}
            page={this.state.page}
            totalResults={Math.ceil(this.state.totalResults / 10)}
          />
        ) : (
          <Loader />
        )}
      </main>
    );
  }
}

export { Main };
