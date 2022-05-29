
var vueinst = new Vue({
    el: '#app',
    data: {
        imagePreURL: '/images/userUploads/',
        event: {Image: 'test.jpg'},
        people: {},
        areAdmin: false,
        adminOpen: false,
        goingOpen: false,
        pendingOpen: false,
        notGoingOpen: false,
        options: ["Going","Unsure","Not Going"],
        newStatus: "",
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
        }
    },
    created: function(){
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let eventID = urlParams.get('id');
        this.getEventInfo(eventID);
        this.getPeople(eventID);
    }
});