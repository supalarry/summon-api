import makeObjectKeysValuesLowerCase from '../../../source/helpers/strings';

describe('makeObjectKeysValuesLowerCase', () => {
    it('should make object keys and values lower case', () => {
        const startingObject = {
            nAme: 'LarRy',
            sURNAmE: 'BaLLer'
        };
        expect(makeObjectKeysValuesLowerCase(startingObject)).toEqual({
            name: 'larry',
            surname: 'baller'
        });
    });
});
