// Custom middleware that logs out the path of each route request in a unique color
const customMiddleware = (req, res, next) => {
    const fgCyan = '\x1b[36m';
    const fgYellow = '\x1b[33m';
    const fgMagenta = '\x1b[35m';
    switch (req.method) {
      case 'GET': {
        console.info(`📗 ${fgCyan}${req.method} request to ${req.originalUrl}`);
        break;
      }
      case 'POST': {
        console.info(`📘 ${fgYellow}${req.method} request to ${req.originalUrl}`);
        break;
      }
      case 'DELETE': {
        console.info(`📘 ${fgMagenta}${req.method} request to ${req.originalUrl}`);
        break;
      }
      default:
        console.log(`📙${fgCyan}${req.method} request to ${req.originalUrl}`);
    }
  
    next();
  };
  
  exports.customMiddleware = customMiddleware;
  