# Creative-Coding
# URL: https://mzhu933.github.io/Creative-Coding/
## - Theme:
![未命名作品 4](https://github.com/user-attachments/assets/78bb1bb8-e5ff-4d73-a358-3a0ea3fcb3f3)

- My initial plan is to explore a different kind of interactivity: interaction through the eyes or through sound. For example, when the audience opens the code, it captures the surrounding sounds, or these sounds create a rhythm that feeds into the code.

## - Plan:
![未命名作品 4_副本](https://github.com/user-attachments/assets/e58376c0-b0a0-456e-a9a7-cce573b90b64)

## - First code:

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

### - Disadvantages：
- Running too slow, it will take a long time to finish
- To develop, I change it to
- When images touch the edge of canvas, make it move to opposite way double jump. Change canvas size to 600x600. Change it to when "1.jpg" touch "2.jpg", "2.jpg" become "1.jpg". When "2.jpg" touch "3.jpg", "3.jpg" become "2.jpg". When "3.jpg" touch "1.jpg", "1.jpg"become "3.jpg". 

## - Chatgpt：
<img width="938" alt="截屏2025-02-06 下午7 03 57" src="https://github.com/user-attachments/assets/fe9a1b3d-dc73-4a24-935a-db36138784c0" />

<img width="954" alt="截屏2025-02-06 下午7 04 17" src="https://github.com/user-attachments/assets/1ddd0951-9c05-4d53-9ad2-b928f5000b29" />

## - After change:
<img width="764" alt="截屏2025-02-06 下午7 08 23" src="https://github.com/user-attachments/assets/d9b54454-7893-4366-8a54-e98c84a2fd12" />



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

- Too fast
- When the first one changed, the others changed before they spread out. It ended too fast.

### - Develop theme:
- The human brain is contradictory, never certain which force will take control in the end. It’s like the loop in my code: 1 convinces 2, 2 convinces 3, 3 convinces 1, it basically is like a cycle, but one element always begins to dominate.

![3](https://github.com/user-attachments/assets/518a9cee-d94e-471e-bb28-6581c18dfc62)
![2](https://github.com/user-attachments/assets/06c6e2b7-8e57-4eb9-b4d8-2a02a95fd906)
![1](https://github.com/user-attachments/assets/acd05063-4910-43a1-849f-f719edc5483c)



<img width="653" alt="截屏2025-02-06 下午7 40 51" src="https://github.com/user-attachments/assets/e0987342-18ee-4905-b5a7-671c093a1012" />


## - Reflection on the chatGPT Answer and My Understanding
- Working through this with gpt has given me a deeper insight into how to build interactions between objects in code, particularly the cyclic behavior I had in mind for the images. At first, I knew I wanted to create a sequence where three images randomly moved and transformed upon collision. But it was tricky, how do I make the images change in a continuous, cyclical manner, where one image “eats” the next in line? I could see the mechanics of collision detection, but the actual cycle was harder to pin down.

- What I learned from the chatGPT's guidance was that breaking down the images into an array, like a list of ordered objects, makes this transformation simple. The core idea was understanding the index of each image and letting it guide the logic for change. The formula:

``` let nextImgIndex = (imgIndexA + 1) % images.length; ``` 

- feels almost like a natural flow, it’s an elegant way to loop through the images, where the end always brings you back to the beginning. It gave me a sense of control over how the images interact, like a rhythm I could shape. Instead of checking each pair of images manually, I could let the cycle determine what happens next.

- The process of finding the right image index with ``` indexOf() ``` and comparing it was a small shift in perspective for me. It opened up this way of thinking that allowed the cycle to be dynamic and automatic. No more hard-coding conditions for each image pair; instead, the sequence becomes inherent to how the code is written. The collision detection now feels like a natural extension of the cycle, not a set of isolated events.

- This experience also made me reflect on how I approach problems in general. Sometimes, the solution lies in simplifying the structure of how things are ordered. I had been focusing on the outcome (the images changing) but hadn’t realized the power of just organizing them in a way that the cycle takes care of itself.



### - Feedback:
- The execution of the visual effects could be enhanced, such as by using transparency in your drawings to allow the forms to overlap in a more organic way, and by centring the canvas on the page (the canvas might also be larger, or fill the window).
- making the neurological metaphor more apparent to the user, e.g. via the text prompt and drop-down selection options, which are currently quite enigmatic.
- Need to clearly introduce your creative work (e.g. explain what it is, how it works)
- Add more elements to enhance the interaction between the three images, such as obstacles. (Place a 70x70 circle in the middle, if any of the three png images collide with the circle, they will reset to their original png.)
- Make the movement more dynamic. 
### - Further development:
- Click the circle to make it move to a random position. 
- Or make it follow the mouse.
- Text may possible：YOU! Control the chaos within, click the button - who will conquer... both are you…
- Change color


<img width="719" alt="截屏2025-02-17 上午11 21 07" src="https://github.com/user-attachments/assets/e4707625-8669-455c-be47-581c1f0e2140" />

### - Chatgpt:
<img width="942" alt="截屏2025-02-17 上午11 21 45" src="https://github.com/user-attachments/assets/5e2c5c05-a17f-4393-af89-79f6fb7377d2" />

## - Reflection on Understanding Code from ChatGPT
- The way mousePressed() resets the walkers' images feels like a simple yet direct form of interaction between human intention and code execution. The walkers move, change, and react based on their environment, but with just one click, they return to their original state. It’s like a conversation between me and the code: letting it evolve on its own, but stepping in when I decide to reset things.

- The for loop systematically goes through each walker, making sure none are left unchanged. The originalIndex acts as a memory, a reference point that keeps track of what each walker was before. This makes me think about how code, even when it appears to be constantly shifting, still follows a structured logic beneath the surface.

- Writing and understanding code isn’t just about making things work, it’s about shaping interactions, setting up conditions, and deciding when to interfere. The walkers follow their own cycle, but I, as the user, always have the power to bring them back to their original form.




