let vueinst = new Vue({

    el: "#app",
    data: {
        userName: "",
        userNameOnSubmit: ""
    },
    methods: {
        generateCode: function(){

            this.userNameOnSubmit = userName;

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if(this.readyState == 4){
                    if(this.status == 200){

                        showAlert("code stored in database");

                    } else {
                        showAlert("Invalid username");

                        document.getElementById("userName").classList.add("error");
                    }
                }
            }

            xhttp.open("POST", "/api/forgottenPassword/generateCode", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({user_name: this.userName}));

        }

    }

});