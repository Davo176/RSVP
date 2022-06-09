let vueinst = new Vue({

    el: "#app",
    data: {
        userName: "",
        userNameOnSubmit: ""
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
                                showAlert("email sent to " + this.responseText);
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

        }

    }

});