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
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function()
  {
      if (this.readyState == 4 && this.status == 200)
      {
        location.href = "/login"
      }
  };
  xhttp.open("GET","/logout");
  xhttp.send();

}

var first_name = "";
var loggedIn = false;
function getUser()
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function()
  {
      if (this.readyState == 4 && this.status == 200)
      {
        first_name=this.responseText;
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
  if (first_name == "GUEST")
  {
    nav.innerHTML += `
  <nav>
    <ul class="navBar">
        <li class="navBarElementContainerText">RSVP</li>
    </ul>
  </nav>
  <nav>
    <ul class="navBar">
        <li class="navBarElementContainer"><button onclick="loginButton()">Sign Up</button></li>
    </ul>
  </nav>`;
  }
  else
  {
    nav.innerHTML += `
  <nav>
    <ul class="navBar">
        <li class="navBarElementContainerText">RSVP</li>
        <li class="navBarElementContainerText"><a href="/events" class="navBarElement">Home</a></li>
        <li class="navBarElementContainerText"><a href="/friends" class="navBarElement">Friends</a></li>

    </ul>
  </nav>
  <nav>
    <ul class="navBar">
        <li class="navBarElementContainer"><a href="/newevent" title="Create new event"><i href="#" class="icon fa-solid fa-plus"></i></a></li>
        <li class="navBarElementContainer"><a href="/notifications" title="Go to notifications page"><i class="icon fa-solid fa-bell"></i></a></li>
        <li class="navBarElementContainer"><a href="/calendar" title="Go to calendar"><i class="icon fa-solid fa-calendar-days"></i></a></li>
        <li class="navBarElementContainerText" style="padding-right: 5px"><p id="user_name_placeholder"></p></li>
        <li class="navBarElementContainer dropdown" style="padding-left: 0px"><i onclick="dropdown()" class="pointer fa-solid fa-circle-user dropdown"></i></a></li>
    </ul>
  </nav>
  <ul style="list-style-type: none" id="dropdownContent" class="dropdown-content dropdown">
        <li><a href="/account" class="dropdown">Edit account</a></li>
        <li><a href="/logout" class="dropdown">Log out</a></li>
  </ul>`;
  let placeholder = document.getElementById("user_name_placeholder");
  placeholder.innerText = `${first_name}`;
  };
}
window.addEventListener("load", getUser);