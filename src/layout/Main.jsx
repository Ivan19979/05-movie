import React, { useState, useEffect } from "react";
import { Movies } from "../components/Movies";
import { Search } from "../components/Search";
import { Loader } from "./Loader";

const API_KEY = process.env.REACT_APP_API_KEY;

const Main = () => {
  const [movies, setMovies] = useState([]);
  const defaultMovies = [
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
  ];
  const [page, setPage] = useState(1);
  const [totalResults, setTotal] = useState(0);
  const [str, setStr] = useState("");
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(true);

  function random() {
    return Math.floor(Math.random() * defaultMovies.length);
  }

  useEffect(() => {
    const defaultRandom = defaultMovies[random()];
    setStr(defaultRandom);
    setLoading(false);
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${defaultRandom}`)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search);
        setLoading(true);
        setTotal(data.totalResults);
      })
      .catch((err) => {
        console.err(err);
        setLoading(false);
      });
  }, []);

  const searchMovies = (strMovies, typeMovies = "all") => {
    setMovies([]);
    setPage(1);
    setType(typeMovies);
    setLoading(false);
    if (strMovies === "") {
      strMovies = defaultMovies[random()];
    }
    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${strMovies}${
        typeMovies !== "all" ? `&type=${typeMovies}` : ""
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search);
        setStr(strMovies);
        setLoading(true);
        setTotal(data.totalResults);
      })
      .catch((err) => {
        console.err(err);
        setLoading(false);
      });
  };

  const moreArrow = () => {
    setPage(page + 1);
    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${str}&page=${
        page + 1
      }${`&type=${type === "all" ? "" : type}`}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          movies.push(...data.Search);
          setMovies(movies);
        } else {
          setMovies([]);
        }
      })
      .catch((err) => {
        console.err(err);
        setLoading(false);
      });
  };

  return (
    <main className="container content">
      <Search searchMovies={searchMovies} />
      {loading ? (
        <Movies
          moreArrow={moreArrow}
          movies={movies}
          type={type}
          page={page}
          totalResults={Math.ceil(totalResults / 10)}
        />
      ) : (
        <Loader />
      )}
    </main>
  );
};

export { Main };
