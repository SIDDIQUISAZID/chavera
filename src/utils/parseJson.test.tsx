import { parseJSON } from '.';

describe('parseJSON', () => {
    test('should parse a valid JSON string', () => {
        const jsonString = '{"name": "John", "age": 30}';
        const parsedObject = parseJSON<{ name: string; age: number }>(jsonString);
        expect(parsedObject).toEqual({ name: 'John', age: 30 });
    });

    test('should return undefined for a null value', () => {
        const parsedObject = parseJSON<{ name: string; age: number }>(null);
        expect(parsedObject).toBeUndefined();
    });

    test('should return undefined for an empty string', () => {
        const parsedObject = parseJSON<{ name: string; age: number }>('');
        expect(parsedObject).toBeUndefined();
    });

    test('should return undefined for an invalid JSON string', () => {
        const invalidJsonString = '{"name": "John", "age": 30'; // Missing closing brace
        const parsedObject = parseJSON<{ name: string; age: number }>(invalidJsonString);
        expect(parsedObject).toBeUndefined();
    });

    test('should log an error message for an invalid JSON string', () => {
        const invalidJsonString = '{"name": "John", "age": 30'; // Missing closing brace
        console.log = jest.fn(); // Mock console.log

        parseJSON<{ name: string; age: number }>(invalidJsonString);

        expect(console.log).toHaveBeenCalledWith('parsing error:', expect.any(SyntaxError));
    });
});
