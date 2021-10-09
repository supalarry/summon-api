export default function makeObjectKeysLowerCase<T extends { [key: string]: string | undefined }>(object: T): { [key: string]: string | undefined } {
    const lowerCaseObject: { [key: string]: string | undefined } = {};

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            lowerCaseObject[key.toLocaleLowerCase()] = object[key];
        }
    }

    return lowerCaseObject;
}
