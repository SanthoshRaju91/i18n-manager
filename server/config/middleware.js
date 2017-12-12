/**
* Middleware configuratin for the application.
* configures body-parser, morgan request logging for dev, enabling cors (cross platform compatibility)
*/
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import morgan from 'morgan';
import cors from 'cors';
import { SECRET } from './index';

/* CORS options for the server instance*/
const corsOptions = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

export function appMiddleware(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extend: true }));
  app.use(morgan('dev'));
  app.use(cors(corsOptions));
}

export function authMiddleware() {
  return function(req, res, next) {
    if (req.headers['authorization']) {
      let token = req.headers['authorization'];

      if (token) {
        try {
          let verified = jwt.verify(token, SECRET);

          if (verified.username) {
            next();
          } else {
            res.status(403).json({
              success: false,
              message: 'unauthorized access'
            });
          }
        } catch (err) {
          res.status(403).json({
            success: false,
            message: 'Invalid token'
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: 'Token not found'
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: 'Authorization header missing'
      });
    }
  };
}
