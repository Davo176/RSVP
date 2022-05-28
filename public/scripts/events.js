const MYEVENTS = [
    {
        eventId: 1,
        eventPicture: "/images/party.jpg",
        eventName: "Will's 21st Birthday",
        eventDate: "2nd of June",
        eventTime: "7:30pm",
        eventAddress: "4 Shamrock Avenue, Morton",
        eventAttendees: {
            going: 21,
            pending: 5,
            notGoing:7,
        }
    },
    {
        eventId: 2,
        eventPicture: "/images/poker.jpg",
        eventName: "Poker Night",
        eventDate: "15th of June",
        eventTime: "7:30pm",
        eventAddress: "Online",
        eventAttendees: {
            going: 15,
            pending: 6,
            notGoing: 2
        }
    },
    {
        eventId: 3,
        eventPicture: "/images/barbeque.jpg",
        eventName: "Barbeque",
        eventDate: "22nd of June",
        eventTime: "7:30pm",
        eventAddress: "Tusmore Park, Tusmore",
        eventAttendees: {
            going: 16,
            pending: 17,
            notGoing: 2,
        }
    },
    {
        eventId: 4,
        eventPicture: "/images/barbeque.jpg",
        eventName: "2nd Barbeque",
        eventDate: "29nd of June",
        eventTime: "7:30pm",
        eventAddress: "Tusmore Park, Tusmore",
        eventAttendees: {
            going: 16,
            pending: 17,
            notGoing: 2,
        }
    },
]

const INVITEDEVENTS = [
    {
        eventId: 5,
        eventPicture: "/images/party.jpg",
        eventName: "Will's 2nd 21st Birthday",
        eventDate: "9nd of June",
        eventTime: "7:30pm",
        eventAddress: "4 Shamrock Avenue, Morton",
        yourStatus: "Unsure",
        eventAttendees: {
            going: 21,
            pending: 5,
            notGoing:7,
        }
    },
    {
        eventId: 6,
        eventPicture: "/images/poker.jpg",
        eventName: "2nd Poker Night",
        eventDate: "22th of June",
        eventTime: "7:30pm",
        eventAddress: "Online",
        yourStatus: "Unsure",
        eventAttendees: {
            going: 7,
            pending: 1,
            notGoing: 0,
        }
    },
    {
        eventId: 7,
        eventPicture: "/images/barbeque.jpg",
        eventName: "3rd Barbeque",
        eventDate: "4th of July",
        eventTime: "7:30pm",
        eventAddress: "Tusmore Park, Tusmore",
        yourStatus: "Unsure",
        eventAttendees: {
            going: 16,
            pending: 17,
            notGoing: 2,
        }
    },
    {
        eventId: 8,
        eventPicture: "/images/barbeque.jpg",
        eventName: "4th Barbeque",
        eventDate: "11th of July",
        eventTime: "7:30pm",
        eventAddress: "Tusmore Park, Tusmore",
        yourStatus: "Unsure",
        eventAttendees: {
            going: 16,
            pending: 17,
            notGoing: 2,
        }
    },
]



var vueinst = new Vue({
    el: '#app',
    data: {
        search_text: '',
        myEventsBase: MYEVENTS,
        invitedEventsBase: INVITEDEVENTS,
        n:0,
        m:0,
        imagePreURL: '/images/userUploads/'
    },
    computed: {
        myEvents: function(){
            return this.myEventsBase.slice(this.n,this.n+3);
        },
        invitedEvents: function() {
            return this.invitedEventsBase.slice(this.m,this.m+3);
        },
    },
    methods: {
        shiftNLeft: function(){
            if(this.n!==0){
                this.n-=1;
            }
        },
        shiftNRight: function(){
            if(this.n+3!==this.myEventsBase.length){
                this.n+=1;
            }
        },
        shiftMLeft: function(){
            if(this.m!==0){
                this.m-=1;
            }
        },
        shiftMRight: function(){
            if(this.m+3!==this.invitedEventsBase.length){
                this.m+=1;
            }
        },
        changeStatus: function(eventId,newStatus){
            let reqBody = JSON.stringify({event_id: eventId,status: newStatus});
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.getInvited();
                }
            };

            xhttp.open("POST","/api/events/updateStatus",true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
            xhttp.send(reqBody);
        },
        getEvents: function(){
            this.getInvited();
            this.getAdmin();
        },
        getInvited: function(){
            let xhttp = new XMLHttpRequest();
            let vueReference = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.invitedEventsBase = JSON.parse(this.responseText);
                }
            };
            xhttp.open("GET",`/api/events/invited`,true);
            xhttp.send();
        },
        getAdmin: function(){
            let xhttp = new XMLHttpRequest();
            let vueReference = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.myEventsBase = JSON.parse(this.responseText);
                }
            };
            xhttp.open("GET",`/api/events/admin`,true);
            xhttp.send();
        }
    },
    created: function(){
        this.getEvents();
    }
});

