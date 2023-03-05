const {SALT_ROUNDS} = require('../constants');
const bcrypt = require('bcrypt');

const hashPassword = async(password) => {
  const hashedPassword = await bcrypt.hash(password,10);
  console.log(hashedPassword);
  return hashedPassword;

};

const comparePassword = async(password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}

module.exports = {hashPassword, comparePassword};

