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
        notifications: NOTIFICATIONS,
    },
});