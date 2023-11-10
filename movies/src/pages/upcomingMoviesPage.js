/*import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getUpcomingMovies } from "../api/tmdb-api"
//import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner'; */

import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Spinner from "../components/spinner";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage = (props) => {

  const { data, error, isLoading, isError } = useQuery(
    "upcomingMovies",
    getUpcomingMovies
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));


 /* const addToFavorites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m
    );
    setMovies(updatedMovies);
  };
  
    useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
  }, []);*/

  return (
    <PageTemplate
    title="Upcoming Movies"
      movies={movies}
      //selectFavorite={addToFavorites}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie}/>;
      }}
    />
  );
};

export default UpcomingMoviesPage;