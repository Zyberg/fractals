var strokeCol, strokeWeightPx;
var bgColor = 200;

function flickerBg(){
	bgColor += random(-10, 5);
	background(bgColor);
}
 
function drawTree(x1, y1, angle, depth){
	if (depth > 0){
		
		var x2 = x1 + (cos(radians(angle)) * depth * 10.0);
		var y2 = y1 - (sin(radians(angle)) * depth * 10.0);

		line(x1, y1, x2, y2);
		drawTree(x2, y2, angle - random(50), depth - 1);
		drawTree(x2, y2, angle + random(50), depth - 0.5);

		stroke(255 - strokeCol * depth, 0 , 0);
		strokeWeight(depth); 
	}
}

function setup() {
	frameRate(1.25);
	createCanvas(windowWidth, windowHeight);

	strokeCol = floor(255/7);

	background(255);
	noSmooth();
	
	stroke(0);
	strokeWeightPx = 7.0;
	strokeWeight(strokeWeightPx);
}

function draw() {
	flickerBg();
	drawTree(width/2, height - 150, 90, strokeWeightPx);
}