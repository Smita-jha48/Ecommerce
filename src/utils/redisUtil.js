const redis = require('redis');
const redisClient = redis.createClient();
redisClient.on('error', (error) => console.error(`Error : ${error}`));

const get = async (id, typeOfUser) => {
  redisClient.connect();
  const token = await redisClient.get(`token@${typeOfUser}#${id}`);
  redisClient.disconnect();
  return token;
};

const set = async (id, typeOfUser,token) => {
  redisClient.connect();
  await redisClient.set(`token@${typeOfUser}#${id}`, token);
  redisClient.disconnect();
};
module.exports = { get, set };
