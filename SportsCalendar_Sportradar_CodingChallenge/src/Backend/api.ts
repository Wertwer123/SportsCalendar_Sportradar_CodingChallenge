import { Connection, QueryResult, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import db from "./databaseInit";

interface Venue extends RowDataPacket {
  id: number;
  name: string;
  location: string;
}

interface Team extends RowDataPacket {
  id: number;
  name: string;
}

interface Sport extends RowDataPacket {
  id: number;
  name: string;
}

interface SportEvent extends RowDataPacket {
  id: number;
  dateTime: Date;
  sport_Id: number;
  team_1_Id: number;
  team_2_Id: number;
  venue_Id: number;
  description: string;
}

export class VenuesAPI {
  public async getVenueById(id: number): Promise<Venue> {
    const query = "SELECT * FROM venues WHERE id = ?";
    const connection = await db.getDataBaseConnection();

    if (!connection) {
      return Promise.reject();
    }

    const [result] = await connection.query<Venue[]>(query, [id]);
    connection.release();
    return result[0];
  }
}

export class TeamsAPI {
  public async getTeamById(id: number): Promise<Team> {
    const query = "SELECT * FROM teams WHERE id = ?";
    const connection = await db.getDataBaseConnection();

    if (!connection) {
      return Promise.reject();
    }

    const [result] = await connection.query<Team[]>(query, [id]);
    connection.release();
    return result[0];
  }
}

export class SportsAPI {
  public async getSportById(id: number): Promise<Sport> {
    const query = "SELECT * FROM sports WHERE id = ?";
    const connection = await db.getDataBaseConnection();

    if (!connection) {
      return Promise.reject();
    }

    const [result] = await connection.query<Sport[]>(query, [id]);
    connection.release();
    return result[0];
  }
}

export class EventsAPI {
  public async getSportEventById(id: number): Promise<SportEvent> {
    const query = "SELECT * FROM events WHERE id = ?";
    const connection = await db.getDataBaseConnection();

    if (!connection) {
      return Promise.reject();
    }

    const [result] = await connection.query<SportEvent[]>(query, [id]);
    connection.release();
    return result[0];
  }

  public async getSportEvents(): Promise<SportEvent[]> {
    const query = "SELECT * FROM events;";
    const connection = await db.getDataBaseConnection();

    if (!connection) {
      return Promise.reject();
    }

    const [result] = await connection.query<SportEvent[]>(query);
    connection.release();
    return result;
  }

  public async addSportEvent(event: SportEvent): Promise<SportEvent> {
    const query =
      "INSERT INTO events (dateTime, sport_Id, team_1_Id, team_2_Id, venue_Id, description) VALUES(?, ?, ?, ?, ?, ?)";
    const connection = await db.getDataBaseConnection();

    if (!connection) {
      return Promise.reject();
    }

    const [inserted] = await connection.execute<ResultSetHeader>(query, [
      event.dateTime,
      event.sport_Id,
      event.team_1_Id,
      event.team_2_Id,
      event.venue_Id,
      event.description,
    ]);

    connection.release();
    
    return this.getSportEventById(inserted.insertId);
  }
}
