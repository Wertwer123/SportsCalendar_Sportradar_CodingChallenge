interface Venue {
  id: number;
  name: string;
  location: string;
};

interface Team {
  id: number;
  name: string;
};

interface Sport {
  id: number;
  name: string;
};

interface SportEvent {
  id: number;
  dateTime: Date;
  _sport_Id: number;
  _team_1_Id: number;
  _team_2_Id: number;
  _venue_Id: number;
  description: string;
};

//document elements cached and initial operations
const addEventButton: HTMLButtonElement = document.getElementById(
  "AddEventButton"
) as HTMLButtonElement;
const sportsEventTable: HTMLTableElement = document.getElementById(
  "sportsEventTable"
) as HTMLTableElement;

const sportEventsTableBody = document.getElementById("sportsEventTableBody");
const useFiltersCheckBox: HTMLInputElement = document.getElementById("useFilters") as HTMLInputElement;
const filterDate = document.getElementById('date') as HTMLInputElement;

useFiltersCheckBox.addEventListener("change", onUseFiltersChanged);
filterDate.addEventListener("change", filterEventsByDate);
addEventButton.addEventListener("click", addSportEvent);

//document elements end

//Get functions
async function getVenueById(id: number): Promise<Venue> {
  const response = await fetch(`/api/venues/${id}`, {
    method: "GET",
  });

  return response.json();
}

async function getTeamById(id: number): Promise<Team> {
  const response = await fetch(`/api/teams/${id}`, {
    method: "GET",
  });

  return response.json();
}

async function getSportById(id: number): Promise<Sport> {
  const response = await fetch(`/api/sports/${id}`, {
    method: "GET",
  });

  if (response.status == 500) {
    return Promise.reject();
  }

  return response.json();
}

async function getAllSportEvents(): Promise<SportEvent[]> {
  const response = await fetch("/api/events", {
    method: "GET",
  });

  return response.json();
}
//get functions end

function createSportsEventListElement(id: number, sportEvent: SportEvent) {
  //Creat a new list entry for the sport event
  const tableItem = document.createElement("tr");
  const sportEventDate = document.createElement("td");
  const sportEventLocation = document.createElement("td");
  const sportEventDescritpion = document.createElement("td");
  const playedSport = document.createElement("td");
  const team1 = document.createElement("td");
  const team2 = document.createElement("td");
  const removeEventElement = document.createElement("td");
  const removeEventButton = document.createElement("button")
  removeEventElement.appendChild(removeEventButton);

  //Save the sport events id inside of the button to be able to remove the element from the database
  removeEventButton.innerHTML = "X";
  removeEventButton.addEventListener("click", async () =>{
    
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE"
    });
  
    sportEventsTableBody?.removeChild(tableItem);
    reloadSportEventsList(useFiltersCheckBox.checked);
  })

  getVenueById(sportEvent._venue_Id)
    .then((venue: Venue) => {
      sportEventLocation.innerText = venue.name;
    })
    .catch((error) => {
      console.error(error);
    });

  getSportById(sportEvent._sport_Id)
    .then((sport: Sport) => {
      playedSport.innerText = sport.name;
    })
    .catch((error) => {
      console.error(error);
    });

  getTeamById(sportEvent._team_1_Id)
    .then((receivedTeam1: Team) => {
      team1.innerText = receivedTeam1.name;
    })
    .catch((error) => {
      console.error(error);
    });

  getTeamById(sportEvent._team_2_Id)
    .then((receivedTeam2: Team) => {
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
  sportEventsTableBody?.appendChild(tableItem);
}

//Add/remove events
async function addSportEvent(): Promise<SportEvent> {
  
  //default filled with random data by me
  const eventToAdd: SportEvent = {
    id: 0,
    dateTime: new Date(Date.now()),
    _sport_Id: 2,
    _team_1_Id: 2,
    _team_2_Id: 2,
    _venue_Id: 1,
    description: "TestAdd",
  };
 
  const response = await fetch("/api/events", {
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    method: "POST",
    body: JSON.stringify(eventToAdd),
  });

  reloadSportEventsList(useFiltersCheckBox.checked);

  return response.json();
}

//function thats bound to the minus button of the sport table element
async function removeSportEvent(mouseEvent: MouseEvent){

  const clickedButton: HTMLButtonElement = mouseEvent.target as HTMLButtonElement;
  
  
  
}

//Clears all elements from the events list
function clearSportsEventTable(){

  for (let index = sportsEventTable.rows.length - 1; index >= 1; index--) {
    const tableRowToRemove = sportsEventTable.rows.item(index);
    
    if(!tableRowToRemove){
      continue;
    }

    sportEventsTableBody?.removeChild(tableRowToRemove);
  }
}

function reloadSportEventsList(isDateFilterSelected: Boolean)
{
  clearSportsEventTable();

  //If we want to filter by date only display the events for the chosen data
  if(isDateFilterSelected)
  {
    console.log("applied filters")
    filterEventsByDate();
    return;
  }

  //else just display all elements and reset the date picker 
  getAllSportEvents().then((events: SportEvent[]) => {
    if (!sportsEventTable) {
      return;
    }
  
    var i: number = 0;

    events.forEach((sportEvent) => {
      createSportsEventListElement(sportEvent.id, sportEvent);
      ++i;
    });
  });
}
//Add events end

//Filter events

function onUseFiltersChanged(){
  console.log(useFiltersCheckBox.checked);
  reloadSportEventsList(useFiltersCheckBox.checked);
}

async function filterEventsByDate(){

  if(!useFiltersCheckBox.checked){
    return;
  }

  clearSportsEventTable();

  getAllSportEvents().then((events: SportEvent[]) => {
    if (!sportsEventTable) {
      return;
    }
  
    var chosenDate: Date = new Date(filterDate.value);
    var i: number = 0;

    events.forEach((sportEvent) => {

      var sportEventDate: Date = new Date(sportEvent.dateTime);

      if(sportEventDate.getMonth() == chosenDate.getMonth() &&
          sportEventDate.getFullYear() == chosenDate.getFullYear())
      { 
        createSportsEventListElement(sportEvent.id ,sportEvent);
        ++i;
      }
    });
  });

}

//Filter events end

//Execute on Load

reloadSportEventsList(false);

//Execute on Load end