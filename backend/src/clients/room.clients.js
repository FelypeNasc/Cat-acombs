import Redis from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const redis = new Redis({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
});

class RoomClient {
  async getAllRooms() {
    const ids = await redis.lrange("rooms", 0, -1);
    console.log("ids", ids);
    const rooms = [];
    for (let i = 0; i < ids.length; i++) {
      const room = await this.getRoomForAllRooms(ids[i]);
      console.log("room", room);
      rooms.push(room);
    }
    return rooms;
  }

  async deleteAllRooms() {
    const ids = await redis.lrange("rooms", 0, -1);
    for (let i = 0; i < ids.length; i++) {
      const room = await this.deleteRoom(ids[i]);
    }
  }
  async clearRedis() {
    await redis.flushall();
  }
  async getRoom(id) {
    const key = `room:${id}`;
    const result = await redis.hgetall(key);
    return JSON.parse(result.data);
  }

  async getRoomForAllRooms(id) {
    const key = `${id}`;
    const result = await redis.hgetall(key);
    return JSON.parse(result.data);
  }
  /* na hora de criar a sala o valor data da chave é uma string, tem que usar o parse pra recuperar os dados */
  async createRoom(data) {
    const key = `room:${data.id}`;
    const stringdata = JSON.stringify(data);
    await redis.hmset(key, {
      data: stringdata,
    });
    await redis.rpush("rooms", key);
    const result = await redis.hgetall(key);
    return JSON.parse(result.data);
  }

  async deleteRoom(id) {
    const key = `room:${id}`;
    await redis.del(key);
    await redis.lrem("rooms", 0, key);
  }

  async updateRoom(id, data) {
    const key = `room:${id}`;
    let current = await redis.hgetall(key);
    current = JSON.parse(current.data);
    const stringdata = JSON.stringify({
      ...current,
      ...data,
    });
    /* console.log("stringdata", stringdata);
    console.log("data.string", { data: stringdata }); */
    await redis.hmset(key, {
      data: stringdata,
    });

    let result = await redis.hgetall(key);

    result = JSON.parse(result.data);
    return result;
  }
}

export { RoomClient };
