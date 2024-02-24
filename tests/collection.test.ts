import { Collection } from '../src/collection';

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
