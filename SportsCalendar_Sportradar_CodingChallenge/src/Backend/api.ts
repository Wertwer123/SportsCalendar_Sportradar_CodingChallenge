import {ResultSetHeader} from "mysql2/promise";
import { Venue, Team, Sport, SportEvent} from "./types";
import db from "./databaseInit";


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
      "INSERT INTO events (dateTime, _sport_Id, _team_1_Id, _team_2_Id, _venue_Id, description) VALUES(?, ?, ?, ?, ?, ?)";
    const connection = await db.getDataBaseConnection();

    if (!connection) {
      return Promise.reject();
    }

    const [inserted] = await connection.execute<ResultSetHeader>(query, [
      event.dateTime,
      event._sport_Id,
      event._team_1_Id,
      event._team_2_Id,
      event._venue_Id,
      event.description,
    ]);

    connection.release();
    
    return this.getSportEventById(inserted.insertId);
  }
  public async removeSportEvent(id: number): Promise<SportEvent>
  {
    const query = "DELETE FROM events WHERE id = ?";
    const connection = await db.getDataBaseConnection();

    if(!connection){
      return Promise.reject();
    }

    const [res] = await connection.execute<SportEvent[]>(query, [id]);
    connection.release();

    return res[0]
  }
}
