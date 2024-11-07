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
  sport_Id: number;
  team_1_Id: number;
  team_2_Id: number;
  venue_Id: number;
  description: string;
}

const addEventButton: HTMLButtonElement = document.getElementById(
  "AddEventButton"
) as HTMLButtonElement;
const sportEventsList: HTMLTableElement = document.getElementById(
  "SportsEventTable"
) as HTMLTableElement;

addEventButton.addEventListener("click", addSportEvent);

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

function createSportsEventListElement(sportEvent: SportEvent) {
  //Creat a new list entry for the sport event
  const listItem = document.createElement("tr");
  const sportEventDate = document.createElement("td");
  const sportEventLocation = document.createElement("td");
  const sportEventDescritpion = document.createElement("td");
  const playedSport = document.createElement("td");
  const team1 = document.createElement("td");
  const team2 = document.createElement("td");

  getVenueById(sportEvent.venue_Id)
    .then((venue: Venue) => {
      sportEventLocation.innerText = venue.name;
    })
    .catch((error) => {
      console.error(error);
    });

  getSportById(sportEvent.sport_Id)
    .then((sport: Sport) => {
      playedSport.innerText = sport.name;
    })
    .catch((error) => {
      console.error(error);
    });

  getTeamById(sportEvent.team_1_Id)
    .then((receivedTeam1: Team) => {
      team1.innerText = receivedTeam1.name;
    })
    .catch((error) => {
      console.error(error);
    });

  getTeamById(sportEvent.team_2_Id)
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

  listItem.classList.add("sportsEventTableRow");
  listItem.appendChild(sportEventDate);
  listItem.appendChild(sportEventLocation);
  listItem.appendChild(sportEventDescritpion);
  listItem.appendChild(playedSport);
  listItem.appendChild(team1);
  listItem.appendChild(team2);

  //Add the finished list element to our display list
  sportEventsList?.appendChild(listItem);
}

async function addSportEvent(): Promise<SportEvent> {
  const eventToAdd: SportEvent = {
    id: 0,
    dateTime: new Date(),
    sport_Id: 2,
    team_1_Id: 2,
    team_2_Id: 2,
    venue_Id: 1,
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

  reloadSportEventsList();

  return response.json();
}

function reloadSportEventsList()
{
  for (let index = sportEventsList.rows.length - 1; index > 1; index--) {
    const tableRowToRemove = sportEventsList.rows.item(index);
    
    if(!tableRowToRemove){
      continue;
    }

    sportEventsList.removeChild(tableRowToRemove);
  }

  getAllSportEvents().then((events: SportEvent[]) => {
    if (!sportEventsList) {
      return;
    }
  
    events.forEach((sportEvent) => {
      createSportsEventListElement(sportEvent);
    });
  });
}

getAllSportEvents().then((events: SportEvent[]) => {
  if (!sportEventsList) {
    return;
  }

  events.forEach((sportEvent) => {
    createSportsEventListElement(sportEvent);
  });
});
