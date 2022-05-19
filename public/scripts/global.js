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
      <li class="navBarElementContainerText"><button >RSVP</button></li>
      <li class="navBarElementContainerText"><a href="/home" class="navBarElement">Home</a></li>
      <li class="navBarElementContainerText"><a href="/friends" class="navBarElement">Friends</a></li>
      <li class="navBarElementContainerText"><a href="/events" class="navBarElement">My Events</a></li>
  </ul>
</nav>
<nav>
  <ul class="navBar">
      <li class="navBarElementContainer" style="padding-right: 0;"><input class="search" type="text" placeholder="Search.."></li>
      <li class="navBarElementContainer"><a href="/newevent"><i href="#" class="icon fa-solid fa-plus"></i></a></li>
      <li class="navBarElementContainer"><a href="/notifications"><i class="icon fa-solid fa-bell"></i></a></li>
      <li class="navBarElementContainer"><a href="/calendar"><i class="icon fa-solid fa-calendar-days"></i></a></li>
      <li class="navBarElementContainer"><button onclick="loginButton()">Log in</button></li>
      <li class="navBarElementContainer"><button onclick="signUpButton()">Sign up</button></li>
  </ul>
</nav>`;
}
window.addEventListener("load", updateNav);