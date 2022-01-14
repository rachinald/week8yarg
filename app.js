require("dotenv").config();
const yargs = require("yargs/yargs");
// hideBin = hide binaries
const { hideBin } = require("yargs/helpers");
// const Connection = require("mysql2/typings/mysql/lib/Connection");

const argv = yargs(hideBin(process.argv)).argv;

const { Movie } = require("./models/models");
const connection = require("./db/connection");
const {
  addMovie,
  listMovies,
  updateMovie,
  deleteMovie,
} = require("./utils/index");

const app = async (commandLineInput) => {
  try {
    await connection.authenticate();
  } catch (error) {
    console.log(error);
  }

  try {
    if (commandLineInput.add) {
      await Movie.sync({ alter: true });
      console.log("app.js addMovie");
      await addMovie({
        title: argv.title,
        actor: argv.actor,
        rating: argv.rating,
      });
    } else if (commandLineInput.list) {
      await listMovies();
    } else if (commandLineInput.update) {
      console.log(argv);
      console.log(argv.title);
      await updateMovie({
        title: argv.title,
        title2: argv.updatedTitle,
      });
      console.log(argv.updatedTitle);
    } else if (commandLineInput.delete) {
      await Movie.sync({ alter: true });
      console.log("app.js deleteMovie");
      await deleteMovie({
        title: argv.title,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

app(argv);
