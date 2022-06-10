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
        yourUsername: "",
        otherFriends: {},
        unavailable:{},
        nextDateTime:"",
        searchFromDate: "",
        searchFromTime: "",
        intervalAmount: "",
        intervalType: "",
        intervalOptions: ""
    },
    methods: {
        /**
         * method for formatting datetimes
         * takes in iso date, returns formatted date
         */
        moment: function(item=undefined){
            return moment.utc(item).format("Do MMM YYYY h:mm a");
        },
        /**
         * method for getting the next time everyone invited is available.
         * takes in a date and time
         * returns nothing.
         * updates nextDateTime
         */
        getNextFullAvailableTime: function(date=undefined,time=undefined){
            if (!date){
                date=this.event.Date;
            }
            if (!time){
                time = this.event.Time;
            }
            let currentEventTime = moment.utc(date+' '+time);
            currentEventTime.add(30,'minutes');
            let xhttp = new XMLHttpRequest();
            let vueReference = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    let res = JSON.parse(this.responseText);
                    if (res.length==0){
                        vueReference.nextDateTime=vueReference.moment(currentEventTime);
                        vueReference.searchFromDate=currentEventTime.format("YYYY-MM-DD");
                        vueReference.searchFromTime=currentEventTime.format("HH:mm");
                    }else{
                        vueReference.getNextFullAvailableTime(currentEventTime.format("YYYY-MM-DD"),currentEventTime.format("HH:mm"));
                    }

                }
            };
            xhttp.open("GET",`/api/events/change/unavailable?event_id=${this.event.event_id}&date=${currentEventTime.format("YYYY-MM-DD")}&time=${currentEventTime.format("HH:mm")}`,true);
            xhttp.send();
        },

        /**
         *  sends a post request to update someones attending status
         */
        updateStatus: function(){
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
        /**
         *  gets all event info, on complete calls more functions that get more info
         */
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
                    vueReference.getPeople(eventID);
                    vueReference.checkAdmin(eventID);
                }
            };
            xhttp.open("GET",`/api/events/info?event_id=${eventID}`,true);
            xhttp.send();
        },
        /**
         *  gets people attending
         *  and also people who are admins.
         */
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
        /**
         *  checks if you are an admin.
         *  if you are, returns info about all admins.
         */
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
                        vueReference.adminInfo = JSON.parse(this.responseText).rows.map(e => e.admin_id.toLowerCase());
                        vueReference.yourUsername = JSON.parse(this.responseText).you;
                        vueReference.getOtherFriends(eventID);
                        vueReference.getUnavailabilities(vueReference.event.event_id,vueReference.event.Date,vueReference.event.Time,true);
                        vueReference.searchFromDate = vueReference.event.Date;
                        vueReference.searchFromTime = vueReference.event.Time;
                        vueReference.getNextFullAvailableTime(vueReference.searchFromDate,vueReference.searchFromTime);
                    }
                }
            };
            xhttp.open("GET",`/api/events/areAdmin?event_id=${eventID}`,true);
            xhttp.send();
        },
        /**
         *  if you are an admin
         *  gets all of your uninvited friends, so u can invite them (if wanted)
         */
        getOtherFriends: function(eventID){
            let xhttp = new XMLHttpRequest();
            let vueReference = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.otherFriends=JSON.parse(this.responseText);
                }
            };
            xhttp.open("GET",`/api/events/change/uninvitedFriends?event_id=${eventID}`,true);
            xhttp.send();
        },
        /**
         *  Allows admins to edit an event
         */
        toggleEditMode: function(){
            this.editMode = !this.editMode;
        },
        /**
         *  below this are all functions for updating various parts
         */
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
                    vueReference.updateInfo(vueReference.event.event_id);
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
                    vueReference.updateInfo(vueReference.event.event_id);
                }
            };
            xhttp.open("POST","/api/events/change/time",true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhttp.send(reqBody);
        },
        finalise: function(){
            let reqBody = JSON.stringify({event_id: this.event.event_id});
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
            xhttp.open("POST","/api/events/change/finalise",true);
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
        changeImage: function(){

            let newImage = document.getElementById("imageEdit").files[0];

            if(newImage === null){
                showAlert("Please select image to change to");
            } else {

                let vueReference = this;

                let formData = new FormData();

                let imageName = this.event.Image;
                let eventId = this.event.event_id;

                formData.append("newImage", newImage);
                formData.append("imageName", imageName);
                formData.append("event_id", eventId);

                let xhttp = new XMLHttpRequest();

                xhttp.onreadystatechange = function(){
                    if(this.readyState == 4 && this.status == 200){
                        vueReference.getEventInfo(vueReference.event.event_id);
                    }
                };

                xhttp.open("POST", "/api/events/change/image", true); //For some reason, this worked only when we didn't set the request header. In order to use, multer I think I needed to set it to 'multipart/form-data'
                xhttp.send(formData);
            }

        },
        deleteEvent: function(){
            let reqBody = JSON.stringify({event_id: this.event.event_id, event_image: this.event.Image});
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    location.href = `/`;
                }
            };
            xhttp.open("POST","/api/events/change/delete",true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhttp.send(reqBody);
        },
        //WAITING FOR HARRISON TO IMPLEMENT ENDPOINT
        addFriend: function(user_id){
            let vueReference = this;
            let requestee = user_id;
            let add_friend = {requestee: requestee};
            console.log(requestee);
            console.log("making friend request");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500) {
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200) {
                    vueReference.updateInfo(vueReference.event.event_id);
                    console.log("working");
                }
            };

            xhttp.open("POST", "api/friends/sendRequest", true);
            xhttp.setRequestHeader("Content-type","application/json");
            xhttp.send(JSON.stringify(add_friend));
        },
        addAdmin: function(user_id){
            let reqBody = JSON.stringify({event_id: this.event.event_id,user_id: user_id});
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.updateInfo(vueReference.event.event_id);
                }
            };
            xhttp.open("POST","/api/events/change/makeAdmin",true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhttp.send(reqBody);
        },
        uninvite: function(user_id){
            let reqBody = JSON.stringify({event_id: this.event.event_id,user_id: user_id});
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.updateInfo(vueReference.event.event_id);
                }
            };
            xhttp.open("POST","/api/events/change/uninvite",true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhttp.send(reqBody);
        },
        invite: function(user_id){
            let reqBody = JSON.stringify({event_id: this.event.event_id,user_id: user_id});
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.updateInfo(vueReference.event.event_id);
                }
            };
            xhttp.open("POST","/api/events/change/invite",true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhttp.send(reqBody);
        },
        //called on create, to update all necessary info (used to be more functions in here)
        updateInfo: function(eventID){
            this.getEventInfo(eventID);
        },
        //get list of people who are invited and not not going but arent available
        getUnavailabilities: function(eventId,eventDate,eventTime, setValue){
            let xhttp = new XMLHttpRequest();
            let vueReference = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    if (setValue){
                        vueReference.unavailable=JSON.parse(this.responseText);
                    }else{
                        return(JSON.parse(this.responseText));
                    }

                }
            };
            xhttp.open("GET",`/api/events/change/unavailable?event_id=${eventId}&date=${eventDate}&time=${eventTime}`,true);
            xhttp.send();
        },
        //set event time to suggested time
        setNewDateTime: function(){
            this.newTime = moment.utc(this.nextDateTime,"Do MMM YYYY h:mm a").format("HH:mm");
            this.newDate = moment.utc(this.nextDateTime,"Do MMM YYYY h:mm a").format("YYYY-MM-DD");
            this.changeDate();
            this.changeTime();
        },
        inviteExternal: function(){
            let container = document.getElementsByClassName("externalUserContainer")[0];
            if (container.style.display === "none") {
                container.style.display = "block";
            } else {
                container.style.display = "none";
            }
        },
        generateLink: function(eventID){
            let vueReference = this;
            let eventID2 = vueReference.event.event_id;
            let firstname = document.getElementById("fname").value;
            let lastname = document.getElementById("lname").value;
            let signup = {
                first_name: firstname,
                last_name: lastname,
                event_id: eventID2,
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
                    vueReference.getPeople(vueReference.event.event_id);
                }
            };

            xhttp.open("POST","/api/events/invite",true);
            xhttp.setRequestHeader("Content-type","application/json");
            xhttp.send(JSON.stringify(signup));

            //Invite user to event
        },
        addToCalendar: function () {
            //send unavailability into the database
            if (this.unavailableFrom === null || this.reason === null || this.unavailableTo === null) {
                return;
            }
            let reqBody = JSON.stringify({event_id: this.event.event_id,unavailable_from: moment(this.event.Date +" " + this.event.Time).format("YYYY-MM-DD[T]HH:mm:ss"), unavailable_to: moment(this.event.Date +" " + this.event.Time).add(2,'hours').format("YYYY-MM-DD[T]HH:mm:ss"), reason: this.event.Title, origin:'internal'});
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 500) {
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200) {
                    console.log('added');
                }
            };

            xhttp.open("POST", "/api/calendar/addEvent", true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            xhttp.send(reqBody);
        },

    },
    created: function(){
        //get event id from params
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let eventID = urlParams.get('id');
        this.updateInfo(eventID);

    }
});