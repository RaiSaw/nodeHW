import { MongoClient } from "mongodb";

let dbConnection;

export const connectToDB = (connectionCB) => {
    MongoClient.connect("mongodb://localhost:27017/sample")// port/database
      .then((client) => {
        dbConnection = client.db();
        return connectionCB();
      })
      .catch((error) => {
        console.log("Error while connecting MongoDB: ", error);
        return connectionCB(error);
      });
};

export const getDB = () => dbConnection;