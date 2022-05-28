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

function loginButton ()
{
  alert("You pressed the login button");
  location.href = "/login.html"
}

var user_name = "";
var loggedIn = false;
function getUser() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function()
  {
      if (this.readyState == 4 && this.status == 200)
      {
        console.log(this.responseText);
        user_name=this.responseText;
        loggedIn = true;
      }
  };
  xhttp.open("GET","/user");
  xhttp.send();
}
getUser();

function updateNav () {
  var nav = document.getElementById('Nav');
  if (user_name == "")
  {
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
        <li class="navBarElementContainer"><button onclick="loginButton()">Login</button></li>
    </ul>
  </nav>`;
  }
  else
  {
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
        <li class="navBarElementContainerText" style="padding-right: 5px"><p>${user_name}</p></li>
        <li class="navBarElementContainer" style="padding-left: 0px"><a href="/account"><i class="fa-solid fa-circle-user"></i></a></li>
    </ul>
  </nav>`;
  }

}
window.addEventListener("load", updateNav);