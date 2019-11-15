//init canvas and variable if needed


//create ninja object, includes draw ninja
var rocket = {
    x:50,
    y:50,
    mass:1000,
    thrust:20,
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
    }

};

//create level objects, includes draw level


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