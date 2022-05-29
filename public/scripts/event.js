let eventInfo = {
    Image: "test.jpg",
    Title: "Will's 20th",
    Date: "2022-06-02",
    Time: "21:00 pm",
    Description: "Lorem Ipsum",
    Address: "66 Smith Street Leabrook SA",
    AttendingStatus: "Not Going",
    admins: [
        "Joseph Gorden",
        "Matei Sherman",
        "Mathilda Walsh",
    ],
    going: [
        "Elyas Sweeney",
        "Anjali Drake",
        "Arley Forrest",
        "Kole Mckeown",
        "Kwabena Felix",
        "Ira Searle",
    ],
    pending: [
        "Dominick Poole",
        "Tyra Pruitt",
        "Halle Paterson",
        "Chelsy Boyle",
        "Zeshan Sanderson",
        "Keeva Morgan",
        "Luna Wallace",
    ],
    notGoing: [
        "Lillie Coombes",
        "Rhys Hill",
        "Abdullah Cotton",
        "Eryn Glass",
        "Umar Houston",
        "Emmanuella Wilks",
    ]
}

var vueinst = new Vue({
    el: '#app',
    data: {
        imagePreURL: '/images/userUploads/',
        event: eventInfo,
        adminOpen: false,
        goingOpen: false,
        pendingOpen: false,
        notGoingOpen: false,
        options: ["Going","Unsure","Not Going"],
        newStatus: eventInfo.AttendingStatus,
    },
    methods: {
        test: function(){
            console.log(this.newStatus)
        }
    }

});