import {Cache} from "../src/cache";

test('custom access count', () => {
    const cache = new Cache();
    cache.set('key1', 'value1', 3);
    expect(cache.get('key1')).toBe('value1');
    expect(cache.get('key1')).toBe('value1');
    expect(cache.get('key1')).toBe('value1');
    expect(cache.get('key1')).toBeNull();
});

test('default access count', () => {
    const cache = new Cache();
    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
    expect(cache.get('key1')).toBeNull();
});

test('if the key is not present', () => {
    const cache = new Cache();
    expect(cache.get('notPresent')).toBeNull();
});

test('combine missing key with other keys', () => {
    const cache = new Cache();
    cache.set('key1', 'value1', 2);
    expect(cache.get('key1')).toBe('value1');
    expect(cache.get('notPresent')).toBeNull();
    expect(cache.get('key1')).toBe('value1');
    expect(cache.get('key1')).toBeNull();
});

test('multiple keys with different access counts', () => {
    const cache = new Cache()
    cache.set('key1', 'value1', 3)
    cache.set('key2', 'value2', 2)
    expect(cache.get('key1')).toBe('value1')
    expect(cache.get('key2')).toBe('value2')
    expect(cache.get('key1')).toBe('value1')
    expect(cache.get('key2')).toBe('value2')
    expect(cache.get('key1')).toBe('value1')
    expect(cache.get('key2')).toBeNull()
    expect(cache.get('key1')).toBeNull()
});

test('initial access count of 0', () => {
    const cache = new Cache()
    cache.set('key1', 'value1', 0)
    expect(cache.get('key1')).toBeNull()
});

test('negative initial access count', () => {
    const cache = new Cache()
    cache.set('key1', 'value1', -3)
    expect(cache.get('key1')).toBeNull()
});

test('reset value and access count if use the same key', () => {
    const cache = new Cache()
    cache.set('key1', 'value1', 3)
    expect(cache.get('key1')).toBe('value1')
    cache.set('key1', 'newValue', 3)
    expect(cache.get('key1')).toBe('newValue')
    expect(cache.get('key1')).toBe('newValue')
    expect(cache.get('key1')).toBe('newValue')
    expect(cache.get('key1')).toBeNull()
});

test('correct statistics', () => {
    const cache = new Cache();
    cache.set('key1', 'value1', 3);
    cache.set('key2', 'value2', 2);
    cache.get('key1')
    cache.get('key2')
    expect(cache.stats()).toEqual([
      { key: 'key1', value: 'value1', count: 2 },
      { key: 'key2', value: 'value2', count: 1 }
    ]);
});

test('empty statistics', () => {
    const cache = new Cache()
    expect(cache.stats()).toEqual([])
});