let calendar = {
    month: "February",
    year: 2021,
    days : [
        {
            dayName:"Sunday",
            dates:[
                {date: 29, blank: true, events: []},
                {date: 5,blank: false, events: [{time: "5:00pm", reason: "Blocked"},{time: "6:00pm", reason: "Example"},{time: "5:00pm", reason: "Blocked"},{time: "6:00pm", reason: "Example"},{time: "5:00pm", reason: "Blocked"},{time: "6:00pm", reason: "Example"}]},
                {date: 12,blank: false, events: []},
                {date: 19,blank: false, events: []},
                {date: 26,blank: false, events: []},
                {date: 2,blank: true, events: []},
            ]
        },
        {
            dayName:"Monday",
            dates:[
                {date: 30, blank: true, events: []},
                {date: 6,blank: false, events: []},
                {date: 13,blank: false, events: []},
                {date: 20,blank: false, events: []},
                {date: 27,blank: false, events: []},
                {date: 3,blank: true, events: []},
            ]
        },
        {
            dayName:"Tuesday",
            dates:[
                {date: 31, blank: true, events: []},
                {date: 7,blank: false, events: []},
                {date: 14,blank: false, events: []},
                {date: 21,blank: false, events: []},
                {date: 28,blank: false, events: []},
                {date: 4,blank: true, events: []},
            ]
        },
        {
            dayName:"Wednesday",
            dates:[
                {date: 1, blank: false, events: []},
                {date: 8,blank: false, events: []},
                {date: 15,blank: false, events: []},
                {date: 22,blank: false, events: []},
                {date: 29,blank: false, events: []},
                {date: 5,blank: true, events: []},
            ]
        },
        {
            dayName:"Thursday",
            dates:[
                {date: 2, blank: false, events: []},
                {date: 9,blank: false, events: []},
                {date: 16,blank: false, events: []},
                {date: 23,blank: false, events: []},
                {date: 30,blank: false, events: []},
                {date: 6,blank: true, events: []},
            ]
        },
        {
            dayName:"Friday",
            dates:[
                {date: 3, blank: false, events: []},
                {date: 10, blank: false, events: []},
                {date: 17, blank: false, events: []},
                {date: 24, blank: false, events: []},
                {date: 31,blank: false, events: []},
                {date: 7,blank: true, events: []},
            ]
        },
        {
            dayName:"Saturday",
            dates:[
                {date: 4, blank: false, events: []},
                {date: 11, blank: false, events: []},
                {date: 18, blank: false, events: []},
                {date: 25, blank: false, events: []},
                {date: 1, blank: true, events: []},
                {date: 8, blank: true, events: []},
            ]
        },
    ]
}

var vueinst = new Vue({
    el: '#app',
    data: {
        calendar: calendar,
    },
});