let images = [];
let selectBox;
let gameStarted = false;
let walkers = [];
let options = ["select", "o–<", "*", "/|\、"];

function preload() {
    for (let i = 1; i <= 3; i++) {
        images.push(loadImage(`images/${i}.png`));
    }
}

function setup() {
    createCanvas(600, 600);
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
}

function startGame() {
    gameStarted = true;
    selectBox.hide();
    background(255);
    
    for (let i = 0; i < 20; i++) {
        walkers.push(new Walker(images[0], random(10, 200), random(10, 200)));
        walkers.push(new Walker(images[1], random(250, 350), random(400, 550)));
        walkers.push(new Walker(images[2], random(400, 590), random(10, 200)));
    }
}

function draw() {
    if (gameStarted) {
        background(255);
        
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
}

