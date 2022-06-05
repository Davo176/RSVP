function inviteExternal()
{
    let container = document.getElementsByClassName("externalUserContainer")[0];
    if (container.style.display === "none") {
        container.style.display = "block";
      } else {
        container.style.display = "none";
      }
}

function generateLink()
{
    let firstname = document.getElementById("fname").value;
    let lastname = document.getElementById("lname").value;
    let signup = {
        first_name: firstname,
        last_name: lastname,
    };
    let link = document.getElementById("link");
    let linkText = document.getElementById("linkText");
    if (firstname == "" || lastname == "")
    {
        linkText.innerText = "Please enter a valid first and/or last name";
        linkText.style.display = "block";
        return;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log('Invited external user');
            linkText.innerText = "Please send this code to the invitee so they can view the event and update their atending status:";
            linkText.style.display = "block";
            link.innerText = "Invite code: " + this.response;
            link.style.display = "block";
        }
    };

    xhttp.open("POST","/api/events/invite",true);
    xhttp.setRequestHeader("Content-type","application/json")
    xhttp.send(JSON.stringify(signup));

    //Invite user to event
}


var vueinst = new Vue({
    el: '#app',
    data: {
        imagePreURL: '/images/userUploads/',
        event: {Image: 'test.jpg'},
        people: {},
        areAdmin: false,
        adminInfo: {},
        adminOpen: false,
        goingOpen: false,
        pendingOpen: false,
        notGoingOpen: false,
        friendOpen: false,
        options: ["Going","Unsure","Not Going"],
        newStatus: "",
        notInvitedFriends: [],
        editMode: false,
        newTitle: "",
        newDescription: "",
        newAddress: "",
        newTime: "",
        newDate: "",
    },
    methods: {
        test: function(){
            let reqBody = JSON.stringify({event_id: this.event.event_id,status: this.newStatus});
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.getEventInfo(vueReference.event.event_id);
                    vueReference.getPeople(vueReference.event.event_id);
                }
            };

            xhttp.open("POST","/api/events/updateStatus",true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhttp.send(reqBody);
        },
        getEventInfo: function(eventID){
            let xhttp = new XMLHttpRequest();
            let vueReference = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.event = JSON.parse(this.responseText)[0];
                    vueReference.newStatus = vueReference.event.AttendingStatus;
                }
            };
            xhttp.open("GET",`/api/events/info?event_id=${eventID}`,true);
            xhttp.send();
        },
        getPeople: function(eventID){
            let xhttp = new XMLHttpRequest();
            let vueReference = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.people = JSON.parse(this.responseText);
                }
            };
            xhttp.open("GET",`/api/events/people?event_id=${eventID}`,true);
            xhttp.send();
        },
        checkAdmin: function(eventID){
            let xhttp = new XMLHttpRequest();
            let vueReference = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    if (this.responseText=="False"){
                        vueReference.areAdmin=false;
                    }else{
                        vueReference.areAdmin=true;
                        vueReference.adminInfo = this.responseText;
                    }
                }
            };
            xhttp.open("GET",`/api/events/areAdmin?event_id=${eventID}`,true);
            xhttp.send();
        },
        toggleEditMode: function(){
            this.editMode = !this.editMode;
        },
        changeTitle: function(){
            let reqBody = JSON.stringify({event_id: this.event.event_id,title: this.newTitle});
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.getEventInfo(vueReference.event.event_id);
                }
            };
            xhttp.open("POST","/api/events/change/title",true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhttp.send(reqBody);
        },
        changeDate: function(){
            let reqBody = JSON.stringify({event_id: this.event.event_id,date: this.newDate});
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.getEventInfo(vueReference.event.event_id);
                }
            };
            xhttp.open("POST","/api/events/change/date",true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhttp.send(reqBody);
        },
        changeTime: function(){
            let reqBody = JSON.stringify({event_id: this.event.event_id,time: this.newTime});
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.getEventInfo(vueReference.event.event_id);
                }
            };
            xhttp.open("POST","/api/events/change/time",true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhttp.send(reqBody);
        },
        changeAddress: function(){
            let reqBody = JSON.stringify({event_id: this.event.event_id,address: this.newAddress});
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.getEventInfo(vueReference.event.event_id);
                }
            };
            xhttp.open("POST","/api/events/change/address",true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhttp.send(reqBody);
        },
        changeDescription: function(){
            let reqBody = JSON.stringify({event_id: this.event.event_id,description: this.newDescription});
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.getEventInfo(vueReference.event.event_id);
                }
            };
            xhttp.open("POST","/api/events/change/description",true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhttp.send(reqBody);
        },
    },
    created: function(){
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let eventID = urlParams.get('id');
        this.getEventInfo(eventID);
        this.getPeople(eventID);
        this.checkAdmin(eventID);
    }
});