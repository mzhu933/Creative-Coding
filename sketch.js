let images = [];
let selectBox;
let gameStarted = false;
let walkers = [];
let options = ["select", "o–<", "*", "/|\、"];
let circleX, circleY, circleRadius = 35; 



function preload() {
    for (let i = 1; i <= 3; i++) {
        images.push(loadImage(`images/${i}.png`));
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    textFont("serif");
    fill(0);
    text("1 eat 2, 2 eat 3, 3 eat 1", width / 2, 50);
    
    
    for (let i = 0; i < images.length; i++) {
        image(images[i], width / 2 - 75 + i * 60, 100, 50, 50);
    }
    
    
    selectBox = createSelect();
    selectBox.position(width / 2 - 50, 180);
    options.forEach(opt => selectBox.option(opt));
    selectBox.changed(startGame);

    textSize(9);
    textAlign(CENTER, CENTER);
    textFont("Courier New");
    fill(0);
    text(
        "In this cycle, 1 seeks to persuade 2, 2 attempts to influence 3, and 3 ultimately convinces 1.\n" +
        "There is no clear endpoint, yet at a certain point, one element emerges as the dominant force.\n" +
        "This mirrors the feedback mechanisms within the nervous system: neurons release electrical signals\n" +
        "and neurotransmitters, activating surrounding glial cells, whose responses regulate blood flow,\n" +
        "altering the state of the neurons. The fluctuations in blood flow determine the energy and activity\n" +
        "of the neurons, intertwining, adjusting, and feeding back into an ever-shifting loop.\n\n" +
        "Are the decisions made by the brain truly aligned with intention? The answer remains in motion...",
        width / 2, 280
      );
      
}


function startGame() {
    gameStarted = true;
    selectBox.hide();
    background(255);
    
   
    circleX = width / 2;
    circleY = height / 2;
    noFill();
    stroke(0);
    ellipse(circleX, circleY, 70, 70);
    
    
    for (let i = 0; i < 20; i++) {
        walkers.push(new Walker(images[0], random(10, 200), random(10, 200)));
        walkers.push(new Walker(images[1], random(250, 350), random(400, 550)));
        walkers.push(new Walker(images[2], random(400, 590), random(10, 200)));
    }
}

function draw() {
    if (gameStarted) {
        background(255);
        
        
        noFill();
        stroke(0);
        ellipse(circleX, circleY, 70, 70);
        
        
        for (let i = 0; i < walkers.length; i++) {
            walkers[i].move();
            walkers[i].display();
            
            
            for (let j = 0; j < walkers.length; j++) {
                if (i !== j && walkers[i].checkCollision(walkers[j])) {
                    if (walkers[i].img === images[0] && walkers[j].img === images[1]) {
                        walkers[j].img = images[0];
                    } else if (walkers[i].img === images[1] && walkers[j].img === images[2]) {
                        walkers[j].img = images[1];
                    } else if (walkers[i].img === images[2] && walkers[j].img === images[0]) {
                        walkers[j].img = images[2];
                    }
                }
            }
            
            
            if (walkers[i].checkCircleCollision(circleX, circleY, circleRadius)) {
                walkers[i].img = images[walkers[i].originalIndex];
            }
        }
    }
}

class Walker {
    constructor(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;
        this.originalIndex = images.indexOf(img); 
    }

    move() {
        let stepX = random(-3, 3);
        let stepY = random(-3, 3);
        
        this.x += stepX;
        this.y += stepY;
        
        this.x = constrain(this.x, 0, width - this.w);
        this.y = constrain(this.y, 0, height - this.h);
    }

    display() {
        image(this.img, this.x, this.y, this.w, this.h);
    }

    checkCollision(other) {
        return (
            this.x < other.x + other.w &&
            this.x + this.w > other.x &&
            this.y < other.y + other.h &&
            this.y + this.h > other.y
        );
    }

    
    checkCircleCollision(cx, cy, radius) {
        let distX = this.x + this.w / 2 - cx;
        let distY = this.y + this.h / 2 - cy;
        let distance = sqrt(distX * distX + distY * distY);
        return distance < radius + this.w / 2;
    }
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(255);
}

