function login()
{
    console.log('Logging in')
    let username = document.getElementById("l_username").value;
    let password = document.getElementById("l_password").value;
    let login = {user_name: username, password: password};
    let login_result = document.getElementById("login_result");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log('Logged in');
            login_result.innerText = "Logged in"
            location.href = "/"
        }
        else if (this.status == 401)
        {
            console.log('Incorrect username/password')
            login_result.innerText = "Incorrect username/password"
        }
        else if (this.status == 400)
        {
            console.log('Improper Login Form')
            login_result.innerText = "Improper Login Form"
        }
    };

    xhttp.open("POST","/login");
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify(login));
}

function signup()
{
    console.log('Signing up');
    let username = document.getElementById("s_username").value;
    let firstname = document.getElementById("s_fname").value;
    let lastname = document.getElementById("s_lname").value;
    let password = document.getElementById("s_password").value;
    let email = document.getElementById("s_email").value;
    let signup = {
        user_name: username,
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password
    };
    console.log(signup);
    let signup_result = document.getElementById("signup_result");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log('Signed Up');
            signup_result.innerText = "Signed UP"
            location.href = "/"
        }
        else if (this.status == 403)
        {
            console.log('Username Exists')
            signup_result.innerText = "Username Exists"
        }
        else if (this.status == 400)
        {
            console.log('Inproper Signup Form')
            signup_result.innerText = "Inproper Signup Form"
        }
    };

    xhttp.open("POST","/signup");
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify(signup));

}
