function homeButton () {
  location.href = "home"
}

function friendsButton () {
  location.href = "friends"
}

function eventsButton () {
  location.href = "events"
}

function loginButton ()
{
  location.href = "/login"
}

var user_name = "";
var loggedIn = false;
function getUser() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function()
  {
      if (this.readyState == 4 && this.status == 200)
      {
        user_name=this.responseText;
        loggedIn = true;
        updateNav()
      }
  };
  xhttp.open("GET","/user");
  xhttp.send();
}

function dropdown(){ //tutorial from https://www.w3schools.com/howto/howto_js_dropdown.asp
  document.getElementById("dropdownContent").classList.toggle("show");
}

window.onclick = function(event){
  if(!event.target.matches('.dropdown')){
      document.getElementById("dropdownContent").classList.remove("show");
  }
}

function updateNav () {
  var nav = document.getElementById('Nav');
  if (user_name == "")
  {
    nav.innerHTML += `
  <nav>
    <ul class="navBar">
        <li class="navBarElementContainerText"><button >RSVP</button></li>
        <li class="navBarElementContainerText"><a href="/events" class="navBarElement">Home</a></li>
        <li class="navBarElementContainerText"><a href="/friends" class="navBarElement">Friends</a></li>
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
        <li class="navBarElementContainerText"><a href="/events" class="navBarElement">Home</a></li>
        <li class="navBarElementContainerText"><a href="/friends" class="navBarElement">Friends</a></li>
    </ul>
  </nav>
  <nav>
    <ul class="navBar">
        <li class="navBarElementContainer" style="padding-right: 0;"><input class="search" type="text" placeholder="Search.."></li>
        <li class="navBarElementContainer"><a href="/newevent"><i href="#" class="icon fa-solid fa-plus"></i></a></li>
        <li class="navBarElementContainer"><a href="/notifications"><i class="icon fa-solid fa-bell"></i></a></li>
        <li class="navBarElementContainer"><a href="/calendar"><i class="icon fa-solid fa-calendar-days"></i></a></li>
        <li class="navBarElementContainerText" style="padding-right: 5px"><p>${user_name}</p></li>
        <li class="navBarElementContainer dropdown" style="padding-left: 0px"><button class="dropbtn dropdown" onclick="dropdown()"><i class="fa-solid fa-circle-user dropdown"></i></a></li>
    </ul>
  </nav>
  <ul style="list-style-type: none" id="dropdownContent" class="dropdown-content dropdown">
        <li><a href="/account" class="dropdown">Edit account</a></li>
        <li><a href="/logout" class="dropdown">Log out</a></li>
  </ul>`;
  }

}

window.addEventListener("load", getUser);