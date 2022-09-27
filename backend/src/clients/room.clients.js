import Redis from "ioredis";

const redis = new Redis({
  port: REDIS_PORT,
  host: REDIS_HOST,
  password: REDIS_PASSWORD,
});

class RoomClient {
  static async getRoomPublicAvaliables() {
    const ids = await redis.lrange("rooms", 0, -1);
    const rooms = [];
    for (let i = 0; i < ids.length; i++) {
      const room = await redis.hgetall(ids[i]);

      if (!(room.isRun === "true") && room.type === ROOM_PUBLIC)
        rooms.push(RoomAdapter.create(room));
    }
    return rooms;
  }

  static async getRoomPrivateAvaliables() {
    const ids = await redis.lrange("rooms", 0, -1);
    const rooms = [];
    for (let i = 0; i < ids.length; i++) {
      let room = await redis.hgetall(ids[i]);
      room = JSON.parse(room.data);
      if (!(room.isRun === "true") && room.type === ROOM_PRIVATE)
        rooms.push(RoomAdapter.create(room));
    }
    return rooms;
  }

  static async getRoom(id) {
    const key = `room:${id}`;
    const result = await redis.hgetall(key);
    return JSON.parse(result.data);
  }

  /* na hora de criar a sala o valor data da chave é uma string, tem que usar o parse pra recuperar os dados */
  static async createRoom(data) {
    const key = `room:${data.id}`;
    await redis.hmset(key, {
      data: JSON.stringify(data),
    });
    await redis.rpush("rooms", key);
    const result = await redis.hgetall(key);

    return JSON.parse(result.data);
  }

  static async deleteRoom(id) {
    const key = `room:${id}`;
    await redis.del(key);
    await redis.lrem("rooms", 0, key);
  }

  static async updateRoom(id, data) {
    const key = `room:${id}`;
    let current = await redis.hgetall(key);
    current = JSON.parse(current.data);

    await redis.hmset(
      key,
      JSON.stringify({
        ...current,
        ...data,
      })
    );

    let result = await redis.hgetall(key);
    result = JSON.parse(result.data);
    return result;
  }
}

export { RoomClient };
