import { genSalt, hash, compare } from 'bcrypt';

export  async function hashPassword(pwd) {
  if (!pwd) return;
  const salt = await genSalt(10);
  return await hash(pwd, salt);
}

export  async function validatePassword(inputPwd, bdPwd) {
  const validPassword = await compare(inputPwd, bdPwd);
  if (!validPassword) throw new Error('Invalid credentials');

  return validPassword;
}
