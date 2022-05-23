

var vueinst = new Vue({
    el: '#app',
    data: {
        calendar: {},
        month: 5,
        year: 2022
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
                    console.log(JSON.parse(this.responseText))
                    vueReference.calendar = JSON.parse(this.responseText);
                }
            };
            console.log("sending Request for", this.month, this.year);
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
        }
    },
    created: function(){
        this.getMonth()
    }
});