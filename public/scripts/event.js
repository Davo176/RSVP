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
        moment: function(item=undefined){
            return moment.utc(item).format("Do MMM YYYY h:mm a");
        },
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
                    let res = JSON.parse(this.responseText)
                    if (res.length==0){
                        vueReference.nextDateTime=vueReference.moment(currentEventTime)
                        vueReference.searchFromDate=currentEventTime.format("YYYY-MM-DD");
                        vueReference.searchFromTime=currentEventTime.format("HH:mm");
                    }else{
                        vueReference.getNextFullAvailableTime(currentEventTime.format("YYYY-MM-DD"),currentEventTime.format("HH:mm"))
                    }

                }
            };
            xhttp.open("GET",`/api/events/change/unavailable?event_id=${this.event.event_id}&date=${currentEventTime.format("YYYY-MM-DD")}&time=${currentEventTime.format("HH:mm")}`,true);
            xhttp.send();
        },
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
                        vueReference.adminInfo = JSON.parse(this.responseText).rows.map(e => e.admin_id.toLowerCase());
                        vueReference.yourUsername = JSON.parse(this.responseText).you;
                        vueReference.getOtherFriends(eventID);
                        vueReference.getUnavailabilities(vueReference.event.event_id,vueReference.event.Date,vueReference.event.Time,true);
                        vueReference.searchFromDate = vueReference.event.Date;
                        vueReference.searchFromTime = vueReference.event.Time;
                        vueReference.getNextFullAvailableTime(vueReference.searchFromDate,vueReference.searchFromTime)
                    }
                }
            };
            xhttp.open("GET",`/api/events/areAdmin?event_id=${eventID}`,true);
            xhttp.send();
        },
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
        deleteEvent: function(){
            let reqBody = JSON.stringify({event_id: this.event.event_id});
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
        addFriend: function(user_id){
            console.log("Friend Request Sent to ", user_id);
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
        updateInfo: function(eventID){
            this.getEventInfo(eventID);

        },
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
                        return(JSON.parse(this.responseText))
                    }

                }
            };
            xhttp.open("GET",`/api/events/change/unavailable?event_id=${eventId}&date=${eventDate}&time=${eventTime}`,true);
            xhttp.send();
        },
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
            let eventID2 = vueReference.event.event_id
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
            xhttp.setRequestHeader("Content-type","application/json")
            xhttp.send(JSON.stringify(signup));

            //Invite user to event
        }

    },
    created: function(){
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let eventID = urlParams.get('id');
        this.updateInfo(eventID);

    }
});