function Tree(begin, end) {
	this.left = null;
	this.right = null;
	this.begin = begin;
	this.end = end;

	this.show = function() {
		if (this.left)
			this.left.show();
		if (this.right)
			this.right.show();

		line(this.begin.x, this.begin.y, this.end.x, this.end.y);
	}

	this.addLeft = function() {
		//Beginning is always the end of the previous branch
		//End is dependent on degree
		var dir = p5.Vector.sub(this.end, this.begin);
		dir.rotate(-PI / 6);
		dir.mult(0.7);
		var b = p5.Vector.add(this.end, dir);
		this.left = new Tree(this.end, b);
	}

	this.addRight = function() {
		var dir = p5.Vector.sub(this.end, this.begin);
		dir.rotate(PI / 6);
		dir.mult(0.7);
		var b = p5.Vector.add(this.end, dir);
		this.right = new Tree(this.end, b);
	}

	this.addBoth = function() {
		this.addLeft();
		this.addRight();
	}

	this.addGeneration = function() {
		if (this.left && this.right) {
			this.left.addGeneration();
			this.right.addGeneration();
		}
		else if (this.left)
			this.left.addGeneration();
		else if (this.right)
			this.right.addGeneration();
		else
			this.addBoth();
	}
}


// Variable that will hold the root of the tree
var tree;

// Creates a tree with X generations of branches
function createTree(x) {
	// Create the root
	var a = createVector(width / 2, height);
	var b = createVector(width / 2, height - 100);
	tree = new Tree(a, b);

	// Create the branches
	createXGenerations(x);
}

// Generates tree's branch generations
function createXGenerations(gen) {
	for (var i = 0; i < gen; i++)
		tree.addGeneration();
}

function setup() {
	// Environment setup
	createCanvas(640, 480);
	background(200);

	createTree(5);

	tree.show();
}