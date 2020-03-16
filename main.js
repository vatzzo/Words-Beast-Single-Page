//It handles UI tasks
class UI {
    static expandRightBar(btn) {
        const leftBar = document.querySelector('.left-bar');
        const container = document.querySelector('.container');
        leftBar.classList.toggle('left-bar-active');
        container.classList.toggle('container-active');
    } 

    static getInformation() {
        const text = document.getElementById('text').value;
        const pointerShape = document.getElementById('pointer-shape').value;
        const speed = document.getElementById('speed').value;
        return inputValues = [text,pointerShape, speed];
    }

    static updateText(text) {
        const userText = document.getElementById('user-text');
        userText.textContent = text;
    }

    static updateSpeed(speed) {
        return speed = speed;
    }
}

//It handles exchange with css file
class Style {
    static updateInCSS(textLineHeight) {
        const box = document.querySelector('.box');
        let fontSize = textLineHeight - 1;
        box.style.lineHeight = `${textLineHeight}px`;
        box.style.fontSize = `${fontSize}px`;
    }
}

class RectanglePointers {
    constructor(x,y,width,height,color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.i = 1;
    }

    draw(ctx,w,h) {
        ctx.clearRect(0,0,w,h)
        ctx.fillStyle=this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    animate(speed,w,h) {
        this.x += (this.width*(speed/12));
        if(this.x >= w) {
            this.x = 0;
            this.y += this.height;
        }

        if(this.y >= h){
            this.x = 0;
            this.y = 0;
            const userText = document.getElementById('user-text');
            userText.scrollTo(0,this.i*h);
            this.i++;
        }

      
    }
}

class CirclePointers {
    constructor(x,y,radius,startAngle,endAngle,color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.color = color;
        this.i = 1;
    }

    draw(ctx,w,h) {
        ctx.clearRect(0,0,w,h)
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
        ctx.fillStyle=this.color;
        ctx.fill();
     }

     animate(speed,w,h) {
        this.x += this.radius*2*(speed/12);
        if(this.x >= w) {
            this.x = 0;
            this.y += this.radius*2;
        }
        if(this.y >= h){
            this.x = 0;
            this.y = 0;
            const userText = document.getElementById('user-text');
            userText.scrollTo(0,this.i*h);
            this.i++;
        }
    }
}

//When resize get new canvas dimensions
window.onresize = () => {location.reload();}

//Canvas initial assumptions
const canvas = document.querySelector('.canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth*0.9;
let ctx = canvas.getContext('2d');

//Main
//Expand left bar
const navBtn = document.getElementById('nav-expand-btn');
navBtn.addEventListener('click',UI.expandRightBar);

//Updaate font size and line height
let textLineHeight = canvas.height/20;
Style.updateInCSS(textLineHeight);

//Pointers
const rectangle = new RectanglePointers(0, 0, textLineHeight*2, textLineHeight,'rgba(0,255,0,0.3)');
const square = new RectanglePointers(0, 0, textLineHeight, textLineHeight, 'rgba(0,255,0,0.3)');
const circle = new CirclePointers(textLineHeight/2, textLineHeight/2, textLineHeight/2, 0, 2 * Math.PI, 'rgba(0,255,0,0.3)');

//Animation functions
let inputValues = ['','1',10];
let speed = inputValues[2];
let req = 0; //request

function animateRectangle() {
    rectangle.draw(ctx,canvas.width,canvas.height);
    rectangle.animate(speed,canvas.width,canvas.height);
    req = requestAnimationFrame(animateRectangle);
}

function animateSquare() {
    square.draw(ctx,canvas.width,canvas.height);
    square.animate(speed,canvas.width,canvas.height);
    req = requestAnimationFrame(animateSquare);
}

function animateCircle() {
    circle.draw(ctx,canvas.width,canvas.height);
    circle.animate(speed,canvas.width,canvas.heightm);
    req = requestAnimationFrame(animateCircle);
}

//get and update Information
const confirm = document.getElementById('confirm-btn');
confirm.addEventListener('click', () => {  
    inputValues = UI.getInformation();
    UI.updateText(inputValues[0]);
    speed = UI.updateSpeed(inputValues[2]);
    //animation
    switch(inputValues[1]) {
        case '1':
            rectangle.draw(ctx,canvas.width,canvas.height);
            break;
        case '2':
            square.draw(ctx,canvas.width,canvas.height);
            break;
        case '3':
            circle.draw(ctx,canvas.width,canvas.height);
            break;
    }
}); 

//animation
const bOnOff = document.getElementById('on-off-btn');
let bOnOffState = 'true';

bOnOff.addEventListener('click', () => {
    if(bOnOffState == 'true') {
        bOnOffState = 'false';
        bOnOff.textContent = 'OFF';
        bOnOff.classList.toggle('on-off-btn-offState');
        switch(inputValues[1]) {
            case '1':
                animateRectangle();
                break;
            case '2':
                animateSquare();
                break;
            case '3':
                animateCircle();
                break;
     }
    }else{
        bOnOffState = 'true';
        bOnOff.classList.toggle('on-off-btn-offState');
        bOnOff.textContent = 'ON';
        cancelAnimationFrame(req);
    }
});

//reset
const reset = document.getElementById('restart-btn');
reset.addEventListener('click', ()=>{
    //stop
    cancelAnimationFrame(req);
    bOnOffState = 'true';
    bOnOff.textContent = 'ON';
    //move to initial
    switch(inputValues[1]) {
        case '1':
            rectangle.x=0;
            rectangle.y=0;
            rectangle.i=1;
            rectangle.draw(ctx,canvas.width,canvas.height);
            break;
        case '2':
            square.x = 0;
            square.y = 0;
            square.i = 1;
            square.draw(ctx,canvas.width,canvas.height);
            break;
        case '3':
            circle.x=circle.radius/2;
            circle.y=circle.radius/2;
            circle.i=1;
            circle.draw(ctx,canvas.width,canvas.height);
            break;
    }
    const userText = document.getElementById('user-text');
    userText.scrollTo(0,0);
})

 