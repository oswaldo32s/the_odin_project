class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(sortedArray) {
    if (sortedArray.length === 0) return null;

    const mid = Math.floor(sortedArray.length / 2);
    const root = new Node(sortedArray[mid]);

    root.left = this.buildTree(sortedArray.slice(0, mid));
    root.right = this.buildTree(sortedArray.slice(mid + 1));

    return root;
  }

  insert(value, node = this.root) {
    if (!node) return new Node(value);

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  deleteItem(value, node = this.root) {
    if (!node) return null;

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let minNode = this.findMin(node.right);
      node.data = minNode.data;
      node.right = this.deleteItem(minNode.data, node.right);
    }

    return node;
  }

  findMin(node) {
    while (node.left) node = node.left;
    return node;
  }

  find(value, node = this.root) {
    if (!node || node.data === value) return node;
    return value < node.data
      ? this.find(value, node.left)
      : this.find(value, node.right);
  }

  levelOrder(callback) {
    if (!callback) throw new Error("Se requiere un callback.");
    let queue = [this.root];
    while (queue.length) {
      let node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrder(callback, node = this.root) {
    if (!callback) throw new Error("Se requiere un callback.");
    if (node) {
      this.inOrder(callback, node.left);
      callback(node);
      this.inOrder(callback, node.right);
    }
  }

  preOrder(callback, node = this.root) {
    if (!callback) throw new Error("Se requiere un callback.");
    if (node) {
      callback(node);
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
    }
  }

  postOrder(callback, node = this.root) {
    if (!callback) throw new Error("Se requiere un callback.");
    if (node) {
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      callback(node);
    }
  }

  height(node) {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node, current = this.root, depth = 0) {
    if (!current) return -1;
    if (current === node) return depth;
    return node.data < current.data
      ? this.depth(node, current.left, depth + 1)
      : this.depth(node, current.right, depth + 1);
  }

  isBalanced(node = this.root) {
    if (!node) return true;
    const balanceFactor = Math.abs(
      this.height(node.left) - this.height(node.right)
    );
    return (
      balanceFactor <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    let values = [];
    this.inOrder((node) => values.push(node.data));
    this.root = this.buildTree(values);
  }
}

// Función para visualizar el árbol
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

// 🛠 **Driver Script para probar el árbol**
const randomArray = Array.from({ length: 10 }, () =>
  Math.floor(Math.random() * 100)
);
const tree = new Tree(randomArray);

console.log("Árbol inicial:");
prettyPrint(tree.root);

console.log("¿Está balanceado?", tree.isBalanced());

// 📌 Recorridos iniciales
console.log("Recorrido en orden:");
tree.inOrder((node) => console.log(node.data));

console.log("Recorrido en preorden:");
tree.preOrder((node) => console.log(node.data));

console.log("Recorrido en postorden:");
tree.postOrder((node) => console.log(node.data));

// 🔥 Desbalanceando el árbol con números grandes
tree.insert(150);
tree.insert(200);
tree.insert(300);

console.log("Árbol después de insertar valores grandes:");
prettyPrint(tree.root);

console.log("¿Está balanceado después de la inserción?", tree.isBalanced());

// ⚖️ Rebalanceando el árbol
tree.rebalance();

console.log("Árbol después de rebalanceo:");
prettyPrint(tree.root);

console.log("¿Está balanceado después del rebalanceo?", tree.isBalanced());

// 📌 Recorridos finales
console.log("Recorrido en nivel:");
tree.levelOrder((node) => console.log(node.data));
