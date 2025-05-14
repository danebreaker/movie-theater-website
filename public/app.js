/* Firebase Stuff */
const firebaseConfig = {
  apiKey: "AIzaSyBVkH1diUVuWZCBFXVeN2OQ6fe2ysNyXOo",
  authDomain: "driveintheater-a4cf2.firebaseapp.com",
  projectId: "driveintheater-a4cf2",
  storageBucket: "driveintheater-a4cf2.firebasestorage.app",
  messagingSenderId: "733713961549",
  appId: "1:733713961549:web:49537ece4fbe6cfec50204",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// define authentication variable
let auth = firebase.auth();
// define database variable
let db = firebase.firestore();

/* HTML Div Definitions */
let div_home = `<div id="home" class="m-6">
        <div class="columns m-2">
          <div class="column is-three-fifths-desktop is-three-fifths-tablet is-full-mobile">
            <h1 class="is-size-3 has-text-weight-semibold has-text-centered has-text-inherit mb-4">
              Now Playing!
            </h1>
            <div class="columns is-mobile nowplaying">
            </div>
          </div>

          <div class="column is-two-fifths-desktop is-full-mobile">
            <h2 class="is-size-4 has-text-weight-semibold has-text-centered has-text-inherit mb-4">
              Upcoming:
            </h2>
            <div class="columns is-mobile upcomingshowings">
            </div>

            <div id="info" class="has-text-centered box has-text-inherit has-background-inherit">
              <h3 class="is-size-5 has-text-weight-semibold">Admission:</h3>
              <br />
              $5 - Child (under 16)
              <br />
              $8 - General Admission
              <br />
              <br />
              Gates open at 5:30 PM
              <br />
              <br />
              Concessions open until start of second showing
            </div>
          </div>
        </div>
      </div>`;

let div_showings = `<div id="showings" class="m-6">
        <div class="columns m-2 mb-6">
          <div class="column is-three-fifths-desktop is-three-fifths-tablet is-full-mobile">
            <h1 class="is-size-3 has-text-weight-semibold has-text-centered has-text-inherit mb-4">
              Movies Playing On: <span id="showingdate" class="has-text-weight-normal">Date</span>
            </h1>
            <div class="columns is-mobile nowplaying">
            </div>
          </div>

          <div class="column">
            Filters: <br />
            <input type="date" id="dateselector" />

            <div id="showtimecontent">
              <div id="showtimeinfo">
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="is-size-4 has-text-weight-semibold has-text-centered has-text-inherit mb-4">
            Upcoming:
          </h3>

          <div class="columns has-background-inherit mx-6">
            <div class="column is-half is-offset-one-quarter">
              <div class="columns upcomingshowings">
              </div>
            </div>
          </div>
        </div>

        <div id="reservationmodal" class="modal">
          <div class="modal-background closebutton"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">Reserve Your Parking Spot</p>
              <button class="delete closebutton" aria-label="close"></button>
            </header>

            <div class="modal-card-body">
              <img src="images/parkingspots.png" alt="overhead view of parking" usemap="#parkingmap" width="625" height="452"/>
              <h3>The first three rows are available to reserve</h3>
              <h4>Selected Parking Spot:</h4>
              <div class="select">
                <select id="selectedSpot">
                  <option class="parkingOption" value="A1">A1</option>
                  <option class="parkingOption" value="A2">A2</option>
                  <option class="parkingOption" value="A3">A3</option>
                  <option class="parkingOption" value="A4">A4</option>
                  <option class="parkingOption" value="A5">A5</option>
                  <option class="parkingOption" value="A6">A6</option>
                  <option class="parkingOption" value="A7">A7</option>
                  <option class="parkingOption" value="A8">A8</option>
                  <option class="parkingOption" value="A9">A9</option>
                  <option class="parkingOption" value="A10">A10</option>
                  <option class="parkingOption" value="B1">B1</option>
                  <option class="parkingOption" value="B2">B2</option>
                  <option class="parkingOption" value="B3">B3</option>
                  <option class="parkingOption" value="B4">B4</option>
                  <option class="parkingOption" value="B5">B5</option>
                  <option class="parkingOption" value="B6">B6</option>
                  <option class="parkingOption" value="B7">B7</option>
                  <option class="parkingOption" value="B8">B8</option>
                  <option class="parkingOption" value="B9">B9</option>
                  <option class="parkingOption" value="B10">B10</option>
                  <option class="parkingOption" value="B11">B11</option>
                  <option class="parkingOption" value="B12">B12</option>
                  <option class="parkingOption" value="C1">C1</option>
                  <option class="parkingOption" value="C2">C2</option>
                  <option class="parkingOption" value="C3">C3</option>
                  <option class="parkingOption" value="C4">C4</option>
                  <option class="parkingOption" value="C5">C5</option>
                  <option class="parkingOption" value="C6">C6</option>
                  <option class="parkingOption" value="C7">C7</option>
                  <option class="parkingOption" value="C8">C8</option>
                  <option class="parkingOption" value="C9">C9</option>
                  <option class="parkingOption" value="C10">C10</option>
                  <option class="parkingOption" value="C11">C11</option>
                  <option class="parkingOption" value="C12">C12</option>
                  <option class="parkingOption" value="C13">C13</option>
                  <option class="parkingOption" value="C14">C14</option>
                </select>
              </div>
            </div>
            <div class="modal-card-foot">
              <div class="buttons">
                <button class="button" id="submitReservation">Reserve</button>
                <button class="button closebutton">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;

let div_about = `<div id="about" class="m-6">
        <div class="columns m-2">
          <div class="column has-text-centered is-three-fifths-desktop is-three-fifths-tablet is-full-mobile">
            <h3 class="is-size-4 has-text-weight-semibold mb-4">Information</h3>

            <h4 class="is-size-5 has-text-weight-semibold mb-4">General</h4>
            <ul class="mb-4">
              <li>Gates open at 5:30 PM</li>
              <li>Snack bar open until start of second movie</li>
              <li>Bathrooms in main club house</li>
            </ul>

            <h4 class="is-size-5 has-text-weight-semibold mb-4">Sound</h4>
            <ul>
              <li>Movies can be heard on your vehicle's sound system</li>
              <li>Tune your radio to FM 98.1 or AM 790</li>
              <li>Speakers are available in the front three rows</li>
            </ul>
          </div>

          <div class="column is-two-fifths-desktop is-full-mobile mr-6 pr-6">
            <h3 class="is-size-4 has-text-weight-semibold mb-4">About Us</h3>
            <p>
              Welcome to Dane's Drive In, where the magic of classic cinema
              meets the charm of a nostalgic outdoor experience. Established in
              1975, our drive-in theater has been a cherished destination for
              families, friends, and movie lovers alike. With a wide selection
              of films, from timeless classics to the latest blockbusters, we
              provide a unique way to enjoy movies under the stars. Our goal is
              to offer a fun, safe, and memorable night out, complete with
              delicious snacks, a friendly atmosphere, and the convenience of
              watching films from the comfort of your own car. Join us for an
              unforgettable cinematic experience that brings people together,
              the way movies were meant to be enjoyed!
            </p>
          </div>
        </div>
      </div>`;

let div_signin = `<div id="signin" class="has-text-centered m-6">
        <div class="columns">
          <form class="column is-one-fifth-desktop is-two-fifths-tablet is-half-mobile mx-auto">
            <h3 class="is-size-3 has-text-weight-semibold has-text-inherit mb-4">
              Sign In
            </h3>
            <div class="field has-text-inherit">
              <label class="label has-text-inherit">Email:</label>
              <div class="control">
                <input id="emailSignin" class="input" type="text" placeholder="Text input"/>
              </div>
            </div>

            <div class="field">
              <label class="label has-text-inherit">Password:</label>
              <div class="control">
                <input id="passwordSignin" class="input" type="password" placeholder="Text input"/>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button id="signinSubmit" class="button">Sign In</button>
              </div>
            </div>

            <a id="navsignup" class="is-clickable">Dont have an account? Sign Up</a>
          </form>
        </div>

        <p>
          Admin: admin@drivein.com
          <br />
          Password: admin123
        </p>
        <br />
        <p>
          User: test@test.com
          <br />
          Password: Test123!
        </p>
      </div>`;

let div_signup = `<div id="signup" class="has-text-centered m-6">
        <div class="columns">
          <form class="column is-one-fifth-desktop is-two-fifths-tablet is-half-mobile mx-auto">
            <h3 class="is-size-3 has-text-weight-semibold has-text-inherit mb-4">
              Sign Up
            </h3>
            <div class="field">
              <label class="label has-text-inherit">Email:</label>
              <div class="control">
                <input id="emailSignup" class="input" type="text" placeholder="Text input"/>
              </div>
            </div>

            <div class="field">
              <label class="label has-text-inherit">Password:</label>
              <div class="control">
                <input id="passwordSignup" class="input" type="password" placeholder="Text input"/>
              </div>
            </div>

            <div class="field">
              <label class="label has-text-inherit">Confirm Password:</label>
              <div class="control">
                <input id="confirmPasswordSignup" class="input" type="password" placeholder="Text input"/>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button id="signupSubmit" class="button">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>`;

let div_adminpage = `<div id="adminPage" class="m-6">
        <div class="columns">
          <div class="column box m-6 has-text-inherit">
            <h1 class="is-size-3 has-text-weight-semibold has-text-centered has-text-inherit mb-4">
              All Showings
            </h1>

            <div>
              <table class="table m-auto">
                <thead>
                  <th>Now Playing</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Movie 1</th>
                  <th>Movie 2</th>
                  <th></th>
                  <th></th>
                </thead>
                <tbody id="allshowings">

                </tbody>
              </table>
            </div>
          </div>

          <div class="column box m-6 has-text-inherit">
            <h1 class="is-size-3 has-text-weight-semibold has-text-centered has-text-inherit mb-4">
              Add New Showing
            </h1>

            <div class='columns'>
              <div class='column has-text-centered'>
                <form>
                  <div class="field">
                    <label for="admindateselector">Date: <span id="adminshowingdate"></span></label>
                    <input type="date" id="admindateselector" />
                  </div>

                  <div class="field">
                    <label for="showingtime">Time: </label>
                    <input type="time" id="admintimeselector">
                  </div>

                  <div class="field">
                    <label class="checkbox">Now Playing?</label>
                    <input type="checkbox" id="nowplayingcheckbox"/>
                  </div>
                </form>

                <p>Movie 1: <span id="movie1"></span></p>
                <p>Movie 2: <span id="movie2"></span></p>
                
                <br />
                
                <button class="button" onClick="clearAddNewMovie()">Clear Form</button>
                <button class="button" onClick="addNewShowing()">Submit</button>
              </div>

              <div class='column'>
                <div class="dropdown" style="width: 100%" id="moviesearch">
                  <div class="dropdown-trigger" style="width: 100%">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" style="width: 100%">
                      <div class="field" style="width: 100%">
                        <label class="label">Movie Search:</label>
                        <div class="control" style="width: 100%">
                          <input class="input" id="search" type="text" placeholder="Movie Name"/>
                        </div>
                      </div>
                    </button>
                  </div>
                  <div class="dropdown-menu" id="dropdown-menu" role="menu">
                    <div class="dropdown-content">
                      <table class="table is-hoverable">
                        <tbody id="searchResults">
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column box m-6 has-text-inherit">
            <h1 class="is-size-3 has-text-weight-semibold has-text-centered has-text-inherit mb-4">
              My Parking Reservations
            </h1>

            <div>
              <table class="table m-auto">
                <thead>
                  <th>Date</th>
                  <th>Movie 1</th>
                  <th>Movie 2</th>
                  <th>Start Time</th>
                  <th>Parking Spot</th>
                  <th></th>
                </thead>
                <tbody id="myreservations">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>`;

let div_customerpage = `<div id="customerpage" class="m-6">
        <div class="columns">
          <div class="column box m-6 has-text-inherit">
            <h1 class="is-size-3 has-text-weight-semibold has-text-centered has-text-inherit mb-4">
              My Parking Reservations
            </h1>

            <div>
              <table class="table m-auto">
                <thead>
                  <th>Date</th>
                  <th>Movie 1</th>
                  <th>Movie 2</th>
                  <th>Start Time</th>
                  <th>Parking Spot</th>
                  <th></th>
                </thead>
                <tbody id="myreservations">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>`;

/* Easily return an element by id */
function r_e(id) {
  return document.querySelector(`#${id}`);
}

