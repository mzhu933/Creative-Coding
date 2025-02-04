# Creative-Coding


```
let images = [];
let avatars = ["林亚瑞尼亚", "伊梦易来狗", "展麟福音"];
let selectBox;
let gameStarted = false;
let walkers = [];

function preload() {
    for (let i = 1; i <= 3; i++) {
        images.push(loadImage(`images/${i}.jpg`));
    }
}

function setup() {
    createCanvas(800, 800);
    background(170, 200, 230);
    textSize(24);
    textAlign(CENTER, CENTER);
    fill(0);
    text("choose your avatar:", width / 2, 50);

    for (let i = 0; i < images.length; i++) {
        image(images[i], width / 2 - 75 + i * 60, 100, 50, 50);
    }

    selectBox = createSelect();
    selectBox.position(width / 2 - 50, 180);
    avatars.forEach(name => selectBox.option(name));
    selectBox.changed(startGame);
}

function startGame() {
    gameStarted = true;
    selectBox.hide();
    background(170, 200, 230);

    for (let i = 0; i < 30; i++) {
        walkers.push(new Walker(images[0], random(50), random(50)));
        walkers.push(new Walker(images[1], random(width / 2 - 50, width / 2 + 50), random(height - 100, height - 50)));
        walkers.push(new Walker(images[2], random(width - 50, width), random(50)));
    }
}

function draw() {
    if (gameStarted) {
        background(170, 200, 230);
        for (let i = walkers.length - 1; i >= 0; i--) {
            walkers[i].move();
            walkers[i].display();
            
            for (let j = walkers.length - 1; j >= 0; j--) {
                if (i !== j && walkers[i].checkCollision(walkers[j])) {
                    if ((walkers[i].img === images[0] && walkers[j].img === images[1]) ||
                        (walkers[i].img === images[1] && walkers[j].img === images[2]) ||
                        (walkers[i].img === images[2] && walkers[j].img === images[0])) {
                        walkers.splice(j, 1);
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
        this.x += random(-5, 5);
        this.y += random(-5, 5);
        this.x = constrain(this.x, 0, width - this.w);
        this.y = constrain(this.y, 0, height - this.h);
    }

    display() {
        image(this.img, this.x, this.y, this.w, this.h);
    }

    checkCollision(other) {
        return (this.x < other.x + other.w &&
                this.x + this.w > other.x &&
                this.y < other.y + other.h &&
                this.y + this.h > other.y);
    }
}
```


