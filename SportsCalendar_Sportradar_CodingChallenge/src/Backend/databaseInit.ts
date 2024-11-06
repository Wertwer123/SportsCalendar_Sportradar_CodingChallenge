import { Connection, ConnectionOptions, createPool} from "mysql2/promise";

//Class that holds out mysql connection and offers utility checks for if we still have a valid connection
//and establishing a connection
export class DataBaseInit{

    private mysqlConnection: Connection | null = null;
    private access: ConnectionOptions = {
        user: "root",
        database: "events_db"
    }

    isConnectionValid() : boolean
    {
        return this.mysqlConnection != null;
    }

    public getDataBaseConnection(): Connection | null{
        return this.mysqlConnection;
    }

    public createDatabaseConnection(){
        this.establishDatabaseConnection().then((res) => {
             this.mysqlConnection = res;
         });
     }
 

    private async establishDatabaseConnection() : Promise<Connection>{

        const connection = await createPool(this.access);
    
        return connection;   
    }
}