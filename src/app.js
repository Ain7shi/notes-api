const express = require ('express');
const cors = require ('cors');
const helmet = require ('helmet');
const morgan = require ('morgan');
// const { version } = require('react');
require('dotenv').config();
const {swaggerUi,specs} = require('./config/swagger');

const app = express();

//da Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true,limit:'10mb'}));

//da Basic Route of data i think
app.get('/',(req,res) =>{
    req.json({
        message:'Welcome to Notes API',
        version:'1.0.0',
        status: 'running',
        endpoint:{
            notes:'api/notes',
            health:'/health',
            documentation:'/api-docs'
        },
        features:[
            'Create and manage notes',
            'Search functionaity',
            'Category organization',
            'Pin important notes',
            'Archive old notes'
        ]
    });
});

//da Heath Check Endpoint
app.get('/health', (req,res) =>{
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().tolSOString(),
        uptime:process.uptime(),
        environment: process.env.NODE_ENV || 'development'
    });
});

//da API Routes
const notesRoutes = require('./routes/notes');
app.use('/api/notes', notesRoutes);

//da 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    suggestion: 'Check /api-docs for available endpoints'
  });
});


//da global error handler
const errorHandler=require('./middleware/errorHandler');
app.use(errorHandler);

//da swagger thing
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs,{
    customCss:'.swagger-ui . topbar{display:none}',
    customSiteTitle: 'Notes API Documentation',
    swaggerOptions:{
        docExpansion: 'none',
        filter:true,
        showRequestHeader:true
    }
}));

module.exports = app;