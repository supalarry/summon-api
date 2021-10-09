import makeObjectKeysLowerCase from '../../../source/helpers/strings';

describe('makeObjectKeysLowerCase', () => {
    it('should make object keys and values lower case', () => {
        const startingObject = {
            nAme: 'LarRy',
            sURNAmE: 'BaLLer'
        };
        expect(makeObjectKeysLowerCase(startingObject)).toEqual({
            name: 'LarRy',
            surname: 'BaLLer'
        });
    });
});
