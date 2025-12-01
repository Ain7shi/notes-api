const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

if(process.env.NODE_ENV==='production' && process.env.DATABASE_URL){
    //Production Database 
    sequelize = new Sequelize(process.env.DATABASE_URL,{
        dialect:'postgres',
        logging: false,
        dialectOptions:{
            ssl:{
                require: true,
                rejectUnathorized: false
            }
        }
    });
}else if (process.env.DB_HOST){
    //Production Database
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: 'postgres',
            logging: false,
            pool: {
                max: 10,
                min: 0,
                acquire: 10000
            }
        }
    )
}else{
    //Development database
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_STORAGE || './database.sqlite',
        logging: console.log
    });
}

module.exports = {sequelize};