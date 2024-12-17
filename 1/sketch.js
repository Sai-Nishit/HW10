let song;
let peaks = [];

function preload() {
  song = loadSound('PartB.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  peaks = song.getPeaks(3 * width);
  noLoop(); // Static visualization; draw only once
}

function draw() {
  drawStaticGradientBackground();
  drawStaticSpiral();
  drawStaticCenterCircle();
  drawStaticPosterText();
}

function drawStaticGradientBackground() {
  push();
  noStroke();
  for (let y = 0; y < height; y++) {
    let gradientColor = lerpColor(color('#001f3f'), color('#0074D9'), y / height);
    stroke(gradientColor);
    line(0, y, width, y);
  }
  pop();
}

function drawStaticSpiral() {
  translate(width / 2, height / 2);
  strokeWeight(2);
  noFill();

  for (let i = 0; i < peaks.length; i++) {
    let angle = map(i, 0, peaks.length, 0, TWO_PI * 10); // Create static spiral
    let radius = map(peaks[i], -1, 1, 50, 300);

    let x = cos(angle) * radius;
    let y = sin(angle) * radius;

    let col = lerpColor(color('#ff6b6b'), color('#ffe66d'), peaks[i] * 0.5 + 0.5);
    stroke(col);
    point(x, y);
  }
}

function drawStaticCenterCircle() {
  push();
  noStroke();
  let centerX = width / 2;
  let centerY = height / 2;
  let maxRadius = 80;

  for (let i = maxRadius; i > 0; i -= 4) {
    let t = map(i, 0, maxRadius, 0, 1);
    let gradientColor = lerpColor(color('#6a0dad'), color('#ff7f50'), t);
    fill(gradientColor, 200);
    ellipse(centerX, centerY, i * 2, i * 2);
  }
  pop();
}

function drawStaticPosterText() {
  push();
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  fill(255);
  textSize(48);
  text("Static Spiral Visualization", width / 2, height / 6);

  fill(200);
  textSize(24);
  text("A Moment of Sound", width / 2, height / 6 + 50);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}