/* Handles Home Page Functionality */
function navHome() {
  r_e("main").innerHTML = div_home;
  getNowShowing("home");
  getUpcoming(1);
  hideNavbarBurger();
}

/* Template structure for adding a new showing */
let newShowing = {
  date: null,
  time: null,
  nowplaying: false,
  movie1: {
    title: null,
    id: null,
    poster: null,
  },
  movie2: {
    title: null,
    id: null,
    poster: null,
  },
};

/* Selecting movie to add for new showing */
function selectMovie(num, mtitle, mid, mposter) {
  // can either select movie as playing first or second
  switch (num) {
    case 1:
      // display selected movie
      r_e("movie1").innerHTML = mtitle;

      // populate newShowing fields
      newShowing.movie1.title = mtitle;
      newShowing.movie1.id = mid;
      newShowing.movie1.poster = mposter;
      break;

    case 2:
      // display selected movie
      r_e("movie2").innerHTML = mtitle;

      // populate newShowing fields
      newShowing.movie2.title = mtitle;
      newShowing.movie2.id = mid;
      newShowing.movie2.poster = mposter;
      break;
  }
}

function addNewShowing() {
  let date = r_e("admindateselector").value;
  let time = r_e("admintimeselector").value;

  if (!newShowing.movie1.title || !newShowing.movie2.title) {
    configure_message("Please select two movies");
  } else if (!date || !time) {
    configure_message("Please select a date and time");
  } else {
    newShowing.date = date;
    newShowing.time = time;

    // checks to see if there is already a showing set as now playing
    db.collection("showings")
      .where("nowplaying", "==", true)
      .get()
      .then((data) => {
        let my_data = data.docs;

        if (my_data[0] && newShowing.nowplaying) {
          // db already has a now showing
          configure_message("Please delete the current now playing before adding a new now playing, or unselect now playing");
        } else {
          // if no showing is now playing then add this new one
          db.collection("showings")
            .add(newShowing)
            .then(() => {
              getAllShowings();
              clearAddNewMovie();
            })
            .catch((e) => {
              configure_message("Error adding a new showing, please try again");
            });
        }
      });
  }
}

