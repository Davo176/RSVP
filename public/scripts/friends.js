const MYFRIENDS = [
    "Joseph Gorden",
    "Matei Sherman",
    "Mathilda Walsh",
    "Elyas Sweeney",
    "Anjali Drake",
    "Arley Forrest",
    "Kole Mckeown",
    "Kwabena Felix",
    "Ira Searle",
    "Shannen Turner",
    "Rimsha Crawford",
    "Kabir Currie",
    "Darnell Donald",
    "Dominick Poole",
    "Tyra Pruitt",
    "Halle Paterson",
    "Chelsy Boyle",
    "Zeshan Sanderson",
    "Keeva Morgan",
    "Luna Wallace",
    "Ayden Buchanan",
    "Faris Daugherty",
    "Menachem Blackburn",
    "Kendra Swan",
    "Lillie Coombes",
    "Rhys Hill",
    "Abdullah Cotton",
    "Eryn Glass",
    "Umar Houston",
    "Emmanuella Wilks",
]

const MYFRIENDREQUESTS = [
    "Brittney Crosby",
    "Bushra O'Quinn",
    "Jaspal Guevara",
    "Coral Roach",
    "Kaya Wilkins",
    "Ned Watson",
    "Etienne Lindsay",
    "Marlie Mcarthur",
    "Thierry Espinoza",
    "Amalia Neale",
    "Eiliyah Stanton",
    "Raheel Orozco",
    "Aurora Cousins",
    "Suzanna Collins",
    "Fatima Metcalfe",
    "Adaline Morris",
    "Ebonie Ho",
    "Camden Blackmore",
    "Safa Senior",
    "Gillian Bass",
    "Neave Carlson",
    "Alaya Lindsey",
    "Zofia Rennie",
    "Shanai Whitley",
    "Irfan White",
    "Eileen Salter",
    "Michelle Dunlap",
    "Elis Wagner",
    "Harvir Peacock",
    "Amanda Cartwright",
]

var vueinst = new Vue({
    el: '#app',
    data: {
        friends: MYFRIENDS,
        friendRequests: MYFRIENDREQUESTS,
        searchTerm: "",
        searchResults: [],
    },
    methods: {
        remove: function(friend){
            this.friends.splice(this.friends.indexOf(friend), 1);
        },
        accept: function(friend){
            this.friendRequests.splice(this.friendRequests.indexOf(friend), 1);
            this.friends.push(friend);
        },
        decline: function(friend){
            this.friendRequests.splice(this.friendRequests.indexOf(friend), 1);
        },
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
                this.searchTerm=""
            }
        }
    }
});