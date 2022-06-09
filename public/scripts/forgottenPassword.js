let vueinst = new Vue({

    el: "#app",
    methods: {
        generateCode: function(){

            let xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    showAlert("Code sent to inbox");
                }
            }

            xhttp.open("GET", "/api/forgottenPassword/code", true);
            xhttp.send();

        }

    }

});