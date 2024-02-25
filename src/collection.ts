class Collection implements Iterable<number> {
    private readonly items: any[] = [];
    private counter = 0;

  constructor(items: any[] = []) {
    this.items = items;
  }

    [Symbol.iterator](): Iterator<number, any, undefined> {
        return this;
    }

  next(): IteratorResult<number> {
      return {
          done: false,
          value: this.counter++
      }
  }

    add(item: any) {
        this.items.push(item);
    }

    remove(item: any) {
        const index = this.items.indexOf(item);

        if (index === -1) {
            return;
        }

        this.items.splice(index, 1);
    }

    all() {
        return this.items.slice();
    }

    slice(start: number, end: number = this.items.length) {
        if (start < 0) {
            start = this.items.length + start;
        }

        if (end < 0) {
            end = this.items.length + end;
        }

        if (start > this.items.length) {
            return new Collection();
        }

        if (start > end) {
            [start, end] = [end, start];
        }

        if (end > this.items.length) {
            end = this.items.length;
        }

        return new Collection(this.items.slice(start, end));
    }

    forEach(callback: (item: any, index: number) => void) {
        this.items.forEach(callback);
    }

    count() {
        return this.items.length;
    }

    filter(callback: (item: any, index: number) => boolean) {
        return new Collection(this.items.filter(callback));
    }

    reduce(callback: (acc: any, item: any) => any, initialValue: any) {
        return this.items.reduce(callback, initialValue);
    }

    map(callback: (item: any) => any) {
        const collection = new Collection(this.items.map(callback));

        return collection.filter((item: any) => item !== undefined);
    }

    pluck(key: string) {
        return this.map(item => item[key]);
    }

    average(key: string|null = null) {
        const values = key ? this.pluck(key) : this;

        if (values.count() === 0) {
            return 0;
        }

        return values.sum() / values.count();
    }

    sum(key: string|null = null) {
        const values = key ? this.pluck(key) : this;

        return values.reduce((acc: number, value: number) => acc + value, 0);
    }

    collapse() {
        return new Collection(this.items.reduce((acc: any[], item: any) => acc.concat(item), []));
    }

    concat(items: any[]|Collection) {
        if (items instanceof Collection) {
            items = items.all();
        }

        return new Collection(this.items.concat(items));
    }

    contains(keyOrValueOrClosure: string|number|((item: any) => boolean), value?: any) {
        if (typeof keyOrValueOrClosure === 'function') {
            return this.items.some(keyOrValueOrClosure);
        }

        if (value !== undefined) {
            return this.items.some(item => item[keyOrValueOrClosure] === value);
        }

        return this.items.includes(keyOrValueOrClosure);
    }

    includes(keyOrValueOrClosure: string|number|((item: any) => boolean), value?: any) {
        return this.contains(keyOrValueOrClosure, value);
    }

    diff(items: any[]|Collection) {
        if (items instanceof Collection) {
            items = items.all();
        }

        return new Collection(this.items.filter(item => !items.includes(item)));
    }

    indexOf(item: any) {
        return this.items.indexOf(item);
    }

    duplicates(key: string|null = null) {
        const items = key ? this.pluck(key) : this;
        const filtered = items.filter((item: any, index: number) => items.indexOf(item) !== index);

        return filtered.unique();
    }

    unique(key: string|null = null) {
        const items = key ? this.pluck(key) : this;

        return items.filter((item: any, index: number) => items.indexOf(item) === index);
    }

    keys() {
        const keys = this.items.reduce((acc: string[], item: any) => {
            if (item === undefined || item === null || item === '' || Number.isNaN(item) || item === false) {
                return acc;
            }

            if (typeof item === 'object') {
                return acc.concat(Object.keys(item));
            }

            return acc.concat(item);
        }, []);

        return new Collection(keys).unique();
    }

    first(keyOrTest?: string|((item: any) => boolean)) {
        if (keyOrTest === undefined) {
            return this.items[0];
        }

        if (typeof keyOrTest === 'function') {
            return this.items.find(keyOrTest);
        }

        return this.items.find(item => item[keyOrTest] !== undefined);
    }

    last(keyOrCallback?: string|((item: any) => boolean)) {
        if (keyOrCallback === undefined) {
            return this.items[this.items.length - 1];
        }

        if (typeof keyOrCallback === 'function') {
            return this.reverse().first(keyOrCallback);
        }

        return this.reverse().first(item => item[keyOrCallback] !== undefined);
    }

    get(key: string, defaultValue: any = undefined) {
        if (this.items[0] === undefined) {
            return defaultValue;
        }

        return this.items[0][key] || defaultValue;
    }


    isEmpty() {
        return this.items.length === 0;
    }

    isNotEmpty() {
        return !this.isEmpty();
    }

    join(separator: string = ',', finalSeparator?: string) {
        if (finalSeparator === undefined) {
            return this.items.join(separator);
        }

        return this.items.slice(0, -1).join(separator) + finalSeparator + this.items.slice(-1);
    }

    reverse() {
        return new Collection(this.items.slice().reverse());
    }

    sort(callback: (a: any, b: any) => number = (a, b) => a - b) {
        return new Collection(this.items.slice().sort(callback));
    }

    toJson() {
        return JSON.stringify(this.items);
    }
}

function collect(items: any[] = []) {
    return new Collection(items);
}

export default { Collection, collect }
