let vueinst = new Vue({

    el: "#app",
    data: {
        email: ""
    },
    methods: {
        generateCode: function(){

            console.log(this.email);

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    showAlert("Code sent to ");
                }
            }

            xhttp.open("POST", "/api/forgottenPassword/code", true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({email: this.email}));

        }

    }

});