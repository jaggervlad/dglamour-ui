import User from '../models/User';
import { AuthenticationError } from 'apollo-server-micro';
import _ from 'lodash';
import { sign, verify } from 'jsonwebtoken';
import { getTokenCookie } from './auth-cookie';

export async function validateCredentials({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AuthenticationError('Incorrect Credentials, try again');
  }

  try {
    await user.comparePassword(password);
    return user;
  } catch (error) {
    throw new AuthenticationError('Incorrect Credentials, try again');
  }
}

export async function createToken(user) {
  const payload = _.pick(user, ['id', 'email']);

  return sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });
}

export async function getLoginSession(req) {
  const token = getTokenCookie(req);

  if (!token) return;

  const session = verify(token, process.env.JWT_SECRET);
  return session;
}
