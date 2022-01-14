const { Sequelize } = require("sequelize");
const { argv } = require("yargs");

const { Movie } = require("../models/models");

const addMovie = async (movieObj) => {
  try {
    const movie = await Movie.create(movieObj);
    console.log(`We added ${movie.title}`);
  } catch (error) {
    console.log(error);
  }
};

const listMovies = async () => {
  try {
    const movies = await Movie.findAll({});
    console.log(movies.every((movie) => movie instanceof Movie));
    console.log("All movies: ", JSON.stringify(movies, null, 2));
  } catch (error) {
    console.log(error);
  }
};

const updateMovie = async (movieObj) => {
  try {
    await Movie.update(
      { title: movieObj.title2 },
      {
        where: {
          title: movieObj.title,
        },
      }
    );
    console.log(`We updated ${movieObj.title} to ${movieObj.title2}`);
  } catch (error) {
    console.log(error);
  }
};

const deleteMovie = async () => {
  try {
    movie = await Movie.destroy({
      where: { title: argv.title },
    });
    console.log(`We deleted ${argv.title}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addMovie,
  listMovies,
  updateMovie,
  deleteMovie,
};
