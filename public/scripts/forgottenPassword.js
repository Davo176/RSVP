let vueinst = new Vue({

    el: "#app",
    data: {
        userName: "",
        userNameOnSubmit: "",
        code: "",
        newPassword: "",
        definiteUser_name: ""
    },
    methods: {
        generateCode: function(){

            vueinst.userNameOnSubmit = vueinst.userName;

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if(this.readyState == 4){

                    if(this.status == 200){

                        let xhttp2 = new XMLHttpRequest();
                        xhttp2.onreadystatechange = function(){
                            if(this.readyState == 4 && this.status == 200){



                                showAlert("email sent to " + JSON.parse(this.responseText)[0]);

                                vueinst.definiteUser_name = vueinst.userNameOnSubmit;
                            }
                        }

                        xhttp2.open("POST", "/api/forgottenPassword/sendEmail", true);
                        xhttp2.setRequestHeader("Content-type", "application/json");
                        console.log(vueinst.userNameOnSubmit);
                        xhttp2.send(JSON.stringify({user_name: vueinst.userNameOnSubmit}));

                    } else {
                        showAlert("Invalid username");

                        document.getElementById("userName").classList.add("error");
                    }
                }
            }

            xhttp.open("POST", "/api/forgottenPassword/generateCode", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({user_name: vueinst.userNameOnSubmit}));

        },
        updatePassword: function(){

            let passwordNode = document.getElementById("password");
            let passwordRepeatNode = document.getElementByIs("passwordRepeat");

            if(password.value != passwordRepeat.value){

                showAlert("Passwords must match");

                passwordNode.classList.add("error");
                passwordNode.classList.add("error");

            } else {

                let xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = function(){
                    if(this.readyState == 4 && this.status == 200){
                        showAlert("Password updated");
                    }
                }

                xhttp.open("POST", "/api/forgottenPassword/checkCode", true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send(JSON.stringify({code: vueinst.code, newPassword: vueinst.newPassword, user_name: vueinst.definiteUser_name}));

            }

        }

    }

});