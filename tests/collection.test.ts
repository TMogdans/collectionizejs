import Collection, { collect } from "../src/collection";

describe('Collection', () => {
    it('should initialize an empty collection when no items are passed to the constructor', () => {
        // Given
        const collection = new Collection();

        // When

        // Then
        expect(collection.all()).toEqual([]);
    });

    it('should initialize a collection with the passed items', () => {
        // Given
        const items = [1, 2, 3];

        // When
        const collection = new Collection(items);

        // Then
        expect(collection.all()).toEqual(items);
    });
});

describe('add', () => {
    it('should add an item to an empty collection', () => {
        // Given
        const collection = new Collection();

        // When
        collection.add(1);

        // Then
        expect(collection.all()).toEqual([1]);
    });

    it('should add an item to the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.add(4);

        // Then
        expect(collection.all()).toEqual([1, 2, 3, 4]);
    });
});

describe('remove', () => {
    it('should remove an item from the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.remove(2);

        // Then
        expect(collection.all()).toEqual([1, 3]);
    });

    it('should remove the first occurrence of an item from the collection', () => {
        // Given
        const collection = new Collection([1, 2, 2, 3]);

        // When
        collection.remove(2);

        // Then
        expect(collection.all()).toEqual([1, 2, 3]);
    });

    it('should remove nothing from an empty collection', () => {
        // Given
        const collection = new Collection();

        // When
        collection.remove(1);

        // Then
        expect(collection.all()).toEqual([]);
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
        expect(collection.all()).toEqual([1, 2, 3]);
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

    it('should filter the collection by a given callback', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const filteredCollection = collection.filter((item: number) => item % 2 === 0);

        // Then
        expect(filteredCollection.all()).toEqual([2]);
    });

    it('should filter the collection by a given callback with the index', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const filteredCollection = collection.filter((item: number, index: number) => index % 2 === 0);

        // Then
        expect(filteredCollection.all()).toEqual([1, 3]);
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

describe('collect', () => {
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

describe('concat', () => {
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
        collection.concat([4, 5, 6]);

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

describe('contains', () => {
    it('should return true when the collection contains the given item', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.contains(2);

        // Then
        expect(result).toBe(true);
    });

    it('should return false when the collection does not contain the given item', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.contains(4);

        // Then
        expect(result).toBe(false);
    });

    it('should return false when the collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.contains(1);

        // Then
        expect(result).toBe(false);
    });

    it('should return true when a given closure returns true for at least one item in the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.contains((item: number) => item % 2 === 0);

        // Then
        expect(result).toBe(true);
    });

    it('should return true when a given key value pair exists in the collection', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 3},
        ]);

        // When
        const result = collection.contains('value', 2);

        // Then
        expect(result).toBe(true);
    });
});

describe('includes', () => {
    it('should return true when the collection includes the given item', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.includes(2);

        // Then
        expect(result).toBe(true);
    });

    it('should return false when the collection does not include the given item', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.includes(4);

        // Then
        expect(result).toBe(false);
    });

    it('should return false when the collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.includes(1);

        // Then
        expect(result).toBe(false);
    });

    it('should return true when a given closure returns true for at least one item in the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.includes((item: number) => item % 2 === 0);

        // Then
        expect(result).toBe(true);
    });

    it('should return true when a given key value pair exists in the collection', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 3},
        ]);

        // When
        const result = collection.includes('value', 2);

        // Then
        expect(result).toBe(true);
    });
});

describe('diff', () => {
    it('should return a new collection with the items that are not present in the given collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);
        const otherCollection = new Collection([2, 3, 4]);

        // When
        const result = collection.diff(otherCollection);

        // Then
        expect(result.all()).toEqual([1]);
    });

    it('should return a new collection without modifying the original collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);
        const otherCollection = new Collection([2, 3, 4]);

        // When
        collection.diff(otherCollection);

        // Then
        expect(collection.all()).toEqual([1, 2, 3]);
    });

    it('should return a new collection without modifying the given collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);
        const otherCollection = new Collection([2, 3, 4]);

        // When
        collection.diff(otherCollection);

        // Then
        expect(otherCollection.all()).toEqual([2, 3, 4]);
    });
});

