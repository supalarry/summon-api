import Logger from '../../../source/services/logger';
import MockDate from 'mockdate';

describe('Logger', () => {
    let namespace: string;
    let message: string;
    let timestampForDateMock: number;
    let mockedDateISOString: string;

    beforeEach(() => {
        namespace = 'logger.unit.test';
        message = 'Hello test';
        // mock date
        timestampForDateMock = 1434319925275;
        MockDate.set(timestampForDateMock);
        mockedDateISOString = new Date(timestampForDateMock).toISOString();
    });
    describe('info', () => {
        const tag = '[INFO]';

        it('should correctly info message', () => {
            // setup
            console.info = jest.fn();
            const expectedInfo = `\[${mockedDateISOString}\] ${tag} [${namespace}] ${message}`;
            // execute
            Logger.info(namespace, message);
            // evalute
            expect(console.info).toHaveBeenCalledWith(expectedInfo);
        });
    });
    afterEach(() => {
        MockDate.reset();
    });
});
