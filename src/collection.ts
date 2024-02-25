class Collection {
    items: any[] = [];

  constructor(items: any[] = []) {
    this.items = items;
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

    all()
    {
        return this.items.slice();
    }

    slice(start: number, end: number = this.items.length) {
        if (start < 0) {
            start = this.items.length + start;
        }

        if (end < 0) {
            end = this.items.length + end;
        }

        if (start > end) {
            [start, end] = [end, start];
        }

        if (start > this.items.length) {
            return new Collection();
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

    filter(callback: (item: any) => boolean) {
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
}

function collect(items: any[] = []) {
    return new Collection(items);
}

export { Collection, collect };
