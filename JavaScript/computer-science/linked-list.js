class Node {
  constructor(value = null, nextValue = null) {
    this._value = value;
    this._nextValue = nextValue;
  }
}

class LinkedList {
  constructor() {
    this._head = null;
    this._size = 0;
  }

  prepend(value) {
    this._head = new Node(value, this._head);
    this._size++;
  }

  append(value) {
    const node = new Node(value);
    let current;

    if (!this._head) {
      this._head = node;
    } else {
      current = this._head;

      while (current._nextValue) {
        current = current._nextValue;
      }

      current._nextValue = node;
    }

    this._size++;
  }

  pop() {
    let current, previous;

    current = this._head;

    while (current._nextValue) {
      previous = current;
      current = current._nextValue;
    }

    previous._nextValue = null;
    current = null;
    this._size--;
  }

  insertAt(data, index) {
    if (index > 0 && index > this._size) {
      return;
    }
    if (index === 0) {
      this.prepend(data);
      return;
    }

    const node = new Node(data);
    let current, previous;
    let count = 0;

    current = this._head;

    while (count < index) {
      previous = current;
      count++;
      current = current._nextValue;
    }

    node._nextValue = current;
    previous._nextValue = node;

    this._size++;
  }

  removeAt(index) {
    if (index > 0 && index > this._size) {
      return;
    }

    let current, previous;
    let count = 0;

    current = this._head;

    if (index === 0) {
      this._head = this._head._nextValue;
      this._size--;
      return;
    }

    while (count < index) {
      previous = current;
      count++;
      current = current._nextValue;
    }

    previous._nextValue = current._nextValue;

    this._size--;
  }

  at(index) {
    let current = this._head;
    let count = 0;
    if (index > this._size && index < 0) {
      return;
    }

    if (index === 0) {
      current._value;
      return;
    }

    while (count < index) {
      current = current._nextValue;
      count++;
    }

    console.log(current._value);
  }

  find(value) {
    let exist = false;
    let current = this._head;
    let index = 0;

    while (!exist && current) {
      if (current._value == value) {
        exist = true;
        console.log(index);
        return;
      }
      current = current._nextValue;
      index++;
    }

    if (!exist) {
      console.log(null);
    }
  }

  contains(value) {
    let exist = false;
    let current = this._head;

    while (!exist && current) {
      if (current._value == value) {
        exist = true;
        console.log(exist);
        return;
      }
      current = current._nextValue;
    }

    if (!exist) {
      console.log(false);
    }
  }

  get size() {
    console.log(this._size);
  }

  get head() {
    let current = this._head;
    console.log(current._value);
  }

  get tail() {
    let current = this._head;
    while (current._nextValue) {
      current = current._nextValue;
    }
    console.log(current._value);
  }

  get toString() {
    let current = this._head;
    let result = "";

    while (current) {
      result += "( " + current._value + " ) -> ";
      current = current._nextValue;
    }

    result += "null";
    console.log(result);
  }
}

const list = new LinkedList();
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.insertAt("no lo se", 5);
list.append("turtle");
list.pop();
list.toString;
list.removeAt(0);
list.toString;
// list.size;
// list.head;
// list.tail;
