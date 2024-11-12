import {RowDataPacket} from "mysql2";

export interface Venue extends RowDataPacket {
    id: number;
    name: string;
    location: string;
};
  
export interface Team extends RowDataPacket {
    id: number;
    name: string;
};
  
export interface Sport extends RowDataPacket {
    id: number;
    name: string;
};
  
export interface SportEvent extends RowDataPacket {
    id: number;
    dateTime: Date;
    _sport_Id: number;
    _team_1_Id: number;
    _team_2_Id: number;
    _venue_Id: number;
    description: string;
};