import { Collection, collect } from '../src/collection';

describe('Collection', () => {
    it('should initialize an empty collection when no items are passed to the constructor', () => {
        // Given
        const collection = new Collection();

        // When

        // Then
        expect(collection.items).toEqual([]);
    });

    it('should initialize a collection with the passed items', () => {
        // Given
        const items = [1, 2, 3];

        // When
        const collection = new Collection(items);

        // Then
        expect(collection.items).toEqual(items);
    });
});

describe('add', () => {
    it('should add an item to an empty collection', () => {
        // Given
        const collection = new Collection();

        // When
        collection.add(1);

        // Then
        expect(collection.items).toEqual([1]);
    });

    it('should add an item to the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.add(4);

        // Then
        expect(collection.items).toEqual([1, 2, 3, 4]);
    });
});

describe('remove', () => {
    it('should remove an item from the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.remove(2);

        // Then
        expect(collection.items).toEqual([1, 3]);
    });

    it('should remove the first occurrence of an item from the collection', () => {
        // Given
        const collection = new Collection([1, 2, 2, 3]);

        // When
        collection.remove(2);

        // Then
        expect(collection.items).toEqual([1, 2, 3]);
    });

    it('should remove nothing from an empty collection', () => {
        // Given
        const collection = new Collection();

        // When
        collection.remove(1);

        // Then
        expect(collection.items).toEqual([]);
    });
});

describe('all', () => {
    it('should return the collection items as an array', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const items = collection.all();

        // Then
        expect(items).toEqual([1, 2, 3]);
    });

    it('should return an empty array when the collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const items = collection.all();

        // Then
        expect(items).toEqual([]);
    });

    it('should return a new array when the collection is modified', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const items = collection.all();
        items.push(4);

        // Then
        expect(collection.items).toEqual([1, 2, 3]);
    });
});

describe('forEach', () => {
    it('should perform an operation on each item in the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);
        const operation = jest.fn();

        // When
        collection.forEach(operation);

        // Then
        expect(operation).toHaveBeenCalledTimes(3);
        expect(operation).toHaveBeenNthCalledWith(1, 1, 0, [1, 2, 3]);
        expect(operation).toHaveBeenNthCalledWith(2, 2, 1, [1, 2, 3]);
        expect(operation).toHaveBeenNthCalledWith(3, 3, 2, [1, 2, 3]);
    });

    it('should do nothing when performing an operation on an empty collection', () => {
        // Given
        const collection = new Collection();
        const operation = jest.fn();

        // When
        collection.forEach(operation);

        // Then
        expect(operation).not.toHaveBeenCalled();
    });

    it('should perform an operation on each item in the collection in the correct order', () => {
        // Given
        const collection = new Collection([1, 2, 3]);
        const items: number[] = [];

        // When
        collection.forEach((item: number) => items.push(item));

        // Then
        expect(items).toEqual([1, 2, 3]);
    });

    it('should count the number of items in the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const count = collection.count();

        // Then
        expect(count).toBe(3);
    });
});

describe('count', () => {
    it('should count the number of items in an empty collection', () => {
        // Given
        const collection = new Collection();

        // When
        const count = collection.count();

        // Then
        expect(count).toBe(0);
    });

    it('should count the number of items in the collection after adding an item', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.add(4);
        const count = collection.count();

        // Then
        expect(count).toBe(4);
    });

    it('should count the number of items in the collection after removing an item', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.remove(2);
        const count = collection.count();

        // Then
        expect(count).toBe(2);
    });

    it('should count the number of items in the collection after removing an item that is not in the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.remove(4);
        const count = collection.count();

        // Then
        expect(count).toBe(3);
    });

    it('should count the number of items in the collection after removing an item from an empty collection', () => {
        // Given
        const collection = new Collection();

        // When
        collection.remove(1);
        const count = collection.count();

        // Then
        expect(count).toBe(0);
    });

    it('should count the number of items in the collection after removing all items', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.remove(1);
        collection.remove(2);
        collection.remove(3);
        const count = collection.count();

        // Then
        expect(count).toBe(0);
    });

    it('should count the number of items in the collection after adding and removing items', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.add(4);
        collection.remove(2);
        collection.add(5);
        collection.remove(1);
        const count = collection.count();

        // Then
        expect(count).toBe(3);
    });

    it('should count the number of items in the collection after adding and removing the same item', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.add(4);
        collection.remove(4);
        const count = collection.count();

        // Then
        expect(count).toBe(3);
    });

    it('should count the number of items in the collection after adding and removing the same item multiple times', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.add(4);
        collection.remove(4);
        collection.add(4);
        collection.remove(4);
        collection.add(4);
        collection.remove(4);
        const count = collection.count();

        // Then
        expect(count).toBe(3);
    });

    it('should count the number of items in the collection after adding and removing the same item multiple times in the same operation', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.add(4);
        collection.remove(4);
        collection.add(4);
        collection.remove(4);
        collection.add(4);
        collection.remove(4);
        collection.add(4);
        collection.remove(4);
        const count = collection.count();

        // Then
        expect(count).toBe(3);
    });
});

