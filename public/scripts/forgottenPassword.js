let vueinst = new Vue({

    el: "#app",
    data: {
        email: ""
    },
    methods: {
        generateCode: function(){

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    showAlert("Code sent to " + this.responseText);
                }
            }

            xhttp.open("GET", "/api/forgottenPassword/code", true);
            xhttp.send();

        }

    }

});