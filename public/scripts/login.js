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
        if(this.readyState == 4){
            if (this.status == 200)
            {
                console.log('Logged in');
                login_result.innerText = "Logged in";
                location.href = "/";
            }
            else if (this.status == 401)
            {
                showAlert("Incorrect username and/or password");
                login_result.innerText = "Incorrect username and/or password";

                //Makes them go red
                document.getElementById("l_username").classList.add("error");
                document.getElementById("l_password").classList.add("error");
            }
            else if (this.status == 400)
            {
                showAlert('Improper Login Form');
                login_result.innerText = "Improper Login Form";

                //Makes them go red
                document.getElementById("l_username").classList.add("error");
                document.getElementById("l_password").classList.add("error");
            }
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

function codeLogin()
{
    console.log('Event code login');
    let code = document.getElementById("invite_code").value;
    let param = `?event_code=${code}`;
    let code_result = document.getElementById("code_result");
    if (code == "")
    {
        code_result.innerText = "Please Enter A Code";
        return;
    }
    else
    {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) {
                location.href = this.response;
            }
            else if (this.status == 403) {
                code_result.innerText = "Incorrect Code";
            }
            else if (this.status == 400) {
                code_result.innerText = "Please Enter A Code";
            }
        };
        xhttp.open("GET", "/externalInvitee"+param, true);
        xhttp.send();
    }
}
