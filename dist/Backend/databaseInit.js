"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("mysql2/promise");
//Class that holds out mysql connection and offers utility checks for if we still have a valid connection
//and establishing a connection
class DataBaseInit {
    constructor() {
        this.access = {
            user: "root",
            database: "events_db"
        };
        this.mySqlPool = (0, promise_1.createPool)(this.access);
    }
    isConnectionValid() {
        return this.mySqlPool != null;
    }
    getDataBaseConnection() {
        return this.mySqlPool.getConnection();
    }
}
const db = new DataBaseInit();
exports.default = db;
//# sourceMappingURL=databaseInit.js.map