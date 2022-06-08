var vueinst = new Vue({
    el: '#app',
    data: {
        calendar: {},
        month: 6,
        year: 2022,
        showForm: false,
        addUnavailabilityDate: null,
        unavailableFrom: null,
        unavailableTo: null,
        reason: null,
        auth: false,
        buttonName: 'Get Authentication',
    },
    methods: {
        formatTime: function (time) {
            //return the time as a formatted string
            return moment.utc(time).format("h:mm A")
        },
        getMonth: function (month, year) {
            //get the calendar for displayed month
            let xhttp = new XMLHttpRequest();
            let vueReference = this;
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 500) {
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200) {
                    vueReference.calendar = JSON.parse(this.responseText);
                }
            };
            xhttp.open("GET", `/api/calendar?month=${this.month}&year=${this.year}`, true);
            xhttp.send();
        },
        nextMonth: function () {
            //increment month and update calendar
            if (this.month != 12) {
                this.month += 1;
            } else {
                this.year += 1;
                this.month = 1;
            }
            this.getMonth();
        },
        prevMonth: function () {
            //decrement the month by 1 and update calendar
            if (this.month != 1) {
                this.month -= 1;
            } else {
                this.year -= 1;
                this.month = 12;
            }
            this.getMonth();
        },
        addUnavailability: function (date) {
            //show a form to add a new unavailability time
            if (!date.blank) {
                this.showForm = true;
                this.addUnavailabilityDate = parseInt(date.date);
            }
        },
        submitUnavailability: function () {
            //send unavailability into the database
            if (this.unavailableFrom === null || this.reason === null || this.unavailableTo === null) {
                return;
            }
            let reqBody = JSON.stringify({ date: `${this.year}-${this.month}-${this.addUnavailabilityDate}`, unavailable_from: this.unavailableFrom, unavailable_to: this.unavailableTo, reason: this.reason, origin:'internal' });
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 500) {
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200) {
                    vueReference.getMonth();
                    vueReference.showForm = false;
                    vueReference.reason = null;
                    vueReference.unavailableFrom = null;
                    vueReference.unavailableTo = null;
                }
            };

            xhttp.open("POST", "/api/calendar/add", true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
            xhttp.send(reqBody);
        },
        deleteEvent: function (event) {
            //delete an unavailability
            let reqBody = JSON.stringify({ id: event.unavailability_id });
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 500) {
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200) {
                    vueReference.getMonth();
                    vueReference.reason = null;
                    vueReference.unavailableFrom = null;
                    vueReference.unavailableTo = null;
                }
            };

            xhttp.open("POST", "/api/calendar/delete", true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
            xhttp.send(reqBody);
        },
        pushUnavUp: function(a,b,c,d){
            pushUnavUp(a,b,c);
            let reqBody = JSON.stringify({ id: d });
            let xhttp = new XMLHttpRequest();
            let vueReference = this;

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 500) {
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200) {
                    vueReference.getMonth();
                }
            };

            xhttp.open("POST", "/api/calendar/setOriginExternal", true);
            xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
            xhttp.send(reqBody);
        }
    },
    created: function () {
        //on page create get the current month
        this.getMonth()
    }
});