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
;
;
;
;
//document elements cached and initial operations
const addEventButton = document.getElementById("AddEventButton");
const sportsEventTable = document.getElementById("sportsEventTable");
const sportEventsTableBody = document.getElementById("sportsEventTableBody");
const useFiltersCheckBox = document.getElementById("useFilters");
const filterDate = document.getElementById('date');
useFiltersCheckBox.addEventListener("change", onUseFiltersChanged);
filterDate.addEventListener("change", filterEventsByDate);
addEventButton.addEventListener("click", addSportEvent);
//document elements end
//Get functions
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
//get functions end
function createSportsEventListElement(id, sportEvent) {
    //Creat a new list entry for the sport event
    const tableItem = document.createElement("tr");
    const sportEventDate = document.createElement("td");
    const sportEventLocation = document.createElement("td");
    const sportEventDescritpion = document.createElement("td");
    const playedSport = document.createElement("td");
    const team1 = document.createElement("td");
    const team2 = document.createElement("td");
    const removeEventElement = document.createElement("td");
    const removeEventButton = document.createElement("button");
    removeEventElement.appendChild(removeEventButton);
    //Save the sport events id inside of the button to be able to remove the element from the database
    removeEventButton.innerHTML = "X";
    removeEventButton.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`/api/events/${id}`, {
            method: "DELETE"
        });
        sportEventsTableBody === null || sportEventsTableBody === void 0 ? void 0 : sportEventsTableBody.removeChild(tableItem);
        reloadSportEventsList(useFiltersCheckBox.checked);
    }));
    getVenueById(sportEvent._venue_Id)
        .then((venue) => {
        sportEventLocation.innerText = venue.name;
    })
        .catch((error) => {
        console.error(error);
    });
    getSportById(sportEvent._sport_Id)
        .then((sport) => {
        playedSport.innerText = sport.name;
    })
        .catch((error) => {
        console.error(error);
    });
    getTeamById(sportEvent._team_1_Id)
        .then((receivedTeam1) => {
        team1.innerText = receivedTeam1.name;
    })
        .catch((error) => {
        console.error(error);
    });
    getTeamById(sportEvent._team_2_Id)
        .then((receivedTeam2) => {
        team2.innerText = receivedTeam2.name;
    })
        .catch((error) => {
        console.error(error);
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
    removeEventButton.classList.add("removeButton");
    tableItem.appendChild(sportEventDate);
    tableItem.appendChild(sportEventLocation);
    tableItem.appendChild(sportEventDescritpion);
    tableItem.appendChild(playedSport);
    tableItem.appendChild(team1);
    tableItem.appendChild(team2);
    tableItem.appendChild(removeEventElement);
    //Add the finished list element to our display table
    sportEventsTableBody === null || sportEventsTableBody === void 0 ? void 0 : sportEventsTableBody.appendChild(tableItem);
}
//Add/remove events
function addSportEvent() {
    return __awaiter(this, void 0, void 0, function* () {
        //default filled with random data by me
        const eventToAdd = {
            id: 0,
            dateTime: new Date(Date.now()),
            _sport_Id: 2,
            _team_1_Id: 2,
            _team_2_Id: 2,
            _venue_Id: 1,
            description: "TestAdd",
        };
        const response = yield fetch("/api/events", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(eventToAdd),
        });
        reloadSportEventsList(useFiltersCheckBox.checked);
        return response.json();
    });
}
//Clears all elements from the events table
function clearSportsEventTable() {
    for (let index = sportsEventTable.rows.length - 1; index >= 1; index--) {
        const tableRowToRemove = sportsEventTable.rows.item(index);
        if (!tableRowToRemove) {
            continue;
        }
        sportEventsTableBody === null || sportEventsTableBody === void 0 ? void 0 : sportEventsTableBody.removeChild(tableRowToRemove);
    }
}
function reloadSportEventsList(isDateFilterSelected) {
    clearSportsEventTable();
    //If we want to filter by date only display the events for the chosen data
    if (isDateFilterSelected) {
        filterEventsByDate();
        return;
    }
    //else just display all elements and reset the date picker 
    getAllSportEvents().then((events) => {
        if (!sportsEventTable) {
            filterDate.value = "";
            return;
        }
        var i = 0;
        events.forEach((sportEvent) => {
            createSportsEventListElement(sportEvent.id, sportEvent);
            ++i;
        });
    });
}
//Add events end
//Filter events
function onUseFiltersChanged() {
    reloadSportEventsList(useFiltersCheckBox.checked);
}
function filterEventsByDate() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!useFiltersCheckBox.checked) {
            return;
        }
        clearSportsEventTable();
        getAllSportEvents().then((events) => {
            if (!sportsEventTable) {
                return;
            }
            var chosenDate = new Date(filterDate.value);
            var i = 0;
            events.forEach((sportEvent) => {
                var sportEventDate = new Date(sportEvent.dateTime);
                if (sportEventDate.getMonth() == chosenDate.getMonth() &&
                    sportEventDate.getFullYear() == chosenDate.getFullYear()) {
                    createSportsEventListElement(sportEvent.id, sportEvent);
                    ++i;
                }
            });
        });
    });
}
//Filter events end
//Execute on Load
reloadSportEventsList(false);
//Execute on Load end
//# sourceMappingURL=frontend.js.map