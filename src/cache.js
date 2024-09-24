class Cache{
    constructor() {
        this.storage = new Map();
    }

    /**
     * @param {string} key - The key to store the value.
     * @param {*} value - The value to store.
     * @param {number} [count=1] - Optional: Number of times the cache can be accessed before it's cleared. Defaults to 1.
     */
    set(key, value, count = 1) {
        this.storage.set(key, { value, count });
    }

    /**
     * @param {string} key - The key to retrieve the value.
     * @returns {*} - The value associated with the key.
     */
    get(key) {
        const entry = this.storage.get(key);
        if (!entry) {
            return null;
        }
        if (entry.count <= 0) {
            this.storage.delete(key);
            return null;
        }
        entry.count -= 1;
        return entry.value;
    }


    /**
     * Method to return cache statistics, showing remaining access counts for each entry.
     * @returns {Array<{key: string, value: *, count: number}>} - List of cache entries with remaining access counts.
     */
    stats() {
        const stats = [];
        this.storage.forEach((value, key) => {
            stats.push({ key: key, value: value.value, count: value.count });
        });
        return stats;
    }
}
export {Cache}