function Tree(begin, end) {
	this.left = null;
	this.right = null;
	this.begin = begin;
	this.end = end;

	this.thickness = 1;
	this.clicked = false;

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

	this.collides = function(x, y) {
		this.collidesFlag(x, y);
		return this.clicked;
	}

	this.collidesFlag = function(x, y) {
		// Function from p5.collide2D
		if (collidePointLine(x, y, begin.x, begin.y, end.x, end.y, buffer=0.5)) {
			console.log("I was clicked");
			this.clicked = true;
		}
		else if (this.left || this.right) {
			if ( this.left ) this.left.collides(x, y);
			if ( this.right ) this.right.collides(x, y);
		}
		else 
			this.clicked = false;
	}

	this.changeColor = function(r, g, b) {
		stroke(r, g, b);
	}

	this.setStroke = function(weight) {
		this.thickness = weight;
		strokeWeight(weight);
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
	tree.setStroke(3);

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

	createTree(5);
}

function mouseClicked() {
	var isOnTree = false;
	isOnTree = tree.collides(mouseX, mouseY);
	if(isOnTree)
		tree.changeColor(random(255), 50, random(100));
	if(!isOnTree)
		console.log('false');
}

function draw() {
	background(200);

	tree.show();
}