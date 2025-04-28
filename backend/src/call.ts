import { AppDataSource } from "./data-source";

AppDataSource.initialize()
.then(() => {
    console.log('connected to the database');
})
.catch((err) => {
    console.log(err)
})