describe('filter', () => {
    it('should filter the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const filteredCollection = collection.filter((item: number) => item % 2 === 0);

        // Then
        expect(filteredCollection.all()).toEqual([2]);
    });

    it('should filter an empty collection', () => {
        // Given
        const collection = new Collection();

        // When
        const filteredCollection = collection.filter((item: number) => item % 2 === 0);

        // Then
        expect(filteredCollection.all()).toEqual([]);
    });

    it('should filter the collection without modifying the original collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const filteredCollection = collection.filter((item: number) => item % 2 === 0);
        filteredCollection.add(4);

        // Then
        expect(collection.all()).toEqual([1, 2, 3]);
    });

    it('should filter the collection without modifying the filtered collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const filteredCollection = collection.filter((item: number) => item % 2 === 0);
        collection.add(4);

        // Then
        expect(filteredCollection.all()).toEqual([2]);
    });

    it('should filter the collection without modifying the original collection after filtering', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const filteredCollection = collection.filter((item: number) => item % 2 === 0);
        filteredCollection.add(4);
        filteredCollection.remove(2);

        // Then
        expect(collection.all()).toEqual([1, 2, 3]);
    });

    it('should filter the collection without modifying the filtered collection after filtering', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const filteredCollection = collection.filter((item: number) => item % 2 === 0);
        collection.add(4);
        collection.remove(2);

        // Then
        expect(filteredCollection.all()).toEqual([2]);
    });

    it('should filter the collection without modifying the original collection after filtering and modifying', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const filteredCollection = collection.filter((item: number) => item % 2 === 0);
        filteredCollection.add(4);
        filteredCollection.remove(2);
        collection.add(5);

        // Then
        expect(collection.all()).toEqual([1, 2, 3, 5]);
    });
});

describe('map', () => {
    it('should map the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const mappedCollection = collection.map((item: number) => item * 2);

        // Then
        expect(mappedCollection.all()).toEqual([2, 4, 6]);
    });

    it('should map an empty collection', () => {
        // Given
        const collection = new Collection();

        // When
        const mappedCollection = collection.map((item: number) => item * 2);

        // Then
        expect(mappedCollection.all()).toEqual([]);
    });

    it('should map the collection without modifying the original collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const mappedCollection = collection.map((item: number) => item * 2);
        mappedCollection.add(8);

        // Then
        expect(collection.all()).toEqual([1, 2, 3]);
    });

    it('should return the collection without undefined values when mapping the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const mappedCollection = collection.map((item: number) => item % 2 === 0 ? item : undefined);

        // Then
        expect(mappedCollection.all()).toEqual([2]);
    });
});

describe('pluck', () => {
    it('should pluck the value of a given key from the collection', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 3},
        ]);

        // When
        const pluckedCollection = collection.pluck('value');

        // Then
        expect(pluckedCollection.all()).toEqual([1, 2, 3]);
    });

    it('should pluck the value of a given key from an empty collection', () => {
        // Given
        const collection = new Collection();

        // When
        const pluckedCollection = collection.pluck('value');

        // Then
        expect(pluckedCollection.all()).toEqual([]);
    });

    it('should pluck the value of a given key from the collection without modifying the original collection', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 3},
        ]);

        // When
        const pluckedCollection = collection.pluck('value');
        pluckedCollection.add(4);

        // Then
        expect(collection.all()).toEqual([
            {value: 1},
            {value: 2},
            {value: 3},
        ]);
    });

    it('should only pluck the values of a given key in a mixed collection', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 3},
            {other: 4},
        ]);

        // When
        const pluckedCollection = collection.pluck('value');

        // Then
        expect(pluckedCollection.all()).toEqual([1, 2, 3]);
    });
});

describe('average', () => {
    it('should return the average value of a given key of the collection', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 3},
        ]);

        // When
        const result = collection.average('value');

        // Then
        expect(result).toBe(2);
    });

    it('should return the average value of the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.average();

        // Then
        expect(result).toBe(2);
    });

    it('should return 0 when calculating the average of an empty collection', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.average();

        // Then
        expect(result).toBe(0);
    });

    it('should return the average of the values of a given key in a mixed collection', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 3},
            {other: 4},
        ]);

        // When
        const result = collection.average('value');

        // Then
        expect(result).toBe(2);
    });
});

describe('sum', () => {
    it('should return the sum of the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.sum();

        // Then
        expect(result).toBe(6);
    });

    it('should return 0 when calculating the sum of an empty collection', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.sum();

        // Then
        expect(result).toBe(0);
    });

    it('should return the sum of the values of a given key in a mixed collection', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 3},
            {other: 4},
        ]);

        // When
        const result = collection.sum('value');

        // Then
        expect(result).toBe(6);
    });

    it('should return 0 when calculating the sum of the values of a given key in an empty collection', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.sum('value');

        // Then
        expect(result).toBe(0);
    });

    it('should return 0 when calculating the sum of the values of a given key in a collection with no values for the key', () => {
        // Given
        const collection = new Collection([
            {other: 1},
            {other: 2},
            {other: 3},
        ]);

        // When
        const result = collection.sum('value');

        // Then
        expect(result).toBe(0);
    });
});