describe('duplicates', () => {
    it('should return a new collection with the items that are present more than once in the collection', () => {
        // Given
        const collection = new Collection([1, 2, 2, 3, 3, 3]);

        // When
        const result = collection.duplicates();

        // Then
        expect(result.all()).toEqual([2, 3]);
    });

    it('should return a new collection with the items that are present more than once in the collection for a given key', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 2},
            {value: 3},
            {value: 3},
            {value: 3},
        ]);

        // When
        const result = collection.duplicates('value');

        // Then
        expect(result.all()).toEqual([2, 3]);
    });

    it('should return a new collection without modifying the original collection', () => {
        // Given
        const collection = new Collection([1, 2, 2, 3, 3, 3]);

        // When
        collection.duplicates();

        // Then
        expect(collection.all()).toEqual([1, 2, 2, 3, 3, 3]);
    });

    it('should return a new collection without modifying the original collection for a given key', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 2},
            {value: 3},
            {value: 3},
            {value: 3},
        ]);

        // When
        collection.duplicates('value');

        // Then
        expect(collection.all()).toEqual([
            {value: 1},
            {value: 2},
            {value: 2},
            {value: 3},
            {value: 3},
            {value: 3},
        ]);
    });

    it('should return an empty collection when there are no duplicates in the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.duplicates();

        // Then
        expect(result.all()).toEqual([]);
    });

    it('should return an empty collection when there are no duplicates in the collection for a given key', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 3},
        ]);

        // When
        const result = collection.duplicates('value');

        // Then
        expect(result.all()).toEqual([]);
    });

    it('should return an empty collection when the collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.duplicates();

        // Then
        expect(result.all()).toEqual([]);
    });

    it('should return an empty collection when the collection is empty for a given key', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.duplicates('value');

        // Then
        expect(result.all()).toEqual([]);
    });

    it('should return an empty collection when the collection only contains one item', () => {
        // Given
        const collection = new Collection([1]);

        // When
        const result = collection.duplicates();

        // Then
        expect(result.all()).toEqual([]);
    });

    it('should return an empty collection when the collection only contains one item for a given key', () => {
        // Given
        const collection = new Collection([
            {value: 1},
        ]);

        // When
        const result = collection.duplicates('value');

        // Then
        expect(result.all()).toEqual([]);
    });

    it('should return an empty collection when the collection only contains unique items', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.duplicates();

        // Then
        expect(result.all()).toEqual([]);
    });

    it('should return an empty collection when the collection only contains unique items for a given key', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 3},
        ]);

        // When
        const result = collection.duplicates('value');

        // Then
        expect(result.all()).toEqual([]);
    });
});

describe('unique', () => {
    it('should return a new collection with the unique items in the collection', () => {
        // Given
        const collection = new Collection([1, 2, 2, 3, 3, 3]);

        // When
        const result = collection.unique();

        // Then
        expect(result.all()).toEqual([1, 2, 3]);
    });

    it('should return a new collection with the unique items in the collection for a given key', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 2},
            {value: 3},
            {value: 3},
            {value: 3},
            {other: 4}
        ]);

        // When
        const result = collection.unique('value');

        // Then
        expect(result.all()).toEqual([1, 2, 3]);
    });

    it('should return a new collection without modifying the original collection', () => {
        // Given
        const collection = new Collection([1, 2, 2, 3, 3, 3]);

        // When
        collection.unique();

        // Then
        expect(collection.all()).toEqual([1, 2, 2, 3, 3, 3]);
    });

    it('should return a new collection without modifying the original collection for a given key', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 2},
            {value: 3},
            {value: 3},
            {value: 3},
        ]);

        // When
        collection.unique('value');

        // Then
        expect(collection.all()).toEqual([
            {value: 1},
            {value: 2},
            {value: 2},
            {value: 3},
            {value: 3},
            {value: 3},
        ]);
    });

    it('should return an empty collection when the collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.unique();

        // Then
        expect(result.all()).toEqual([]);
    });

    it('should return an empty collection when the collection is empty for a given key', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.unique('value');

        // Then
        expect(result.all()).toEqual([]);
    });

    it('should return an empty collection when the collection only contains one item', () => {
        // Given
        const collection = new Collection([1]);

        // When
        const result = collection.unique();

        // Then
        expect(result.all()).toEqual([1]);
    });
});

