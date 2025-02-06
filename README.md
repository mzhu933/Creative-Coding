# Creative-Coding
# URL: https://mzhu933.github.io/Creative-Coding/
## Theme:
![未命名作品 4](https://github.com/user-attachments/assets/78bb1bb8-e5ff-4d73-a358-3a0ea3fcb3f3)

- My initial plan is to explore a different kind of interactivity: interaction through the eyes or through sound. For example, when the audience opens the code, it captures the surrounding sounds, or these sounds create a rhythm that feeds into the code.

## Plan:
![未命名作品 4_副本](https://github.com/user-attachments/assets/e58376c0-b0a0-456e-a9a7-cce573b90b64)

## first code:

<img width="692" alt="截屏2025-02-04 下午8 59 43" src="https://github.com/user-attachments/assets/f2b0cde2-f8ed-44eb-beb3-341ea8e1736d" />


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

### Disadvantages：
- Running too slow, it will take a long time to finish
- To develop, I change it to
- When images touch the edge of canvas, make it move to opposite way double jump. Change canvas size to 600x600. Change it to when "1.jpg" touch "2.jpg", "2.jpg" become "1.jpg". When "2.jpg" touch "3.jpg", "3.jpg" become "2.jpg". When "3.jpg" touch "1.jpg", "1.jpg"become "3.jpg". 

## Chatgpt：
<img width="938" alt="截屏2025-02-06 下午7 03 57" src="https://github.com/user-attachments/assets/fe9a1b3d-dc73-4a24-935a-db36138784c0" />

<img width="954" alt="截屏2025-02-06 下午7 04 17" src="https://github.com/user-attachments/assets/1ddd0951-9c05-4d53-9ad2-b928f5000b29" />




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
    createCanvas(600, 600);
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
        let stepX = random(-8, 8);
        let stepY = random(-8, 8);
        
        this.x += stepX;
        this.y += stepY;
        
        if (this.x <= 0 || this.x >= width - this.w) {
            this.x -= stepX * 2;
        }
        if (this.y <= 0 || this.y >= height - this.h) {
            this.y -= stepY * 2;
        }
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
<img width="764" alt="截屏2025-02-06 下午7 08 23" src="https://github.com/user-attachments/assets/d9b54454-7893-4366-8a54-e98c84a2fd12" />

- Too fast
- When the first one changed, the others changed before they spread out. It ended too fast.





