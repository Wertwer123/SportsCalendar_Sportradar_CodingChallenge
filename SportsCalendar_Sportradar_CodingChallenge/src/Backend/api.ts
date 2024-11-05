import {Connection, QueryResult, RowDataPacket } from "mysql2/promise";

interface Team extends RowDataPacket
{
    id: number;
    name: string;
}

interface Sport extends RowDataPacket
{
    id: number;
    name: string;
};

interface SportEvent extends RowDataPacket
{
    id: number;
    dateTime: Date;
    sport_Id: number;
    team_1_Id: number;
    team_2_Id: number;
    venue_Id: number;
    description: string;
};



export class TeamsAPI
{
    public async getTeamById(connection: Connection | null, id: number) : Promise<Team | null>{

        if(!connection){
            return null;
        }

        const query = "SELECT * FROM teams WHERE id = " + id;
        const [result] = await connection.query<Team[]>(query);

        return result[0];
    }

}

export class SportsAPI
{
    public async getSportById(connection: Connection | null, id: number) : Promise<Sport | null>{

        if(!connection){
            console.log("Lost connection to the data base")
            return null;
        }

        const query = "SELECT * FROM sports WHERE id = " + id;
        const [result] = await connection.query<Sport[]>(query);
       
        return result[0];
    }
};

export class EventsAPI{

    public async getSportEventById(connection: Connection | null, id : number) : Promise<SportEvent | null>{

        if(!connection){
            console.log("Lost connection to the data base")
            return null;
        }

        const query = "SELECT * FROM events WHERE id = " + id;
        const [result] = await connection.query<SportEvent[]>(query);
    
        return result[0];
    }

    public async getSportEvents(connection: Connection | null) : Promise<SportEvent[] | null>{

        if(!connection){
            console.log("Lost connection to the data base")
            return null;
        }

        const query = "SELECT * FROM events;"; 
        const [result] = await connection.query<SportEvent[]>(query);

        return result;
    } 
};