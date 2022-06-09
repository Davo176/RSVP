let vueinst = new Vue({

    el: "#app",
    data: {
        userName: ""
    },
    methods: {
        generateCode: function(){

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if(this.readyState == 4){
                    if(this.status == 200){

                    } else {
                        showAlert("");
                    }
                }
            }

            xhttp.open("POST", "/api/forgottenPassword/generateCode", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({user_name: this.userName}));

        }

    }

});