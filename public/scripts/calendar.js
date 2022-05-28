var vueinst = new Vue({
    el: '#app',
    data: {
        calendar: {},
        month: 5,
        year: 2022,
        showForm: false,
        addUnavailabilityDate: null,
        unavailableFrom: null,
        unavailableTo: null,
        reason: null,
    },
    methods: {
        getMonth: function(month,year){
            let xhttp = new XMLHttpRequest();
            let vueReference = this;
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.calendar = JSON.parse(this.responseText);
                }
            };
            xhttp.open("GET",`/api/calendar?month=${this.month}&year=${this.year}`,true);
            xhttp.send();
        },
        nextMonth: function(){
            if (this.month!=12){
                this.month+=1;
            }else{
                this.year+=1;
                this.month=1;
            }
            this.getMonth();
        },
        prevMonth: function(){
            if (this.month!=1){
                this.month-=1;
            }else{
                this.year-=1;
                this.month=12;
            }
            this.getMonth();
        },
        addUnavailability: function(date){
            if(!date.blank){
                this.showForm = true;
                this.addUnavailabilityDate = parseInt(date.date);
            }
        },
        submitUnavailability: function(){
            if (this.unavailableFrom===null || this.reason===null||this.unavailableTo===null){
                return;
            }
            let reqBody = JSON.stringify({date: `${this.year}-${this.month}-${this.addUnavailabilityDate}`,unavailable_from: this.unavailableFrom, unavailable_to:this.unavailableTo,reason:this.reason});
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.getMonth();
                    vueReference.showForm = false;
                    vueReference.reason = null;
                    vueReference.unavailableFrom=null;
                    vueReference.unavailableTo=null;
                }
            };

            xhttp.open("POST","/api/calendar/add",true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
            xhttp.send(reqBody);
        },
        deleteEvent: function(event){
            let reqBody = JSON.stringify({id: event.unavailability_id});
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500){
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200){
                    vueReference.getMonth();
                    vueReference.reason = null;
                    vueReference.unavailableFrom=null;
                    vueReference.unavailableTo=null;
                }
            };

            xhttp.open("POST","/api/calendar/delete",true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
            xhttp.send(reqBody);
        }
    },
    created: function(){
        this.getMonth()
    }
});