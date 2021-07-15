import { initUserModel } from "./models/UserModel.js";
import Sequelize from "sequelize";

export default class Database {
    constructor() {
        this.connection = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            dialect: "mysql",
        });
    }

    async initDatabase() {
        if (!(await this.checkConnection())) {
            return false;
        }
        await initUserModel(this.connection);

        return true;
    }

    async checkConnection() {
        try {
            await this.connection.authenticate();
            console.log("Connection has been established successfully.");
            return true;
        } catch (error) {
            console.error("Unable to connect to the database:", error);
        }
        return false;
    }
}
