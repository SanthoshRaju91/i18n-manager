import { Router } from 'express';

import {
  authenticateUserSCM,
  decryptPassword,
  readSalt
} from '../../utils/connection';

const authRoutes = new Router();

authRoutes.post('/authenticate', async (req, res, next) => {
  try {
    let { username, password } = req.body;
    let { name, token } = await authenticateUserSCM(username, password);

    if (token) {
      res.status(200).json({
        success: true,
        token,
        name
      });
    } else {
      res.json({});
    }
  } catch (err) {
    next(err);
  }
});

export default authRoutes;
