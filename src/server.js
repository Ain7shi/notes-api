const app = require('./app');
const {sequelize} = require('./config/database');

const PORT = process.env.PORT || 3000;

//da Test Database Connection and Start Server
const startServer = async() => {
    try {
        await sequelize.authenticate();
        console.log('Database Connection Establish Succesfully.');
    
    //da Sync Database (creates tables if does not exist yet)
    await sequelize.sync({force:false});
    console.log('Database Syncronized');

    app.listen(PORT, () =>{
        console.log(`Server RUnning on port ${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
    }catch(error){
        console.error('Unable to start server:',error);
        process.exit(1);
    }
};

startServer();