describe('keys', () => {
    it('should return a new collection with all the keys of the collection', () => {
        // Given
        const collection = new Collection([{
            name: 'John',
            age: 30,
            city: 'New York',
        }]);

        // When
        const result = collection.keys();

        // Then
        expect(result.all()).toEqual(['name', 'age', 'city']);
    });

    it('should return a new collection without modifying the original collection', () => {
        // Given
        const collection = new Collection([{
            name: 'John',
            age: 30,
            city: 'New York',
        }]);

        // When
        collection.keys();

        // Then
        expect(collection.all()).toEqual([{
            name: 'John',
            age: 30,
            city: 'New York',
        }]);
    });

    it('should return an empty collection when the collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.keys();

        // Then
        expect(result.all()).toEqual([]);
    });

    it('should return an empty collection when the collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.keys();

        // Then
        expect(result.all()).toEqual([]);
    });

    it('should handle null, undefined, empty string, NaN, and false values in the collection', () => {
        // Given
        const collection = new Collection([null, undefined, '', NaN, false]);

        // When
        const result = collection.keys();

        // Then
        expect(result.all()).toEqual([]);
    });
});

describe('first', () => {
    it('should return the first item in the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.first();

        // Then
        expect(result).toBe(1);
    });

    it('should return the first item in the collection for a given key', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 3},
        ]);

        // When
        const result = collection.first('value');

        // Then
        expect(result).toStrictEqual({value: 1});
    });

    it('should return undefined when the collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.first();

        // Then
        expect(result).toBeUndefined();
    });

    it('should return undefined when the collection is empty for a given key', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.first('value');

        // Then
        expect(result).toBeUndefined();
    });
});

describe('last', () => {
    it('should return the last item in the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.last();

        // Then
        expect(result).toBe(3);
    });

    it('should return the last item in the collection for a given key', () => {
        // Given
        const collection = new Collection([
            {value: 1},
            {value: 2},
            {value: 3},
        ]);

        // When
        const result = collection.last('value');

        // Then
        expect(result).toStrictEqual({value: 3});
    });

    it('should return undefined when the collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.last();

        // Then
        expect(result).toBeUndefined();
    });

    it('should return the last item in the collection for a given truth test', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.last((item: number) => item % 2 === 0);

        // Then
        expect(result).toBe(2);
    });
});

describe('get', () => {
    it('should return the item for a given key', () => {
        // Given
        const collection = new Collection([
            {
                name: 'John',
                job: 'Developer'
            },
        ]);

        // When
        const result = collection.get('name');

        // Then
        expect(result).toEqual('John');
    });

    it('should return the item for a given key with a default value', () => {
        // Given
        const collection = new Collection([
            {
                name: 'John',
                job: 'Developer'
            },
        ]);

        // When
        const result = collection.get('age', 30);

        // Then
        expect(result).toEqual(30);
    });

    it('should return undefined if the key does not exist', () => {
        // Given
        const collection = new Collection([
            {
                name: 'John',
                job: 'Developer'
            },
        ]);

        // When
        const result = collection.get('age');

        // Then
        expect(result).toBeUndefined();
    });

    it('should return default value if collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.get('age', 30);

        // Then
        expect(result).toEqual(30);
    });
});

