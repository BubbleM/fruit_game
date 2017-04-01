// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// ctx.fillRect(0,0,300,400);
// ctx.beginPath();

// var x=30;
// var y=30;
// var i=0;
// var j=0;

// ctx.fillStyle="#ff0000";

// for(var k=0;k<2;k++){
//     ctx.fillRect(x+i,y+i,30,30);
//     i+=30;
// }
// ctx.fillRect(40,40,30,30);
// console.log(Math.floor(Math.random()*300));//生成随机数

// let y=0;
// let int=self.setInterval("clock()",50);
// let x = Math.floor(Math.random()*300);
// // ctx.fillRect(x,0,30,30);//屏幕顶端生成随机碎片
// function clock() { //生成随机碎片让其垂直掉落
//     ctx.clearRect(0,0,300,400);
//     ctx.fillRect(x,y++,30,30);
// }

// let x=50;
// let y=50;
//
// let player=20;
// function drawPlayer() {
//     ctx.clearRect(0,0,canvas.width,canvas.height);
//     ctx.fillRect(x,y,player,player);
// }
// function left() {
//     if(x<=0){
//         x=canvas.width-player;
//     }else {
//         x-=player;
//     }
// }
// function right() {
//     if(x>=canvas.width-player){
//         x=0;
//     }else{
//         x+=player;
//     }
// }
// function down() {
//     if(y>=canvas.height-player){
//         y=canvas.height-player;
//     }else {
//         y+=player;
//     }
// }
// function top() {
//     if(y<=0){
//         y=0;
//     }else {
//         y-=player;
//     }
// }
// drawPlayer();
// left();
// right();
// down();
// top();
// function keydown(e) {
//     var currKey = e.keyCode;
//     if(currKey >= 37 && currKey <= 40){
//         switch (currKey){
//             case 37:
//                 // x-=20;
//                 left();
//                 break;
//             case 38:
//                 // y-=20;
//                 top();
//                 break;
//             case 39:
//                 // x+=20;
//                 right();
//                 break;
//             case 40:
//                 // y+=20;
//                 down();
//                 break;
//             default:
//                 break;
//         }
//         drawPlayer();
//     }
// }
// document.onkeydown = keydown;

const canvas = document.getElementById('canvas'); // 获取画布
const ctx = canvas.getContext('2d'); //获取该canvas的2D绘图环境对象
number=0;
const basketImg = new Image();
const fruitImgs = new Array(6);
basketImg.src='./img/basket.png';
for(var j=0;j<24;j++){
    fruitImgs[j] = new Image();
    fruitImgs[j].src = "./img/"+j+".png";
}

// let j = 1;
// fruitImg.src="./img/"+j+".png";
// fruitImg.src = './img/1.png';

let game={  // 数据结构
    isover:false,
    spaceShip:{
        x:60,
        y:450
    },
    desire:[]
}

self.setInterval("move()",50);  // 每50毫秒执行一次move()函数

function creatDesire(){  // 生成随即碎片
    let num = Math.floor(Math.random()*700);   //在飞船宽度产生随机数
    game.desire.push({x:num,y:0,z:Math.floor(Math.random()*24)}); //此随机数就是碎片的起始位置
}
function drawDesire(){  // 绘制碎片移动，并判断是否相撞
    ctx.clearRect(0,0,700,600);  // 重新渲染页面
    for(let i = 0;i<game.desire.length;i++){
        ctx.fillStyle='green';
        ctx.drawImage(fruitImgs[game.desire[i].z],game.desire[i].x,game.desire[i].y++,30,30);
        //ctx.fillRect(game.desire[i].x,game.desire[i].y++,30,30); //将desire[]数组中的碎片全部绘制在页面
        if(Math.abs(game.desire[i].x-game.spaceShip.x)<=30 && Math.abs(game.desire[i].y++-game.spaceShip.y)<=30){   //判断碎片与飞船是否位置重叠
            ctx.font="40px Arial";
            ctx.fillStyle="blue";
            // ctx.fillText("Game over!",250,300);
            ctx.fillText("+1",250,300);
            game.isover=true; // 若相撞将isover置为true
            number+=1;
        }
    }


}
function creatShip(){ //绘制飞船
    ctx.fillStyle = '#F08080';
    ctx.drawImage(basketImg,game.spaceShip.x, game.spaceShip.y, 120,140);
    // ctx.fillRect(basketImg,game.spaceShip.x, game.spaceShip.y, 80,100);
}
function move(){

    if(game.isover === true){ // 每50毫秒就会判断是否碰撞
        // return;
    }

    else if(Math.floor(Math.random()*30) % 30 === 1){  // 控制碎片随即出现的数量
        creatDesire();
    }
    drawDesire();

    creatShip();


}

function left(){  //飞船左移
    if(game.spaceShip.x<30)  // 飞船移至左边界出现在右边
        game.spaceShip.x=canvas.width-30;
    else
        game.spaceShip.x-=5;


}
function up(){ //飞船上移
    if(game.spaceShip.y === 0) // 飞船静止在上边界
        game.spaceShip.y=0;
    else
        game.spaceShip.y-=5;

}
function right(){ //飞船右移
    if(game.spaceShip.x===canvas.width-30) // 飞船移至右边界出现在左边
        game.spaceShip.x=0;
    else
        game.spaceShip.x+=5;

}
function down(){ //飞船下移
    if(game.spaceShip.y === canvas.height-30) // 飞船静止在下边界
        y=canvas.height-5;
    else
        game.spaceShip.y+=5;


}
function keyEvent(event){  // 获取键盘事件

    if(event.keyCode === 37){ // left键对应37

        left();

    }else if(event.keyCode === 38){

        up();

    }else if(event.keyCode === 39){

        right();

    }else if(event.keyCode === 40){

        down();
    }

}
function num(){
    alert(number);
    // var span = document.getElementById('num').getElementsByTagName('span');
    // console.log(span);
    // console.log(number);
    // span.innerHTML=number;
}
function myrefresh() {
    window.location.reload();
    number=0;
}