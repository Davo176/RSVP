function login()
{
    console.log('Logging in')
    let username = document.getElementById("l_username").value;
    let password = document.getElementById("l_password").value;
    let login = {username: username, password: password};
    let login_result = document.getElementById("login_result");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log('Logged in');
            login_result.innerText = "Logged in"
        }
        else if (this.status == 401)
        {
            console.log('Incorrect username/password')
            login_result.innerText = "Incorrect username/password"
        }
        else if (this.status == 400)
        {
            console.log('Inproper Login Form')
            login_result.innerText = "Inproper Login Form"
        }
    };

    xhttp.open("POST","/login");
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify(login));
}

function signup()
{

}