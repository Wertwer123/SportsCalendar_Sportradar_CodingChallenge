import {Connection } from "mysql2/promise";

export interface SportEvent
{
    id: number;
    dateTime: Date;
    sport_Id: number;
    team_1_Id: number;
    team_2_Id: number;
    venue_Id: number;
    description: string;
}


export class EventsAPI{

    public getSportEventById(connection: Connection | null, id : number) : SportEvent{
        return {
            id : id,
            dateTime: new Date(),
            sport_Id: 0,
             team_1_Id: 0,
              team_2_Id: 0,
               venue_Id: 0,
                description: ""};
    }

    public async getSportEvents(connection: Connection | null) : Promise<SportEvent[]>{

        if(!connection){
            console.log("Lost connection to the data base")
            return new Promise<SportEvent[]>(() =>{});
        }

        const query = "SELECT * FROM events;"; 
        const result = await connection.query(query);

        return result[0] as SportEvent[];
    } 
};