// JavaScript source code
let settingsImg,spaceshipMenuImg,shopImg,graphImg,shareImg;
let state = "main";

function preload() {loadMenuImages();}

function setup() {
    createCanvas(window.innerWidth,window.innerHeight);
    Background.generate(1);
}

function draw() {
    background(0)

    if(state = "main"){
        Background.update();
        image(settingsImg,width/3,height * (3/4),50,50);
    }
}

function loadMenuImages(){
    settingsImg = loadImage("Images/settings.png");
}

function mouseClicked(){
    if(mouseX > width/3 && mouseX < width/3 + 50)
    {
        if(mouseY > height * (3/4) && mouseY < height * (3/4) + 50)
        {
            openSettings();
        }
    }
}

function openSettings(){
    //music,sound,invert,sensitivity,back,reset,credits
}