function clearAddNewMovie() {
  // Sets form inputs to defaults
  r_e("admindateselector").value = null;
  r_e("admintimeselector").value = null;
  r_e("movie1").innerHTML = "";
  r_e("movie2").innerHTML = "";
  r_e("search").value = "";
  r_e("moviesearch").classList.remove("is-active");
}

function getAllShowings() {
  // gets all showings from the db
  db.collection("showings")
    .orderBy("date")
    .get()
    .then((data) => {
      let my_data = data.docs;
      let html = "";

      if (my_data.length != 0) {
        // populate the showings table
        my_data.forEach((showing) => {
          let showingInfo = showing.data();

          html += `
          <tr>
            <td>${showingInfo.nowplaying ? '<i class="fa-solid fa-check"></i>' : ""}</td>

            <td>${showingInfo.date}</td>
            <td>${showingInfo.time}</td>

            <td>
              ${showingInfo.movie1.title}
            </td>

            <td>
              ${showingInfo.movie2.title}
            </td>

            <td>
              <button class="button" onClick="newNowPlaying('${showing.id}')">Now Showing</button>
            </td>

            <td>
              <button class="button" onClick="deleteShowing('${showing.id}')">Delete</button>
            </td>
          </tr>
        `;
        });
      } else {
        // if no showings, display that to the admin
        html += "<tr><td colspan='7' class='has-text-centered mx-auto'>There are no showings</td></tr>";
      }

      r_e("allshowings").innerHTML = html;
    })
    .catch((e) => {
      configure_message("Error getting all showings, please try again");
    });
}

