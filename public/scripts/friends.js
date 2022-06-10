//Will created base, waiting for harrison to implement ajax and routes
var vueinst = new Vue({
    el: '#app',
    data: {
        friends: [],
        friendRequests: [],
        searchTerm: "",
        searchResults: [],
    },
    methods: {
        updateFriends: function (){
            let vueReference = this;
            console.log("updating friend");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500) {
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200) {
                    vueReference.friends = JSON.parse(this.responseText);
                }
            };

            xhttp.open("GET", "/api/friends", true);
            xhttp.send();
        },
        updateFriendRequests: function (){
            let vueReference = this;
            console.log("updating friend request");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500) {
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200) {
                    vueReference.friendRequests = JSON.parse(this.responseText);
                }
            };

            xhttp.open("GET", "api/friends/requests", true);
            xhttp.send();
        },
        addFriend: function (invitee){
            let vueReference = this;
            let requestee = invitee;
            let add_friend = {requestee: requestee};
            console.log(requestee);
            console.log("making friend request");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500) {
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200) {
                    console.log("working");
                }
            };

            xhttp.open("POST", "api/friends/sendRequest", true);
            xhttp.setRequestHeader("Content-type","application/json");
            xhttp.send(JSON.stringify(add_friend));
        },
        remove: function(friend2){
            let vueReference = this;
            let friend = friend2;
            let remove_friend = {friend: friend};
            console.log("removing friend");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500) {
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200) {
                   vueReference.updateFriends();
                }
            };

            xhttp.open("POST", "api/friends/removeFriend", true);
            xhttp.setRequestHeader("Content-type","application/json");
            xhttp.send(JSON.stringify(remove_friend));
        },
        accept: function(friend2){
            let vueReference = this;
            let friend = friend2;
            let remove_friend = {friend: friend};
            console.log("removing friend");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500) {
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200) {
                   vueReference.updateFriendRequests();
                   vueReference.updateFriends();
                }
            };

            xhttp.open("POST", "api/friends/acceptRequest", true);
            xhttp.setRequestHeader("Content-type","application/json");
            xhttp.send(JSON.stringify(remove_friend));
        },

        decline: function(friend2){
            let vueReference = this;
            let friend = friend2;
            let remove_friend = {friend: friend};
            console.log("removing friend");
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 500) {
                    console.log("error");
                }
                if (this.readyState == 4 && this.status == 200) {
                   vueReference.updateFriendRequests();
                }
            };

            xhttp.open("POST", "api/friends/declineRequest", true);
            xhttp.setRequestHeader("Content-type","application/json");
            xhttp.send(JSON.stringify(remove_friend));
        },
        //send a search for users who match search term, if more than 3 chars.
        searchForNewFriends: function(){
            if (this.searchTerm.length > 3){
                let xhttp = new XMLHttpRequest();
                let vueReference = this;
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 500){
                        console.log("error");
                    }
                    if (this.readyState == 4 && this.status == 200){
                        vueReference.searchResults = JSON.parse(this.responseText);
                    }
                };
                xhttp.open("GET",`/api/friends/search?searchTerm=${this.searchTerm}`,true);
                xhttp.send();
            }else{
                this.searchTerm="";
            }
        }
    },
    created: function(){
        this.updateFriends();
        this.updateFriendRequests();
    }
});