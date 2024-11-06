"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sportEventsList = document.getElementById("SportsEventList");
function getVenueById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/api/venues/${id}`, {
            method: "GET",
        });
        return response.json();
    });
}
function getTeamById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/api/teams/${id}`, {
            method: "GET",
        });
        return response.json();
    });
}
function getSportById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/api/sports/${id}`, {
            method: "GET",
        });
        if (response.status == 500) {
            return Promise.reject();
        }
        return response.json();
    });
}
function getAllSportEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("/api/events", {
            method: "GET",
        });
        return response.json();
    });
}
function createSportsEventListElement(sportEvent) {
    //Creat a new list entry for the sport event
    const listItem = document.createElement('tr');
    const sportEventDate = document.createElement('td');
    const sportEventLocation = document.createElement('td');
    const sportEventDescritpion = document.createElement('td');
    const playedSport = document.createElement('td');
    const team1 = document.createElement('td');
    const team2 = document.createElement('td');
    getVenueById(sportEvent.venue_Id).then((venue) => {
        sportEventLocation.innerText = venue.name;
    });
    getSportById(sportEvent.sport_Id).then((sport) => {
        playedSport.innerText = sport.name;
    });
    getTeamById(sportEvent.team_1_Id).then((receivedTeam1) => {
        team1.innerText = receivedTeam1.name;
    });
    getTeamById(sportEvent.team_2_Id).then((receivedTeam2) => {
        team2.innerText = receivedTeam2.name;
    });
    const date = new Date(sportEvent.dateTime.toString());
    //Format the date to a more readable format
    const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Use 12-hour clock format
    });
    sportEventDate.innerText = formattedDate.toString();
    sportEventDescritpion.innerText = sportEvent.description.toString();
    listItem.classList.add("sportsEventTableRow");
    listItem.appendChild(sportEventDate);
    listItem.appendChild(sportEventLocation);
    listItem.appendChild(sportEventDescritpion);
    listItem.appendChild(playedSport);
    listItem.appendChild(team1);
    listItem.appendChild(team2);
    //Add the finished list element to our display list
    sportEventsList === null || sportEventsList === void 0 ? void 0 : sportEventsList.appendChild(listItem);
}
getAllSportEvents().then((events) => {
    if (!sportEventsList) {
        return;
    }
    events.forEach((sportEvent) => {
        createSportsEventListElement(sportEvent);
    });
});
//# sourceMappingURL=frontend.js.map