class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity).fill(null).map(() => []);
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.size = 0;
  }

  // Hash function with modulo inside the loop
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Update existing key
        return;
      }
    }

    bucket.push([key, value]); // Insert new key-value pair
    this.size++;

    if (this.size / this.capacity >= this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let [k, v] of bucket) {
      if (k === key) return v;
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    return this.buckets.flat().map(([k]) => k);
  }

  values() {
    return this.buckets.flat().map(([_, v]) => v);
  }

  entries() {
    return this.buckets.flat();
  }

  resize() {
    const newCapacity = this.capacity * 2;
    const newBuckets = new Array(newCapacity).fill(null).map(() => []);

    for (let bucket of this.buckets) {
      for (let [key, value] of bucket) {
        const index = this.hash(key) % newCapacity;
        newBuckets[index].push([key, value]);
      }
    }

    this.buckets = newBuckets;
    this.capacity = newCapacity;
  }
}

// TESTING
const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log("Before expanding:", test.length());
console.log(test.has("carrot"));

test.set("moon", "silver"); // This should trigger resizing
console.log("After expanding:", test.length());
console.log("Keys:", test.keys());
console.log("Values:", test.values());
console.log("Entries:", test.entries());
