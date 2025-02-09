let BASE_URL = "https://post-it-heroku.herokuapp.com/";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:4000/";
  //console.log("Development mode");
}
//console.log("$BASE_URL:", BASE_URL);
export { BASE_URL };
