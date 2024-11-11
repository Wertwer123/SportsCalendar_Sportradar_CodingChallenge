interface Venue {
  id: number;
  name: string;
  location: string;
}

interface Team {
  id: number;
  name: string;
}

interface Sport {
  id: number;
  name: string;
}

interface SportEvent {
  id: number;
  dateTime: Date;
  _sport_Id: number;
  _team_1_Id: number;
  _team_2_Id: number;
  _venue_Id: number;
  description: string;
}

const addEventButton: HTMLButtonElement = document.getElementById(
  "AddEventButton"
) as HTMLButtonElement;
const sportsEventTable: HTMLTableElement = document.getElementById(
  "sportsEventTable"
) as HTMLTableElement;

const sportEventsTableBody = document.getElementById("sportsEventTableBody");
const filterDate = document.getElementById('date') as HTMLInputElement;

filterDate.addEventListener("change", filterEventsByDate);
addEventButton.addEventListener("click", addSportEvent);

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
  removeEventButton.value = id.toString();
  removeEventButton.innerHTML = "-";
  removeEventButton.addEventListener("click", removeSportEvent)

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

  reloadSportEventsList(true);

  return response.json();
}

async function removeSportEvent(mouseEvent: MouseEvent){

  const clickedButton: HTMLButtonElement = mouseEvent.target as HTMLButtonElement
  const parentTableItem = clickedButton.parentElement?.parentElement;
  console.log(clickedButton.value);
  const response = await fetch(`/api/events/${clickedButton.value}`, {
    method: "DELETE"
  });

  if(parentTableItem){

    //take the parent element of our parent element because the button sits inside a table data element
    sportEventsTableBody?.removeChild(clickedButton.parentElement.parentElement);
  }

  reloadSportEventsList(true);
}

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

  //If we have a choosen date just display the events for the choosen date
  if(isDateFilterSelected)
  {
    filterEventsByDate();
    return;
  }

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
async function filterEventsByDate(){

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
