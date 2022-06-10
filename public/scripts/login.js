/*
Login function checks whether a username and password is supplied via the users,
and then posts these to the login route.
Depending on the status returned by the route, the function displays the login
result, and changes the url accordingly
*/
function login()
{
    //Aquire login_result text, and username and password fields
    let username = document.getElementById("l_username").value;
    let password = document.getElementById("l_password").value;

    //Check whether either field is blank
    if (username == "" || password == "")
    {
        showAlert("Please enter both a username and password");

        //Makes them go red
        document.getElementById("l_username").classList.add("error");
        document.getElementById("l_password").classList.add("error");
        return;
    }
    else
    {
        //Create array for post request
        let login = {user_name: username, password: password};

        //Create ajax request
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function()
        {
            if(this.readyState == 4){
            if (this.status == 200)
            {
                console.log('Logged in');
                location.href = "/";
            }
            else if (this.status == 401)
            {
                showAlert("Incorrect username and/or password");

                //Makes them go red
                document.getElementById("l_username").classList.add("error");
                document.getElementById("l_password").classList.add("error");
            }
            else if (this.status == 400)
            {
                showAlert('Improper Login Form');

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
}

//Function checks whether input email is in valid formatting
function checkEmail(email)
{
    var regular_ex = /\S+@\S+\.\S+/;
    return regular_ex.test(email);
}

/*
Signup function checks whether a username, password, firstname, lastname, and email
is supplied via the users, and then posts these to the signup route.
Depending on the status returned by the route, the function displays the signup
result, and changes the url accordingly
*/
function signup()
{
    //Aquire all the fields required for the signup route
    //and the signup result text placeholder
    let username = document.getElementById("s_username").value;
    let firstname = document.getElementById("s_fname").value;
    let lastname = document.getElementById("s_lname").value;
    let password = document.getElementById("s_password").value;
    let email = document.getElementById("s_email").value;
    let signup_result = document.getElementById("signup_result");

    //Check that none of the fields are blank
    if (username == "" || firstname == "" || lastname == "" || password == "" || email == "")
    {
        signup_result.innerText = "Please fill out all of the fields";
        return;
    }
    //Check that password is corrrect length
    if (password.length < 8 || password.length > 256)
    {
        signup_result.innerText = "Please enter a password of length between 8 and 256 characters";
        return;
    }
    //Check valid email inputted
    if (!checkEmail(email) || email.length > 255)
    {
        signup_result.innerText = "Please enter a valid email address";
        return;
    }
    //Check username is correct length
    if (username.length > 36)
    {
        signup_result.innerText = "Please enter a username shorther than 36 characters";
        return;
    }
    //Check firstname is correct length
    if (firstname.length > 32)
    {
        signup_result.innerText = "Please enter a firstname shorther than 32 characters";
        return;
    }
    //Check username is correct length
    if (lastname.length > 36)
    {
        signup_result.innerText = "Please enter a lastname shorther than 50 characters";
        return;
    }
    //If all checks have passed, create array for post request and send request
    let signup = {
        user_name: username,
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password
    };
    //Create ajax request
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            //Successful sign up so update text and redirect user
            signup_result.innerText = "Signed UP"
            location.href = "/"
        }
        else if (this.status == 403)
        {
            //403 denotes username already exits in database
            signup_result.innerText = "Username Exists"
        }
        else if (this.status == 400)
        {
            //400 denotes incorrect signup form which shouldnt occur due to prior checks
            signup_result.innerText = "Inproper Signup Form"
        }
    };
    xhttp.open("POST","/signup");
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify(signup));
}

/*
Function checks for invite code and sends the code to the
external invitee route which checks whether the code is
valid and then returns the url for the event which the
user is invited to
*/
function codeLogin()
{
    //Aquire code from the input field and create the get request parameter
    let code = document.getElementById("invite_code").value;
    let param = `?event_code=${code}`;
    //Aquire the invite code text placeholder
    let code_result = document.getElementById("code_result");
    //If no code provided
    if (code == "")
    {
        code_result.innerText = "Please Enter A Code";
        return;
    }
    else
    {
        //Create AJAX requets
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function()
        {
            if(this.readyState == 4){
                if (this.status == 200)
                {
                    //If sucessful request, redirect user to the invited event
                    location.href = this.response;
                }
                else if (this.status == 403)
                {
                    //403 denotes the invite code is not valid
                    code_result.innerText = "Incorrect Code";
                    showAlert("Incorrect Code");

                    document.getElementById("invite_code").classList.add("error");
                }
                else if (this.status == 400)
                {
                    //400 denotes no input code was provided which should occur due to prior check
                    code_result.innerText = "Please Enter A Code";
                    showAlert("Please Enter A Code");

                    document.getElementById("invite_code").classList.add("error");
                }
            }
        };
        xhttp.open("GET", "/externalInvitee"+param, true);
        xhttp.send();
    }
}