function deleteShowing(id) {
  // deletes a showing
  db.collection("showings")
    .doc(id)
    .delete()
    .then(() => {
      // unreserves (deletes) all parking reservations for this showing
      db.collection("parking_reservations")
        .where("showing", "==", id)
        .get()
        .then((data) => {
          let my_data = data.docs;

          my_data.forEach((reservation) => {
            unreserveParkingSpot(reservation.id);
          });

          getAllShowings();
        });
    })
    .catch((e) => {
      configure_message("Error deleting a showing: " + e);
    });
}

function getNowShowing(page) {
  db.collection("showings")
    .where("nowplaying", "==", true)
    .get()
    .then((data) => {
      let my_data = data.docs;

      if (my_data.length != 0) {
        my_data.forEach((showing) => {
          let showingInfo = showing.data();
          let html = "";

          html += `
            <div class="column">
              <figure class="image is-2by3 movieposterlg ml-auto">
                <img
                  src="https://image.tmdb.org/t/p/original/${showingInfo.movie1.poster}"
                  alt="${showingInfo.movie1.title} - poster"
                  class="movieposterborder"
                />
              </figure>
            </div>
          `;

          html += `
            <div class="column">
              <figure class="image is-2by3 movieposterlg mr-auto">
                <img
                  src="https://image.tmdb.org/t/p/original/${showingInfo.movie2.poster}"
                  alt="${showingInfo.movie2.title} - poster"
                  class="movieposterborder"
                />
              </figure>
            </div>
          `;

          document.querySelectorAll(".nowplaying").forEach((div) => {
            div.innerHTML = html;
          });

          if (page == "showings") {
            getShowingDetails(showing);
            r_e("dateselector").value = showingInfo.date;
            r_e("showingdate").innerHTML = showingInfo.date;
          }

          return showingInfo.date;
        });
      } else {
        document.querySelectorAll(".nowplaying").forEach((div) => {
          div.innerHTML = "<p class='has-text-centered mx-auto'>There are no movies currently showing</p>";
        });
      }
    });
}

