var vueinst = new Vue({
    el: '#app',
    data: {
        search_text: '',
        myEventsBase: [],
        invitedEventsBase: [],
        n:0,
        m:0,
        imagePreURL: '/images/userUploads/'
    },
    computed: {
        //creates slices of 3 events for each
        myEvents: function(){
            return this.myEventsBase.slice(this.n,this.n+3);
        },
        invitedEvents: function() {
            return this.invitedEventsBase.slice(this.m,this.m+3);
        },
    },
    methods: {
        //method for formatting dates
        moment: function(item=undefined){
            return moment.utc(item).format("Do MMM YYYY h:mm a");
        },
        //increment and decrement to see more events
        shiftNLeft: function(){
            if(this.n!==0){
                this.n-=1;
            }
        },
        shiftNRight: function(){
            if (this.myEventsBase.length<=3){
                return;
            }
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
            if (this.invitedEventsBase.length<=3){
                return;
            }
            if(this.m+3!==this.invitedEventsBase.length){
                this.m+=1;
            }
        },
        //change whether or not you are going to an event.
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
        //get all events
        getEvents: function(){
            this.getInvited();
            this.getAdmin();
        },
        //get events your invited too (but not an admin on)
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
        //get events your an admin on
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
        },
        //redirect to an event
        goToEvent: function(eventId){
            location.href = `/event?id=${eventId}`
        }
    },
    //on create get events
    created: function(){
        this.getEvents();
    }
});

