import {createClient, defineScript} from 'redis';

export const redisClient = await createClient({
    url: process.env.REDIS_URL,
    scripts: {
        idempotent: defineScript({
            NUMBER_OF_KEYS: 1,
            SCRIPT:
                "local exist = redis.call('exists', KEYS[1]) if exist == 1 then return -1 else redis.call('set', KEYS[1], ARGV[1],'NX', 'EX', ARGV[2]) return 0 end",
            transformArguments(key, expire) {
                return [key, expire.toString(), expire.toString()];
            },
            transformReply(reply) {
                if (reply == -1) return true
                else return false;
            }
        }),
    },
})
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

/**
 * Redis SET
 * @param key
 * @param value
 * @param expire
 * @returns {Promise<ConvertArgumentType<RedisCommandReply<{transformArguments(key: RedisCommandArgument, value: (RedisCommandArgument | number), options?: SetOptions): RedisCommandArguments, SetOptions: {EX?: {EX: number, PX: number, EXAT: number, PXAT: number, KEEPTTL: true}[keyof {EX: number, PX: number, EXAT: number, PXAT: number, KEEPTTL: true}], PX?: {EX: number, PX: number, EXAT: number, PXAT: number, KEEPTTL: true}[keyof {EX: number, PX: number, EXAT: number, PXAT: number, KEEPTTL: true}], EXAT?: {EX: number, PX: number, EXAT: number, PXAT: number, KEEPTTL: true}[keyof {EX: number, PX: number, EXAT: number, PXAT: number, KEEPTTL: true}], PXAT?: {EX: number, PX: number, EXAT: number, PXAT: number, KEEPTTL: true}[keyof {EX: number, PX: number, EXAT: number, PXAT: number, KEEPTTL: true}], KEEPTTL?: {EX: number, PX: number, EXAT: number, PXAT: number, KEEPTTL: true}[keyof {EX: number, PX: number, EXAT: number, PXAT: number, KEEPTTL: true}]} & Partial<Record<never, never>> & {NX?: {NX: true, XX: true}[keyof {NX: true, XX: true}], XX?: {NX: true, XX: true}[keyof {NX: true, XX: true}]} & SetCommonOptions, FIRST_KEY_INDEX: number, transformReply(): (RedisCommandArgument | null)}>, CommandOptions<ClientCommandOptions>["returnBuffers"] extends true ? Buffer : string>>}
 */
export const redis_set = (key, value, expire = 10 * 60) => {
    return redisClient.set(key, value, {EX: expire})
}