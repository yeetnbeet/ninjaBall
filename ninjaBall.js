//init canvas and variable if needed
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
var platformWidth = 50;
var platformAmount = 10;
var stage = 0;
var startX = 10
var startY = canvas.height - 300;
var startV = 0
const refresh = 20;
const gs = 1*refresh/1000
const padding = 5


function randomNum(min,max){
    var range = max-min;
    var number = Math.floor(Math.random()*range);
    return number+min
}

//create ninja object, includes draw ninja
var ninja = {
    x:startX,
    y:startY,
    mass:100,
    thrust:5,
    energy:100,
    color:"red",
    acc:function(){
        return this.thrust/this.mass;
    },
    vx:startV,
    vy:startV,
    xGoRight:function(){
        if(this.energy>0){
        this.vx+=this.acc();}        
    },
    xGoleft:function(){
        this.vx-=this.acc();
    },
    yGoDown:function(){
        this.vy+=this.acc();
    },
    yGoUp:function(){
        this.vy-=this.acc();
    },
    update:function(){
        this.x+=this.vx;
        this.y+=this.vy;
    },
    wallbounce:function(){
        //this.vx = -this.vx;
        this.vy = -this.vy;
    },
    draw:function(){
        ctx.beginPath();
        ctx.arc(ninja.x,ninja.y,5,0,Math.PI*2);
        ctx.fillStyle = ninja.color;
        ctx.fill();
        ctx.closePath();
    },
    reset:function(){
        ninja.x=startX;
        ninja.y=startY;
        ninja.vx=startV;
        ninja.vy=startV;
    }


};

//create level objects, includes draw level***********

var level = {
    objects:[],
    difficulty:1,
    initObjects:function(){
        this.objects = [{x:0,y:canvas.height-30}];
        
        for(var i = 0; i < platformAmount; i++){
            var object = {
                x:randomNum(20,1000),
                y:randomNum(3,450)
            }
            this.objects.push(object);
        }
    },
    draw:function(){
        
        for(var i = 0; i< this.objects.length; i++){
            
            ctx.beginPath();
            ctx.rect(this.objects[i].x,this.objects[i].y,platformWidth,2);
            ctx.fillStyle = "black";
            ctx.fill();
            ctx.closePath();
        }

    },
    gravity:function(){
        ninja.vy+=gs
    }
    
}




//create engine object
function startGame(e){
    if(e.key== " " || e.key == "Spacebar"){
        document.removeEventListener("keydown",startGame);
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ninja.reset()
        return playGame()
    }
}
function keyDown(e){
    if(e.key == "Right" || e.key == "ArrowRight") {
        ninja.xGoRight();
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        ninja.xGoleft();
        console.log("l")
    }
    else if(e.key == " " || e.key == "Spacebar") {
        ninja.yGoUp();
        console.log("Up");
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        ninja.yGoDown();
        console.log("down");
    }
};

function collision(element){
    if(ninja.x >= element.x && ninja.x <=element.x + platformWidth){
        if(ninja.y <= element.y + padding && ninja.y >= element.y - padding){
            ninja.wallbounce();
            ninja.energy = 100;
        }
    }
}

function collisionCheck(){
    
    level.objects.forEach(function(element){
        collision(element);    
    })

    if(ninja.x>canvas.width){
        stage+=1;
        ninja.x=5;
        level.initObjects();

    }
    else if(ninja.y>canvas.height){
        //game over
        clearInterval(interval);

        displayStart()
    }
}


function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    level.gravity();
    ninja.update();
    collisionCheck();
    ninja.draw()
    level.draw()
    
};

function displayStart(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("GAME OVER", 500, canvas.height/2);
    var score = stage.toString();
    ctx.fillText("SCORE: "+score,50,canvas.height/2 + 40)
    
    

}


//game loop
function playGame(){
    level.initObjects()
    var interval = setInterval(update,refresh)
    return interval
}


document.addEventListener("keydown",keyDown);

var interval = playGame();
    







