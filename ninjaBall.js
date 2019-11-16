//init canvas and variable if needed
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");
var platformWidth = 50;
var platformAmount = 10;
var stage = 0;
var startX = 10
var startY = canvas.height - 300;
var startV = 0;
var workCoef = 1 ;
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
    thrust:10,
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
        if(this.energy>0){
        this.vx-=this.acc();
        }
    },
    yGoDown:function(){
        if(this.energy>0){
        this.vy+=this.acc();
        }
    },
    yGoUp:function(){
        if(this.energy>0){
        this.vy-=this.acc();
        }
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
    },
    useEnergy:function(){
        if(this.energy>0){
            this.energy-=workCoef;
        }
    }


};

//create level objects, includes draw level***********

var level = {
    objects:[],
    difficulty:1,
    initObjects:function(flag){
        if(flag==true){
            this.objects = [{x:0,y:canvas.height-30}];
        }
        else if(flag==false){
            this.objects = [];
        }
        
        
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

        ctx.beginPath();
        ctx.rect(0,canvas.height-5,canvas.width*(ninja.energy/100),5)
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();

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
        ninja.useEnergy();
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        ninja.xGoleft();
        ninja.useEnergy();
        console.log("l")
    }
    else if(e.key == " " || e.key == "Spacebar") {
        ninja.yGoUp();
        ninja.useEnergy();
        console.log("Up");
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        ninja.yGoDown();
        ninja.useEnergy();
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
    if(ninja.y<0){
        ninja.wallbounce();
    }
}

function collisionCheck(){
    
    level.objects.forEach(function(element){
        collision(element);    
    })

    if(ninja.x>canvas.width){
        stage+=1;
        ninja.x=5;
        level.initObjects(false);

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
    level.initObjects(true)
    var interval = setInterval(update,refresh)
    return interval
}


document.addEventListener("keydown",keyDown);

var interval = playGame();
    







