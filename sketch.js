/* global
  createCanvas resizeCanvas createVector
  windowWidth windowHeight width height
  floor min random abs atan2 map
  stroke noStroke fill circle
  line translate textAlign rotate text resetMatrix
  CENTER HALF_PI PI
  clear
*/
/* eslint-disable no-plusplus */

const step = document.querySelector('input#control');
const texts = document.querySelectorAll('section p');
let particles = [];

class Particle {
  constructor(r) {
    this.v = createVector(random(width), random(height));
    this.r = r || random(4) + 1.5;
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
  }

  update() {
    this.v.x += this.speedX;
    this.v.y += this.speedY;
  }

  walls() {
    if (this.v.x <= -this.r) {
      this.v.x = width;
    } else if (this.v.x >= width + this.r) {
      this.v.x = -this.r;
    }
    if (this.v.y <= -this.r) {
      this.v.y = height;
    } else if (this.v.y >= height + this.r) {
      this.v.y = -this.r;
    }
  }

  draw() {
    noStroke();
    fill(255);
    circle(this.v.x, this.v.y, this.r);
  }
}

function createParticle(amount, radius) {
  particles = [];
  for (let i = 0; i < amount; ++i) {
    particles.push(new Particle(radius));
  }
}

const steps = {
  /* STEP1 */
  goToStep1() {
    if (particles.length > 10 || particles.length === 0) {
      createParticle(10, 10);
    }
  },
  step1() {
    particles.forEach(p => {
      p.update();
      p.walls();
      p.draw();
    });
  },
  /* STEP2 */
  goToStep2() {
    if (particles.length > 10) {
      createParticle(10, 10);
    }
  },
  step2() {
    particles.forEach(p => {
      p.update();
      p.walls();
      p.draw();
    });

    for (let i = 0; i < particles.length; ++i) {
      for (let j = i + 1; j < particles.length; ++j) {
        const p1 = particles[i];
        const p2 = particles[j];
        stroke(255, 0, 0);
        // strokeWeight(10);
        line(p1.v.x, p1.v.y, p2.v.x, p2.v.y);
        const distance = floor(p1.v.dist(p2.v));
        translate(
          (p2.v.x - p1.v.x) / 2 + p1.v.x,
          (p2.v.y - p1.v.y) / 2 + p1.v.y
        );
        textAlign(CENTER, CENTER);
        let angle = atan2(p2.v.y - p1.v.y, p2.v.x - p1.v.x);
        // Flip text if upside down
        if (abs(angle) > HALF_PI) {
          angle += PI;
        }
        rotate(angle);
        text(floor(distance), 0, 0);
        resetMatrix();
      }
    }
  },
  /* STEP3 */
  goToStep3() {
    if (particles.length > 10) {
      createParticle(10, 10);
    }
  },
  step3() {
    particles.forEach(p => {
      p.update();
      p.walls();
      p.draw();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        stroke(255);
        const distance = floor(p1.v.dist(p2.v));
        if (distance < 250) {
          line(p1.v.x, p1.v.y, p2.v.x, p2.v.y);
        }
      }
    }
  },
  /* STEP4 */
  goToStep4() {
    if (particles.length > 10) {
      createParticle(10, 10);
    }
  },
  step4() {
    particles.forEach(p => {
      p.update();
      p.walls();
      p.draw();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const distance = floor(p1.v.dist(p2.v));
        if (distance < 250) {
          stroke(255, map(distance, 0, 250, 255, 0));
          line(p1.v.x, p1.v.y, p2.v.x, p2.v.y);
        }
      }
    }
  },
  /* STEP5 */
  goToStep5() {
    createParticle(10);
  },
  step5() {
    particles.forEach(p => {
      p.update();
      p.walls();
      p.draw();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const distance = floor(p1.v.dist(p2.v));
        if (distance < 250) {
          stroke(255, map(distance, 0, 250, 255, 0));
          line(p1.v.x, p1.v.y, p2.v.x, p2.v.y);
        }
      }
    }
  },
  /* STEP6 */
  goToStep6() {
    createParticle(200);
  },
  step6() {
    particles.forEach(p => {
      p.update();
      p.walls();
      p.draw();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const distance = floor(p1.v.dist(p2.v));
        if (distance < 250) {
          stroke(255, map(distance, 0, 100, 255, 0));
          line(p1.v.x, p1.v.y, p2.v.x, p2.v.y);
        }
      }
    }
  },
  /* STEP7 */
  goToStep7() {
    createParticle(300);
    // mouseY = height / 2;
  },
  step7() {
    const mouseAmount = abs(((mouseY - height / 2) / (height / 2)) * 250) + 49;
    particles.forEach((p, i) => {
      if (i < mouseAmount) {
        p.update();
        p.walls();
        p.draw();
      }
    });

    const mouseDistance = abs(((mouseX - width / 2) / (width / 2)) * 300);
    for (let i = 0; i < mouseAmount; i++) {
      for (let j = i + 1; j < mouseAmount; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const distance = floor(p1.v.dist(p2.v));
        if (distance < mouseDistance * 0.5) {
          stroke(255, map(distance, 0, mouseDistance * 0.5, 255, 0));
          line(p1.v.x, p1.v.y, p2.v.x, p2.v.y);
        }
      }
    }
  },
};

/* SETUP */
// The setup() function is called once when the program starts.
function setup() {
  // const size = floor(min(windowWidth, windowHeight) * 0.96);
  // mouseX = width / 4;
  // mouseY = height / 2;
  createCanvas(windowWidth, windowHeight);

  if (steps[`goToStep${step.value}`]) {
    steps[`goToStep${step.value}`]();
  }
}

// Called directly after setup(), the draw() function continuously executes the lines of code contained inside its block until the program is stopped or noLoop() is called.
function draw() {
  clear();

  if (steps[`step${step.value}`]) {
    steps[`step${step.value}`]();
  }
  texts.forEach(text => text.classList.add('hide'));
  texts[step.value - 1].classList.remove('hide');
  // texts[step.value - 1].classList.add('display');
}

// The windowResized() function is called once every time the browser window is resized.
function windowResized() {
  // const size = floor(min(windowWidth, windowHeight) * 0.96);
  resizeCanvas(windowWidth, windowHeight);
}

step.addEventListener('input', () => {
  if (steps[`goToStep${step.value}`]) {
    steps[`goToStep${step.value}`]();
  }
});
