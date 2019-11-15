//init canvas and variable if needed
var canvas = document.querySelector("#canvas");
var ctx = canvas.getContext("2d");

function randomNum(min,max){
    var range = max-min;
    var number = Math.floor(Math.random()*range);
    return number+min
}

//create ninja object, includes draw ninja
var ninja = {
    x:canvas.width/2,
    y:canvas.width/2,
    mass:500,
    thrust:20,
    energy:100,
    color:"red",
    acc:function(){
        return this.thrust/this.mass;
    },
    vx:0,
    vy:0,
    xGoRight:function(){
        this.vx+=this.acc();
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
        this.vx = -this.vx;
        this.vy = -this.vx;
    },
    draw:function(){
        ctx.beginPath();
        ctx.arc(ninja.x,ninja.y,5,0,Math.PI*2);
        ctx.fillStyle = ninja.color;
        ctx.fill();
        ctx.closePath();
    }


};

//create level objects, includes draw level***********

var level = {
    objects:[],
    difficulty:1,
    initObjects:function(){
        var amount = 100*this.difficulty;

        
    }
}


//create engine object
function keyDown(e){
    if(e.key == "Right" || e.key == "ArrowRight") {
        rocket.xGoRight();
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        rocket.xGoleft();
        console.log("l")
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        rocket.yGoUp();
        console.log("Up");
    }
    else if(e.key == "Down" || e.key == "ArrowDown") {
        rocket.yGoDown();
        console.log("down");
    }
};


//game loop

ninja.draw();