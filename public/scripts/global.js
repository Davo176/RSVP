function homeButton () {
  alert("You pressed the home button");
  location.href = "home.html"
}

function friendsButton () {
  alert("You pressed the friends button");
  location.href = "friends.html"
}

function eventsButton () {
  alert("You pressed the events button");
  location.href = "myEvents.html"
}

function signUpButton () {
  alert("You pressed the sign up button");
}

function loginButton () {
  alert("You pressed the login button");
}

function calendarButton () {
  alert("You pressed the calendar button");
  location.href = "calendar.html"
}

function notificationButton () {
  alert("You pressed the notification button");
  location.href = "notifications.html"
}

function createPostButton () {
  alert("You pressed the create post button");
}

function acceptInvite () {
  alert("You accepted your invite");
}

function maybeInvite () {
  alert("You set your invite status to maybe");
}

function declineInvite () {
  alert("You declined your invite");
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
      <li style="padding-right: 0;"><input class="search" type="text" v-model="search_text" placeholder="Search.."></li>
      <li style="padding-left: 0;"><i href="#" class="icon fa-solid fa-magnifying-glass" v-on:click="search"></i></li>
      <li><i href="#" class="icon fa-solid fa-plus" onclick="createPostButton()"></i></li>
      <li><i href="#" class="icon fa-solid fa-bell" onclick="notificationButton()"></i></li>
      <li><i href="#" class="icon fa-solid fa-calendar-days" onclick="calendarButton()"></i></li>
      <li><button onclick="loginButton()">Log in</button></li>
      <li><button onclick="signUpButton()">Sign up</button></li>
  </ul>
</nav>`;
}
window.addEventListener("load", updateNav);