describe('isEmpty', () => {
    it('should return true when the collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.isEmpty();

        // Then
        expect(result).toBe(true);
    });

    it('should return false when the collection is not empty', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.isEmpty();

        // Then
        expect(result).toBe(false);
    });
});

describe('isNotEmpty', () => {
    it('should return false when the collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.isNotEmpty();

        // Then
        expect(result).toBe(false);
    });

    it('should return true when the collection is not empty', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.isNotEmpty();

        // Then
        expect(result).toBe(true);
    });
});

describe('join', () => {
    it('should join the items in the collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.join('-');

        // Then
        expect(result).toBe('1-2-3');
    });

    it('should join the items in the collection with an empty string separator', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.join('');

        // Then
        expect(result).toBe('123');
    });

    it('should join the items in the collection with a default separator', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.join();

        // Then
        expect(result).toBe('1,2,3');
    });

    it('should join the items with a final separator as second argument', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.join('-', ' and ');

        // Then
        expect(result).toBe('1-2 and 3');
    });

    it('should join the items with a final separator as second argument and a default separator', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.join(undefined, ' and ');

        // Then
        expect(result).toBe('1,2 and 3');
    });
});

describe('reverse', () => {
    it('should return a new collection with the items in reverse order', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.reverse();

        // Then
        expect(result.all()).toEqual([3, 2, 1]);
    });

    it('should return a new collection without modifying the original collection', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        collection.reverse();

        // Then
        expect(collection.all()).toEqual([1, 2, 3]);
    });

    it('should return an empty collection when the collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.reverse();

        // Then
        expect(result.all()).toEqual([]);
    });
});

describe('sort', () => {
    it('should return a new collection with the items sorted by their values', () => {
        // Given
        const collection = new Collection([3, 1, 2]);

        // When
        const result = collection.sort();

        // Then
        expect(result.all()).toEqual([1, 2, 3]);
    });

    it('should return a new collection without modifying the original collection', () => {
        // Given
        const collection = new Collection([3, 1, 2]);

        // When
        collection.sort();

        // Then
        expect(collection.all()).toEqual([3, 1, 2]);
    });

    it('should return an empty collection when the collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.sort();

        // Then
        expect(result.all()).toEqual([]);
    });

    it('should return a new collection with the items sorted by a given callback', () => {
        // Given
        const collection = new Collection([
            {value: 3},
            {value: 1},
            {value: 2},
        ]);

        // When
        const result = collection.sort((a: any, b: any) => a.value - b.value);

        // Then
        expect(result.all()).toEqual([
            {value: 1},
            {value: 2},
            {value: 3},
        ]);
    });
});

describe('toJson', () => {
    it('should return the collection as a JSON string', () => {
        // Given
        const collection = new Collection([1, 2, 3]);

        // When
        const result = collection.toJson();

        // Then
        expect(result).toBe('[1,2,3]');
    });

    it('should return an empty JSON array when the collection is empty', () => {
        // Given
        const collection = new Collection();

        // When
        const result = collection.toJson();

        // Then
        expect(result).toBe('[]');
    });
});

describe('iterator', () => {
    it('should return an IteratorResult object with done=false and value=0 on the first call', () => {
        const collection = new Collection([1, 2, 3, 4, 5]);
        const iterator = collection[Symbol.iterator]();

        const result = iterator.next();

        expect(result).toEqual({done: false, value: 0});
    });
});

describe('where', () => {
    it('should return a new collection with the items filtered by a given key value pair', () => {
        // Given
        const collection = collect([
            {name: 'John', age: 30},
            {name: 'Jane', age: 25},
            {name: 'Jim', age: 30},
        ]);

        // When
        const result = collection.where('age', 30);

        // Then
        expect(result.all()).toEqual([
            {name: 'John', age: 30},
            {name: 'Jim', age: 30},
        ]);
    });
});
