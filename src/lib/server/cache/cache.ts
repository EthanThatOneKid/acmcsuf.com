const EXPIRATION_TIMEOUT = 1e3 * 60 * 1; // Cache updates every 1 minute.

export interface CacheInterface<T> {
  set(v: T): void;
  get(): T | undefined;
}

export class Cache<T> implements CacheInterface<T> {
  constructor(
    private data?: T,
    private lastUpdated = 0,
    private expirationTimeout = EXPIRATION_TIMEOUT
  ) {}

  set(v: T, timestamp = Date.now()) {
    this.data = v;
    this.lastUpdated = timestamp;
  }

  get() {
    if (Date.now() > this.lastUpdated + this.expirationTimeout) {
      return;
    }

    return this.data;
  }

  static create<T>(caching = true): CacheInterface<T> {
    return caching ? new Cache<T>() : new NoopCache<T>();
  }
}

export class NoopCache<T> implements CacheInterface<T> {
  set(v: T) {
    return v;
  }

  get() {
    return undefined;
  }
}
