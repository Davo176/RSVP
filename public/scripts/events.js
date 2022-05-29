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
        },
        goToEvent: function(eventId){
            location.href = `/event?id=${eventId}`
        }
    },
    created: function(){
        this.getEvents();
    }
});

