let song;
let fft;
let amplitude;
let particles = [];
let angleOffset = 0;

function preload() {
  song = loadSound('PartA.mp3'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  fft = new p5.FFT();
  amplitude = new p5.Amplitude();
  song.loop();

  // Generate particles
  for (let i = 0; i < 300; i++) {
    particles.push(new Particle(random(360), random(100, 400)));
  }
}

function draw() {
  background(0, 40);

  let spectrum = fft.analyze();
  let vol = amplitude.getLevel();

  translate(width / 2, height / 2);

  // Draw radial particles
  particles.forEach(p => {
    p.update(vol, spectrum);
    p.show();
  });

  angleOffset += 0.5;
}

class Particle {
  constructor(angle, radius) {
    this.angle = angle;      // Starting angle
    this.radius = radius;    // Distance from center
    this.baseRadius = radius;
    this.size = random(3, 8); // Particle size
    this.color = color(random(100, 255), random(0, 150), random(200, 255));
  }

  update(vol, spectrum) {
    let index = floor(map(this.angle, 0, 360, 0, spectrum.length));
    let amp = spectrum[index] || 0;

    // Update radius and size based on volume and spectrum
    this.radius = this.baseRadius + map(amp, 0, 256, -30, 30) + vol * 50;

    // Add slight movement
    this.angle += 0.5 + vol;
  }

  show() {
    let x = this.radius * cos(this.angle + angleOffset);
    let y = this.radius * sin(this.angle + angleOffset);

    fill(this.color);
    noStroke();
    ellipse(x, y, this.size);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.loop();
  }
}
