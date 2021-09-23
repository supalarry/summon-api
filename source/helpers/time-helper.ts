/**
 * @description Get current date as ISO string: 2011-10-05T14:48:00.000Z
 */
const getTimeStamp = (): string => {
    return new Date().toISOString();
};

export { getTimeStamp };