function getShowingDetails(showing) {
  r_e("submitReservation").addEventListener("click", () => {
    reserveSpot(showing.id);
  });

  let html = "";
  let showingInfo = showing.data();

  let url = `https://api.themoviedb.org/3/movie/${showingInfo.movie1.id}?language=en-US`;
  let options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTYzYmUxMmExMmNlMjYyMzU1MzlhOThhOTkzODcxZiIsIm5iZiI6MTczMTk4NDA2MS45NTQ0NDM1LCJzdWIiOiI2NzA1YWFiZmY0YjkxOWY4Mzk3Nzk0ZTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ceUvXQeK2ayGZJFLG1uLIldWq0N5AQpTS2mFimUyYeE",
    },
  };

  // fetch movie 1 data from TMDB
  fetch(url, options)
    .then((res) => res.json())
    .then((movie) => {
      html += `
        <div class="my-5">
          <span id="movie1starttime">Estimated start time - ${convertMilitaryToNormalTime(showingInfo.time)}</span>
          <br />
          <span id="movie1title" class="is-size-4 has-text-weight-semibold">${movie.title}</span>
          <span id="movie1releasedate">${movie.release_date.slice(0, 4)}</span>
          <br />
          <div id="movie1genres">
      `;

      movie.genres.forEach((genre, i) => {
        html += `
          <span id="${genre.name}" class="is-size-7">${genre.name} ${i != movie.genres.length - 1 ? ", " : ""}</span>
        `;
      });

      html += `
          </div>
          <span id="movie1desc">${movie.overview}</span>
          <br />
          <span id="movie1imdb">
            <a id="movie1link" href="https://www.imdb.com/title/${movie.imdb_id}" target="#">IMDB Page</a>
          </span>
        </div>
      `;

      url = `https://api.themoviedb.org/3/movie/${showingInfo.movie2.id}?language=en-US`;
      options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTYzYmUxMmExMmNlMjYyMzU1MzlhOThhOTkzODcxZiIsIm5iZiI6MTczMTk4NDA2MS45NTQ0NDM1LCJzdWIiOiI2NzA1YWFiZmY0YjkxOWY4Mzk3Nzk0ZTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ceUvXQeK2ayGZJFLG1uLIldWq0N5AQpTS2mFimUyYeE",
        },
      };

      // fetch movie 2 data from TMDB
      fetch(url, options)
        .then((res) => res.json())
        .then((movie) => {
          html += `
            <div class="my-5">
              <span id="movie1title" class="is-size-4 has-text-weight-semibold">${movie.title}</span>
              <span id="movie1releasedate">${movie.release_date.slice(0, 4)}</span>
              <br />
              <div id="movie1genres">
          `;

          movie.genres.forEach((genre, i) => {
            html += `
              <span id="${genre.name}" class="is-size-7">${genre.name} ${i != movie.genres.length - 1 ? ", " : ""}</span>
            `;
          });

          html += `
              </div>
              <span id="movie1desc">${movie.overview}</span>
              <br />
              <span id="movie1imdb">
                <a id="movie1link" href="https://www.imdb.com/title/${movie.imdb_id}" target="#">IMDB Page</a>
              </span>
            </div>
          `;

          r_e("showtimeinfo").innerHTML = html;
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}

function getUpcoming(numShowings) {
  db.collection("showings")
    .where("nowplaying", "==", false)
    .orderBy("date")
    .limit(numShowings)
    .get()
    .then((data) => {
      let my_data = data.docs;
      let html = "";

      if (my_data.length != 0) {
        my_data.forEach((showing) => {
          let showingInfo = showing.data();

          if (numShowings == 1) {
            html += `
            <div class="column">
              <figure class="image is-2by3 moviepostersm ml-auto">
                <img
                  src="https://image.tmdb.org/t/p/original/${showingInfo.movie1.poster}"
                  alt="${showingInfo.movie1.title} - poster"
                  class="movieposterborder"
                />
              </figure>
            </div>
            
            <div class="column">
              <figure class="image is-2by3 moviepostersm mr-auto">
                <img
                  src="https://image.tmdb.org/t/p/original/${showingInfo.movie2.poster}"
                  alt="${showingInfo.movie2.title} - poster"
                  class="movieposterborder"
                />
              </figure>
            </div>
          `;
          } else {
            html += `
            <div class="column is-mobile has-text-centered">
              <div class="columns is-mobile">
                <div class="column">
                  <figure class="image is-2by3 moviepostersm ml-auto is-fullwidth">
                    <img
                      src="https://image.tmdb.org/t/p/original/${showingInfo.movie1.poster}"
                      alt="${showingInfo.movie1.title} - poster"
                      class="movieposterborder"
                    />
                  </figure>
                </div>

                <div class="column">
                  <figure class="image is-2by3 moviepostersm mr-auto is-fullwidth">
                    <img
                      src="https://image.tmdb.org/t/p/original/${showingInfo.movie2.poster}"
                      alt="${showingInfo.movie2.title} - poster"
                      class="movieposterborder"
                    />
                  </figure>
                </div>
              </div>

              <p>${showingInfo.date}</p>
            </div>
          `;
          }
        });
      } else {
        html += "<p class='has-text-centered mx-auto'>There are no upcoming movies</p>";
      }

      document.querySelectorAll(".upcomingshowings").forEach((div) => {
        div.innerHTML = html;
      });
    });
}

/* Makes a showing the new now playing */
function newNowPlaying(id) {
  // gets the current now playing showing
  db.collection("showings")
    .where("nowplaying", "==", true)
    .get()
    .then((data) => {
      let my_data = data.docs;

      // checks to see if there is a now playing
      if (my_data[0]) {
        configure_message("Please delete the current now playing before selecting a new now playing");
      } else {
        // if not, make the new one the now playing
        db.collection("showings")
          .doc(id)
          .update("nowplaying", true)
          .then(() => {
            getAllShowings();
          });
      }
    });
}

function getShowingByDate() {
  let selectedDate = r_e("dateselector").value;
  r_e("showingdate").innerHTML = selectedDate;

  db.collection("showings")
    .where("date", "==", selectedDate)
    .get()
    .then((data) => {
      let my_data = data.docs;

      if (my_data.length != 0) {
        my_data.forEach((showing) => {
          let showingInfo = showing.data();
          let html = "";

          getShowingDetails(showing);

          html += `
            <div class="column">
              <figure class="image is-2by3 movieposterlg ml-auto">
                <img
                  src="https://image.tmdb.org/t/p/original/${showingInfo.movie1.poster}"
                  alt="${showingInfo.movie1.title} - poster"
                  class="movieposterborder"
                />
              </figure>
            </div>
          `;

          html += `
            <div class="column">
              <figure class="image is-2by3 movieposterlg mr-auto">
                <img
                  src="https://image.tmdb.org/t/p/original/${showingInfo.movie2.poster}"
                  alt="${showingInfo.movie2.title} - poster"
                  class="movieposterborder"
                />
              </figure>
            </div>
          `;

          document.querySelectorAll(".nowplaying").forEach((div) => {
            div.innerHTML = html;
          });
        });
      } else {
        document.querySelectorAll(".nowplaying").forEach((div) => {
          div.innerHTML = "<p class='has-text-centered mx-auto'>There are no movies currently showing</p>";
        });

        r_e("showtimeinfo").innerHTML = "";

        if (r_e("reservespot")) {
          r_e("reservespot").classList.add("is-hidden");
        }
      }
    });
}

/* Date is stored in military, so this converts it for displaying to the page */
function convertMilitaryToNormalTime(militaryTime) {
  let [hours, minutes] = militaryTime.split(":").map(Number);

  let period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  if (hours === 0) {
    hours = 12;
  }

  minutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutes} ${period}`;
}

function reserveSpot(showing_id) {
  let options = document.querySelectorAll(".parkingOption"); // grabs all option tags in the select menu

  // goes through each option and checks if its selected
  options.forEach((option) => {
    if (option.selected) {
      // reservation data structure
      let reservation = {
        customer_email: auth.currentUser.email,
        showing: showing_id,
        parking_spot_number: option.value,
      };

      db.collection("parking_reservations")
        .where("showing", "==", showing_id)
        .where("parking_spot_number", "==", option.value)
        .get()
        .then((data) => {
          let my_data = data.docs;

          // checks to see if spot is already reserved
          if (my_data.length != 0) {
            // if spot is already reserved then display that message to the user
            r_e("reservationmodal").classList.remove("is-active");
            r_e("showings").classList.remove("is-clipped");
            option.selected = false;
            configure_message("Parking spot already reserved");
          } else {
            // if not then adds this new reservation to the db
            db.collection("parking_reservations")
              .add(reservation)
              .then(() => {
                r_e("reservationmodal").classList.remove("is-active");
                r_e("showings").classList.remove("is-clipped");
                option.selected = false;
                configure_message("Successfully reserved parking spot");
              });
          }
        });
    }
  });
}

function getMyReservations() {
  let html = "";

  db.collection("parking_reservations")
    .where("customer_email", "==", auth.currentUser.email)
    .get()
    .then((data) => {
      let my_data = data.docs;

      if (my_data.length != 0) {
        my_data.forEach((reservation) => {
          let reservationInfo = reservation.data();

          db.collection("showings")
            .doc(reservationInfo.showing)
            .get()
            .then((data_showings) => {
              let my_data_showings = data_showings.data();
              let showing = my_data_showings;

              html += `
                <tr>
                  <td>${showing.date}</td>
                  <td>${showing.movie1.title}</td>
                  <td>${showing.movie2.title}</td>
                  <td>${showing.time}</td>
                  <td>${reservationInfo.parking_spot_number}</td>
                  <td><button class="button" onClick="unreserveParkingSpot('${reservation.id}')">Unreserve</button></td>
                </tr>
              `;

              r_e("myreservations").innerHTML = html;
            })
            .catch((e) => {
              configure_message("Error getting your reservations, please try again");
            });
        });
      } else {
        html += `<tr class="has-text-centered">
          <td colspan="6">You have no reservations</td>
        </tr>`;
        r_e("myreservations").innerHTML = html;
      }
    });
}

function unreserveParkingSpot(res_id) {
  db.collection("parking_reservations")
    .doc(res_id)
    .delete()
    .then(() => {
      configure_message("Successfully unreserved parking spot", true);
      getMyReservations();
    });
}

function configure_message(msg) {
  let message = r_e("message-modal");
  let message_body = r_e("message-body");

  // show message on screen
  message.classList.add("is-active");

  // set the msg as innerHTML of the message bar
  message_body.innerHTML = msg;

  // after 4.5 seconds, message closes
  setTimeout(() => {
    message.classList.remove("is-active");
    message_body.innerHTML = "";
  }, 4500)
}

function configure_nav_bar(email) {
  let signedIns = document.querySelectorAll(".signedin");
  let signedOuts = document.querySelectorAll(".signedout");

  if (email) {
    signedIns.forEach((element) => {
      element.classList.remove("is-hidden");
    });
    signedOuts.forEach((element) => {
      element.classList.add("is-hidden");
    });
  } else {
    signedIns.forEach((element) => {
      element.classList.add("is-hidden");
    });
    signedOuts.forEach((element) => {
      element.classList.remove("is-hidden");
    });
  }
}

/* Initial Call to Populate Content */
/* Default is Home Page */
navHome();

// reservation close modal close functionality
r_e("message-modal-close").addEventListener("click", () => {
  let message = r_e("message-modal");
  let message_body = r_e("message-body");

  // hide message
  message.classList.remove("is-active");
  message_body.innerHTML = "";
});

/* Navigation Stuff */
r_e("navhomebrand").addEventListener("click", () => {
  navHome();
});

r_e("navhome").addEventListener("click", () => {
  navHome();
});

r_e("navshowings").addEventListener("click", () => {
  // shows main html structure of showings page
  r_e("main").innerHTML = div_showings;

  // if user is signed in
  if (auth.currentUser) {
    // show parking reservation button
    r_e("showtimecontent").innerHTML += `<input type="button" id="reservespot" class="button is-hidden" value="Reserve Your Parking Spot"/>`;
    r_e("reservespot").classList.remove("is-hidden");

    // reservation button on click functionality
    r_e("reservespot").addEventListener("click", () => {
      // show reservation modal
      r_e("reservationmodal").classList.add("is-active");
      r_e("showings").classList.add("is-clipped");

      // Modal close functionality
      let closeButtons = document.querySelectorAll(".closebutton");
      for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].addEventListener("click", () => {
          r_e("reservationmodal").classList.remove("is-active");
          r_e("showings").classList.remove("is-clipped");
          
          // resets selected seat to default
          let options = document.querySelectorAll(".parkingOption");
          options.forEach((option) => {
            option.selected = false;
          })
        });
      }
    });
  }

  getNowShowing("showings");
  getUpcoming(3);

  r_e("dateselector").addEventListener("change", () => {
    getShowingByDate();
  });

  hideNavbarBurger();
});

r_e("navabout").addEventListener("click", () => {
  // shows the about page
  r_e("main").innerHTML = div_about;
  hideNavbarBurger();
});

r_e("navsignin").addEventListener("click", () => {
  // shows the sign in page
  r_e("main").innerHTML = div_signin;

  // Sign In Button functionality
  r_e("signinSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    let email = r_e("emailSignin").value;
    let pass = r_e("passwordSignin").value;

    if (email && pass) {
      auth
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          // reset form
          r_e("emailSignin").value = "";
          r_e("passwordSignin").value = "";

          navHome();
        })
        .catch((err) => {
          if (
            err.message ==
            '{"error":{"code":400,"message":"INVALID_LOGIN_CREDENTIALS","errors":[{"message":"INVALID_LOGIN_CREDENTIALS","domain":"global","reason":"invalid"}]}}'
          ) {
            configure_message("Invalid login credentials");
          } else {
            configure_message("Error signing in: " + err.message);
          }
        });
    } else {
      configure_message("You must enter an email and password to sign in");
    }
  });

  // navigates to sign up page
  r_e("navsignup").addEventListener("click", () => {
    // shows the sign up page
    r_e("main").innerHTML = div_signup;

    // sign Up button (submit) functionality
    r_e("signupSubmit").addEventListener("click", (e) => {
      e.preventDefault();

      let email = r_e("emailSignup").value;
      let pass = r_e("passwordSignup").value;
      let confirmPass = r_e("confirmPasswordSignup").value;

      if (email && pass && confirmPass) {
        if (pass != confirmPass) {
          configure_message("Your passwords do not match");
        } else {
          auth
            .createUserWithEmailAndPassword(email, pass)
            .then(() => {
              // reset form
              r_e("emailSignup").value = "";
              r_e("passwordSignup").value = "";
              r_e("confirmPasswordSignup").value = "";

              navHome();
            })
            .catch((err) => {
              configure_message("Error creating a new account: " + err.message);
            });
        }
      } else {
        configure_message("You must enter an email, password, and the password again to sign up");
      }
    });
  });
  hideNavbarBurger();
});

r_e("navdropdown").addEventListener("click", () => {
  let dropdown = r_e("navaccount");

  // toggles dropdown visibility
  if (dropdown.classList.contains("is-active")) {
    dropdown.classList.remove("is-active");
  } else {
    dropdown.classList.add("is-active");

    // Manage Account Button Functionality
    r_e("navmanageaccount").addEventListener("click", () => {
      dropdown.classList.remove("is-active");

      // checks to see if user is admin
      db.collection("permissions")
        .where("uid", "==", auth.currentUser.uid)
        .get()
        .then((data) => {
          let my_data = data.docs;
          if (my_data.length != 0) {
            let perm = my_data[0].data().admin;

            if (perm) {
              // if user is admin, then display the admin page
              r_e("main").innerHTML = div_adminpage;

              // display content to admin
              getAllShowings();
              getMyReservations();

              // Handles value of checkbox
              r_e("nowplayingcheckbox").addEventListener("input", () => {
                newShowing.nowplaying = !newShowing.nowplaying;
              });

              // Movie Search Functionality
              r_e("search").addEventListener("input", () => {
                r_e("moviesearch").classList.add("is-active");

                // allows user to search for movies
                let searchText = r_e("search").value.replace(" ", "%20");

                // fetches movie results from TMDB
                const url = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`;
                const options = {
                  method: "GET",
                  headers: {
                    accept: "application/json",
                    Authorization:
                      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTYzYmUxMmExMmNlMjYyMzU1MzlhOThhOTkzODcxZiIsIm5iZiI6MTczMTk4NDA2MS45NTQ0NDM1LCJzdWIiOiI2NzA1YWFiZmY0YjkxOWY4Mzk3Nzk0ZTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ceUvXQeK2ayGZJFLG1uLIldWq0N5AQpTS2mFimUyYeE",
                  },
                };

                fetch(url, options)
                  .then((res) => res.json())
                  .then((json) => {
                    r_e("searchResults").innerHTML = "";
                    json["results"].forEach((movie) => {
                      let html = "";
                      html += `<tr>
                    
                      <div class="dropdown-item">`;

                      if (movie.poster_path) {
                        html += `
                          <td>
                            <figure class="image is-2by3 moviepostersm">
                              <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="${movie.title} poster" class="movieposterborder" />
                            </figure>
                          </td>
                        `;
                      }

                      html += `<td><span class="is-size-6 has-text-weight-medium" ${movie.poster_path ? null : "colspan='2'"}>${
                        movie.title
                      }</span></td>
                        <td>
                          <button class="button has-background-warning" onClick="selectMovie(1, '${movie.title}', ${movie.id}, '${
                        movie.poster_path
                      }')">1</button>
                          <button class="button has-background-info" onClick="selectMovie(2, '${movie.title}', ${movie.id}, '${
                        movie.poster_path
                      }')">2</button>
                        </td>
                      </div>
                    <tr>`;

                      r_e("searchResults").innerHTML += html;
                    });
                  })
                  .catch((err) => console.error(err));
              });
            } else {
              configure_message("SERIOUS PROBLEM: user permission found but not admin. Please alert a drive in employee of this error, thank you.");
            }
          } else {
            // if user is not admin, display customer page
            r_e("main").innerHTML = div_customerpage;
            getMyReservations();
          }
        });
    });

    // Sign Out Button Functionality
    r_e("navsignout").addEventListener("click", () => {
      let dropdown = r_e("navaccount");

      auth.signOut().then(() => {
        dropdown.classList.remove("is-active");
        navHome();
      });
    });
  }
});

r_e("navbarBurger").addEventListener("click", () => {
  toggleNavbarBurger();
});

function toggleNavbarBurger() {
  const target = r_e("navbarBurger").dataset.target;
  const $target = document.getElementById(target);

  r_e("navbarBurger").classList.toggle("is-active");
  $target.classList.toggle("is-active");
}

function hideNavbarBurger() {
  const target = r_e("navbarBurger").dataset.target;
  const $target = document.getElementById(target);

  r_e("navbarBurger").classList.remove("is-active");
  $target.classList.remove("is-active");
}

auth.onAuthStateChanged((user) => {
  if (user) {
    r_e("current_user").innerHTML = auth.currentUser.email;

    configure_nav_bar(auth.currentUser.email);
  } else {
    r_e("current_user").innerHTML = "";

    configure_nav_bar();
  }
});
/* End Navigation Stuff */
