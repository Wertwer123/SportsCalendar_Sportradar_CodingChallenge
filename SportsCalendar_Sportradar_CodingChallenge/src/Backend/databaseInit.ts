import { Pool, PoolConnection, ConnectionOptions, createPool} from "mysql2/promise";

//Class that holds out mysql connection and offers utility checks for if we still have a valid connection
//and establishing a connection
class DataBaseInit{

    private mySqlPool: Pool;
    private access: ConnectionOptions = {
        user: "root",
        database: "events_db"
    }

    constructor(){
        this.mySqlPool = createPool(this.access);
    }

    isConnectionValid() : boolean
    {
        return this.mySqlPool != null;
    }

    public getDataBaseConnection(): Promise<PoolConnection>{
        return this.mySqlPool.getConnection();
    }
}

const db = new DataBaseInit();

export default db;