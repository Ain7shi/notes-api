const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  //da Log error for debugging (in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('🚨🚨 Error Details:');
    console.log(err.stack);
  }

  //da Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const message = err.errors.map(e => e.message).join(', ');
    error = {
      message,
      statusCode: 400,
      type: 'Validation Error'
    };
  }

  //da Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0]?.path || 'field';
    const message = `Duplicate value for ${field}`;
    error = {
      message,
      statusCode: 400,
      type: 'Duplicate Error'
    };
  }

  //da Sequelize foreign key constraint error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    const message = 'Invalid reference to related resource';
    error = {
      message,
      statusCode: 400,
      type: 'Reference Error'
    };
  }

  //da Sequelize database connection error
  if (err.name === 'SequelizeConnectionError') {
    const message = 'Database connection error';
    error = {
      message,
      statusCode: 500,
      type: 'Database Error'
    };
  }

  //da JSON parse error
  if (err.type === 'entity.parse.failed') {
    const message = 'Invalid JSON format in request body';
    error = {
      message,
      statusCode: 400,
      type: 'Parse Error'
    };
  }

  //da Request entity too large
  if (err.type === 'entity.too.large') {
    const message = 'Request entity too large';
    error = {
      message,
      statusCode: 413,
      type: 'Size Error'
    };
  }

  //da Send error response
  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message || 'Internal Server Error',
      type: error.type || 'Unknown Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

module.exports = errorHandler;