describe('reduce', () => {
    it('should reduce the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.reduce((accumulator: number, item: number) => accumulator + item, 0);

        // Then
        expect(result).toBe(6);
    });

    it('should reduce an empty collection', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.reduce((accumulator: number, item: number) => accumulator + item, 0);

        // Then
        expect(result).toBe(0);
    });

    it('should reduce the collection without modifying the original collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.reduce((accumulator: number, item: number) => accumulator + item, 0);

        // Then
        expect(collection.all()).toEqual([1, 2, 3]);
    });

    it('should reduce the collection without modifying the original collection after reducing', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.reduce((accumulator: number, item: number) => accumulator + item, 0);
        collection.add(4);

        // Then
        expect(collection.all()).toEqual([1, 2, 3, 4]);
    });
});

describe('collapse', () => {
    it('should return a collection of arrays as a single, flat collection', () => {
        // Given
        const collection = new Collection([[1, 2], [3, 4], [5, 6]]);

        // When
        const result = collection.collapse();

        // Then
        expect(result.all()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should return an empty collection when collapsing an empty collection', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.collapse();

        // Then
        expect(result.all()).toEqual([]);
    });

    it('should return a collection of arrays as a single, flat collection without modifying the original collection', () => {
        // Given
        const collection = new Collection([[1, 2], [3, 4], [5, 6]]);

        // When
        const result = collection.collapse();
        result.add(7);

        // Then
        expect(collection.all()).toEqual([[1, 2], [3, 4], [5, 6]]);
    });

    it('should return a collection of arrays as a single, flat collection without modifying the collapsed collection', () => {
        // Given
        const collection = new Collection([[1, 2], [3, 4], [5, 6]]);

        // When
        const result = collection.collapse();
        collection.add([7, 8]);

        // Then
        expect(result.all()).toEqual([1, 2, 3, 4, 5, 6]);
    });
});

describe('collect method', () => {
    it('should return a collection of the passed items', () => {
        // Given
        const items = [1, 2, 3];

        // When
        const collection = collect(items);

        // Then
        expect(collection.all()).toEqual([1, 2, 3]);
    });

    it('should return an empty collection when no items are passed', () => {
        // Given

        // When
        const collection = collect();

        // Then
        expect(collection.all()).toEqual([]);
    });

    it('should return an empty collection when an empty array is passed', () => {
        // Given
        const items: any[] = [];

        // When
        const collection = collect(items);

        // Then
        expect(collection.all()).toEqual([]);
    });
});

describe ('concat appends the given array or collections values to the end of another collection', () => {
    it('should append the given array values to the end of another collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.concat([4, 5, 6]);

        // Then
        expect(result.all()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should append the given collections values to the end of another collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.concat(new Collection([4, 5, 6]));

        // Then
        expect(result.all()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should return a new collection without modifying the original collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.concat([4, 5, 6]);

        // Then
        expect(collection.all()).toEqual([1, 2, 3]);
    });
});

describe('slice', () => {
    it('should return a new collection with the items from the given start index', () => {
        // Given
        const collection = new Collection([1, 2, 3, 4, 5]);

        // When
        const result = collection.slice(2);

        // Then
        expect(result.all()).toEqual([3, 4, 5]);
    });

    it('should return a new collection with the items from the given start index to the given end index', () => {
        // Given
        const collection = new Collection([1, 2, 3, 4, 5]);

        // When
        const result = collection.slice(2, 4);

        // Then
        expect(result.all()).toEqual([3, 4]);
    });

    it('should return a new collection without modifying the original collection', () => {
        // Given
        const collection = new Collection([1, 2, 3, 4, 5]);

        // When
        collection.slice(2);

        // Then
        expect(collection.all()).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return an empty collection when the start index is greater than the collection length', () => {
        // Given
        const collection = new Collection([1, 2, 3, 4, 5]);

        // When
        const result = collection.slice(5);

        // Then
        expect(result.all()).toEqual([]);
    });

    it(' should return a new collection with the items from the given start index to the given end index when the start index is greater than the end index', () => {
        // Given
        const collection = new Collection([1, 2, 3, 4, 5]);

        // When
        const result = collection.slice(4, 2);

        // Then
        expect(result.all()).toEqual([3, 4]);
    });

    it('should return a new collection with the items from the given start index to the given end index when the start index is negative', () => {
        // Given
        const collection = new Collection([1, 2, 3, 4, 5]);

        // When
        const result = collection.slice(-3, -1);

        // Then
        expect(result.all()).toEqual([3, 4]);
    });

    it('it should return an empty collection when the start index is greater then the collection length', () => {
        // Given
        const collection = new Collection([1, 2, 3, 4, 5]);

        // When
        const result = collection.slice(6);

        // Then
        expect(result.all()).toEqual([]);
    });

    it('should limit the end index to the collection length when the end index is greater than the collection length', () => {
        // Given
        const collection = new Collection([1, 2, 3, 4, 5]);

        // When
        const result = collection.slice(2, 6);

        // Then
        expect(result.all()).toEqual([3, 4, 5]);
    });
});
