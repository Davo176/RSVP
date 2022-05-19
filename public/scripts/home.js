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

const NOTIFICATIONS = [
    {
        type: 'Friend Request',
        details: {
            requester: "Johnie Savage",
        }
    },
    {
        type: 'invite',
        details: {
            eventName: "2nd Barbeque",
            inviter: "Stephen Smith",
            eventDate: "29nd of June",
            eventTime: "7:30pm",
            eventAddress: "Tusmore Park, Tusmore",
            conflicts: false,
        }
    },
    {
        type: 'invite',
        details: {
            eventName: "2nd Birthday",
            inviter: "Jayden Smith",
            eventDate: "22nd of June",
            eventTime: "7:10pm",
            eventAddress: "Online",
        }
    }
]

var vueinst = new Vue({
    el: '#app',
    data: {
        myEventsBase: MYEVENTS,
        notifications: NOTIFICATIONS,

    },
    computed: {
        homeEvents: function(){
            return this.myEventsBase.slice(0,3);
        }
    },
});