var ball;
var database;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();
    console.log(database)
}

function draw(){
    background("white");

    readPosition();

    if(keyDown(LEFT_ARROW)){
        changePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+10);
    }
    drawSprites();
}

function readPosition(){
    database.ref('ball/position').on('value', function (data){
        var position = data.val();
        ball.x = position.x;
        ball.y = position.y;
    })

}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;

    database.ref('ball/position').update({x: ball.x, y: ball.y});
}
