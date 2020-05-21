/**
 * A nullable implementation of the either pattern
 *
 */
export type Nullable<T> = WithValue<T> | WithoutValue<T>;

/**
 * The non active state. The functions will not be run. except in fold, where the left function will be run.
 */
export class WithoutValue<T> {
    public constructor() { }

    public chain<T1>(_: (x: T) => Nullable<T1>): Nullable<T1> {
        return new WithoutValue<T1>();
    }

    public map<T1>(_: (x: T) => T1): Nullable<T1> {
        return new WithoutValue<T1>();
    }

    public tap(_: (x: T) => void): Nullable<T> {
        return new WithoutValue<T>();
    }

    public fold<T1>(
        _: (x: T) => T1,
        withoutValFn: () => T1
    ): T1 {
        return withoutValFn();
    }

    public inspect(): string {
        return `WithoutValue()`;
    }
}

/**
 * The active state. All functional will be run.
 */
export class WithValue<T> {
    public constructor(private x: T) { }

    public chain<T1>(f: (x: T) => Nullable<T1>): Nullable<T1> {
        return f(this.x);
    }

    public map<T1>(f: (x: T) => T1): Nullable<T1> {
        return new WithValue(f(this.x));
    }

    public tap(f: (x: T) => void): Nullable<T> {
        f(this.x);
        return new WithoutValue<T>();
    }

    public fold<T1>(
        withValFn: (x: T) => T1,
        _: () => T1
    ): T1 {
        return withValFn(this.x);
    }

    public inspect(): string {
        return `WithValue(${this.x})`;
    }
}
