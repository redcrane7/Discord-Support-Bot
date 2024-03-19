import mongoose from 'mongoose';
import chalk from 'chalk';
import * as dotenv from 'dotenv'

dotenv.config()

export const connect = async (
    username: string,
    password: string,
    host: string,
    port: number,
    database: string,
    query?: string | undefined
) => {
    mongoose.set('strictQuery', false);
    try {
        console.log(chalk.blue(chalk.bold(`Database`)), (chalk.white(`>>`)), chalk.red(`MongoDB`), chalk.green(`is connecting...`))
        const userpass = `${username}:${password}`;
        const credentials =
        userpass.startsWith(":") || userpass.endsWith(":") ? "" : `${userpass}@`;

        const queryparams = query ? `?${query}` : "";
        const url = `mongodb://${credentials}${host}:${port}/${database}${queryparams}`;
        await mongoose.connect(url);
    } catch (err) {
        console.log(chalk.red(`[ERROR]`), chalk.white(`>>`), chalk.red(`MongoDB`), chalk.white(`>>`), chalk.red(`Failed to connect to MongoDB!`), chalk.white(`>>`), chalk.red(`Error: ${err}`))
        console.log(chalk.red("Exiting..."))
        process.exit(1)
    }


    mongoose.connection.once("open", () => {
        console.log(chalk.blue(chalk.bold(`Database`)), (chalk.white(`>>`)), chalk.red(`MongoDB`), chalk.green(`is ready!`))
    });

    mongoose.connection.on("error", (err) => {
        console.log(chalk.red(`[ERROR]`), chalk.white(`>>`), chalk.red(`Database`), chalk.white(`>>`), chalk.red(`Failed to connect to MongoDB!`), chalk.white(`>>`), chalk.red(`Error: ${err}`))
        console.log(chalk.red("Exiting..."))
        process.exit(1)
    });
    return true;
}