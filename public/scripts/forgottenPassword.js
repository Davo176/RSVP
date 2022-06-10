let vueinst = new Vue({

    el: "#app",
    data: {
        userName: "",
        code: "",
        newPassword: "",
    },
    methods: {
        generateCode: function(){

            // toggleLoad();

            //vueinst.userName = vueinst.userName;

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if(this.readyState == 4){

                    if(this.status == 200){

                        let xhttp2 = new XMLHttpRequest();
                        xhttp2.onreadystatechange = function(){
                            if(this.readyState == 4 && this.status == 200){

                                showAlert("email sent to " + JSON.parse(this.responseText)[0]);

                                //vueinst.userName = vueinst.userName;
                            }
                        };

                        xhttp2.open("POST", "/api/forgottenPassword/sendEmail", true);
                        xhttp2.setRequestHeader("Content-type", "application/json");
                        xhttp2.send(JSON.stringify({user_name: vueinst.userName}));

                    } else {
                        showAlert("User not recognised");

                        document.getElementById("userName").classList.add("error");
                    }
                }
            };

            xhttp.open("POST", "/api/forgottenPassword/generateCode", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({user_name: vueinst.userName}));

            // toggleLoad();

        },
        updatePassword: function(){

            let passwordNode = document.getElementById("password");
            let passwordRepeatNode = document.getElementById("passwordRepeat");

            if(passwordNode.value != passwordRepeatNode.value){

                showAlert("Passwords must match");

                passwordNode.classList.add("error");
                passwordNode.classList.add("error");

            } else {

                let xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = function(){
                    if(this.readyState == 4){

                        if(this.status == 200){
                            showAlert("Password updated");
                        }
                        else if(this.status == 401){
                            showAlert("Incorrect code and/or username");

                            document.getElementById("code").classList.add("error");
                            document.getElementById("userName").classList.add("error");
                        }
                    }
                };

                xhttp.open("POST", "/api/forgottenPassword/updatePassword", true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send(JSON.stringify({code: vueinst.code, newPassword: vueinst.newPassword, user_name: vueinst.userName}));

            }

        }

    }

});