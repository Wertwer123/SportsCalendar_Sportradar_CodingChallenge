interface Team
{
    id: number;
    name: string;
}

interface Sport
{
    id: number;
    name: string;
}

interface SportEvent
{
    id: number;
    dateTime: Date;
    sport_Id: number;
    team_1_Id: number;
    team_2_Id: number;
    venue_Id: number;
    description: string;
}

const sportEventListItemEntryClassName: string = "sportEventListItemEntry";
const sportEventsList = document.getElementById("SportsEventList");

async function getTeamById(id:number) : Promise<Team> {
    
    const response = await fetch(`/api/teams/${id}`, {
        method: "GET"
    })

    return response.json();
}

async function getSportById(id: number) : Promise<Sport>{
    
    const response = await fetch(`/api/sports/${id}`, {
        method: "GET"
    });
    
    if(response.status == 500){
        return Promise.reject();
    }

    return response.json();

}

async function getAllSportEvents() : Promise<SportEvent[]>{
   
    const response = await fetch("/api/events", {
        method: "GET",
    });

    return response.json();
}

function createSportsEventListElement(sportEvent: SportEvent)
{
    //Creat a new list entry for the sport event
    const listItem = document.createElement('li');
    const sportEventDate = document.createElement('span');
    const sportEventDescritpion = document.createElement('span');
    const playedSport = document.createElement('span');
    const team1 = document.createElement('span');
    const team2 = document.createElement('span');

    getSportById(sportEvent.sport_Id).then((sport: Sport) => {

        playedSport.innerText = sport.name;
    });

    getTeamById(sportEvent.team_1_Id).then((receivedTeam1: Team) => {
        team1.innerText = receivedTeam1.name;
    });

    getTeamById(sportEvent.team_2_Id).then((receivedTeam2: Team) => {
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


    sportEventDate.classList.add(sportEventListItemEntryClassName);
    sportEventDescritpion.classList.add(sportEventListItemEntryClassName);
    playedSport.classList.add(sportEventListItemEntryClassName);
    team1.classList.add(sportEventListItemEntryClassName);
    team2.classList.add(sportEventListItemEntryClassName);
    sportEventDescritpion.classList.add(sportEventListItemEntryClassName);

    listItem.appendChild(sportEventDate);
    listItem.appendChild(sportEventDescritpion);
    listItem.appendChild(playedSport);
    listItem.appendChild(team1);
    listItem.appendChild(team2);

    //Add the finished list element to our display list
    sportEventsList?.appendChild(listItem);
}

getAllSportEvents().then((events: SportEvent[]) =>{
    
    if(!sportEventsList){
        return;
    }

    events.forEach((sportEvent) =>{
        
       createSportsEventListElement(sportEvent);
    });
})

