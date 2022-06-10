var vueInst = new Vue({
    el: '#app',
    data: {
        currentFirstName: "",
        currentLastName: "",
        currentEmail: "",
        currentEmailSettingFinalise: 0,
        currentEmailSettingCancel: 0,
        currentEmailSettingResponse: 0,
    },
    methods: {
        changePassword: function(){

            let newPasswordNode = document.getElementById("newPassword");
            let newPasswordRepeatNode = document.getElementById("newPasswordRepeat");

            let newPassword = newPasswordNode.value;
            let newPasswordRepeat = newPasswordRepeatNode.value;

            if(newPassword !== newPasswordRepeat){

                //Change colour of box until clicked and display error
                newPasswordNode.classList.add("error");
                newPasswordRepeatNode.classList.add("error");

                showAlert("Passwords must match");
            }
            else{

                let xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = function(){
                    if(this.readyState == 4){

                        if(this.status == 200){
                            showAlert("Password succefully changed");
                        }

                        if(this.status == 401){

                            document.getElementById("oldPassword").classList.add("error");
                            showAlert("Incorrect password");
                        }

                        if(this.status == 400){
                            showAlert("Bad form");
                        }
                    }
                }

                let oldPassword = document.getElementById("oldPassword").value;

                xhttp.open("POST","api/account/updatePassword");
                xhttp.setRequestHeader("Content-type","application/json")
                xhttp.send(JSON.stringify({oldPassword: oldPassword, newPassword: newPassword}));

            }
        },
        updateUser: function(field){

            //send a request to update a users fields
            let newFieldValue = document.getElementById(field).value;
            let reqBody = JSON.stringify({"newFieldValue": newFieldValue, "field": field});

            if(newFieldValue > )

            let xhttp2 = new XMLHttpRequest();

            xhttp2.onreadystatechange = function(){

                if(this.readyState == 4 && this.status == 200){
                    //console.log("updated " + field + " to " + newFieldValue);
                }
            }

            xhttp2.open("POST", "api/account/updateinfo", true);
            xhttp2.setRequestHeader('Content-type', 'application/json');
            xhttp2.send(reqBody);
        },
        updateEmailSettings: function(field,newValue){
            //send a request to update email settings
            let reqBody = JSON.stringify({"newState": newValue, "setting": field});

            let xhttp2 = new XMLHttpRequest();
            let vueReference = this;
            xhttp2.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    vueReference.getEmailSettings();
                }
            }

            xhttp2.open("POST", "api/account/updateEmailSettings", true);
            xhttp2.setRequestHeader('Content-type', 'application/json');
            xhttp2.send(reqBody);
        },
        getEmailSettings: function(){
            //get users current email settings
            let xhttp = new XMLHttpRequest();
            let vueReference = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    for (let setting of JSON.parse(this.responseText)){
                        if (setting.setting_name === "cancel"){
                            vueReference.currentEmailSettingCancel = setting.setting_state
                        }
                        if (setting.setting_name === "finalise"){
                            vueReference.currentEmailSettingFinalise = setting.setting_state
                        }
                        if (setting.setting_name === "response"){
                            vueReference.currentEmailSettingResponse = setting.setting_state
                        }
                    }
                }
            };
            xhttp.open("GET",`/api/account/emailSettings`,true);
            xhttp.send();
        }
    },
    created: function(){
        //sets the maxlength attributes of the fields based on the max length specified in the database
        this.getEmailSettings();
        let xhttp2 = new XMLHttpRequest();
        let vueReference = this;
        xhttp2.onreadystatechange = function(req, res){
            if(this.readyState == 4 && this.status == 200){

                //Formats the data into a JSON array
                object = JSON.parse(this.responseText);
                object = JSON.parse(object[0]["JSON_OBJECTAGG(COLUMN_NAME, CHARACTER_MAXIMUM_LENGTH)"]);

                user_nameMax = object["user_name"];
                first_nameMax = object["first_name"];
                last_nameMax = object["last_name"];
                emailMax = object["email"];

                document.getElementById("first_name").setAttribute("maxlength", first_nameMax);
                document.getElementById("last_name").setAttribute("maxlength", last_nameMax);
                document.getElementById("email").setAttribute("maxlength", emailMax);

                document.getElementById("maxLengthFirstName").innerText = "Max length: " + first_nameMax + " characters";
                document.getElementById("maxLengthLastName").innerText = "Max length: " + last_nameMax + " characters";
                document.getElementById("maxLengthEmail").innerText = "Max length: " + emailMax + " characters";

            }
        }

        xhttp2.open("GET", 'api/account/getfieldlengths', true);
        xhttp2.send();
        //puts users current info into the appropriate fields
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(req, res){
            if(this.readyState == 4 && this.status == 200){

                let user = JSON.parse(this.responseText);

                document.getElementById("user_name").innerText = user[0]["user_name"];
                document.getElementById("first_name").value = user[0]["first_name"];
                document.getElementById("last_name").value = user[0]["last_name"];
                document.getElementById("email").value = user[0]["email"];

            }
        }
        xhttp.open("GET", 'api/account/getuserinfo');
        xhttp.send();
    }
})