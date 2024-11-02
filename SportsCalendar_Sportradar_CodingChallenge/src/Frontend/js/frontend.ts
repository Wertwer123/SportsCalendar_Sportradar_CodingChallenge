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

const Display = document.getElementById("events_test");

async function getAllSportEvents() : Promise<SportEvent[]>{
   
    const response = await fetch("/api/events", {
        method: "GET"
    });

    return response.json();
}

getAllSportEvents().then((events: SportEvent[]) =>{
    
    console.log(Display);
    if(!Display){
        return;
    }

    
    events.forEach((value) =>{
        const NameSpan = document.createElement('div');
        NameSpan.innerText = value.description;
        Display.appendChild(NameSpan);
    });
})