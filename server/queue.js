class Node {
	constructor(string, next, prev) {
		this.val = string;
		this.next = next;
		this.prev = prev;
	}
}

class Queue {
	constructor() {
		this.head = null;
		this.tail = null;
	}
	push(string) {
		if (this.head == null) {
			this.head = new Node(string, null, null);
		} else if (this.head.next == null) {
			this.tail = this.head;
			this.head = new Node(string, this.tail, null);
			this.tail.prev = this.head;
		} else {
			this.head = new Node(string, this.head, null);
			this.head.next.prev = this.head;
		}
	}
	pop() {
		if (this.head == this.tail) {
			this.head = null;
			this.tail = null;
		} else {
			this.tail = this.tail.prev;
			this.tail.next.prev = null;
			this.tail.next = null;
		}
	}
	print() {
		for (let i = this.head; i != null; i = i.next) console.log(i.val);
	}
}

module.exports = Queue;
