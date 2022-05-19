function homeButton () {
  location.href = "home"
}

function friendsButton () {
  location.href = "friends"
}

function eventsButton () {
  location.href = "events"
}

function signUpButton () {
  alert("You pressed the sign up button");
}

function loginButton () {
  alert("You pressed the login button");
}

function updateNav () {
  var nav = document.getElementById('Nav');
  nav.innerHTML += `
<nav>
  <ul class="navBar">
      <li><button >RSVP</button></li>
      <li><button onclick="homeButton()">Home</button></li>
      <li><button onclick="friendsButton()">Friends</button></li>
      <li><button onclick="eventsButton()">My Events</button></li>
  </ul>
</nav>
<nav>
  <ul class="navBar">
      <li style="padding-right: 0;"><input class="search" type="text" placeholder="Search.."></li>
      <li style="padding-left: 0;"><i href="#" class="icon fa-solid fa-magnifying-glass"></i></li>
      <li><i href="#" class="icon fa-solid fa-plus"></i></li>
      <li><i href="#" class="icon fa-solid fa-bell"></i></li>
      <li><i href="#" class="icon fa-solid fa-calendar-days"></i></li>
      <li><button onclick="loginButton()">Log in</button></li>
      <li><button onclick="signUpButton()">Sign up</button></li>
  </ul>
</nav>`;
}
window.addEventListener("load", updateNav);