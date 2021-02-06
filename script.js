const score=document.querySelector(".score");
const startScrean=document.querySelector(".startScrean");
const playArea=document.querySelector(".playArea");


const position=["10px","155px","270px","50px","190px","300px"];
let move={
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false
};

let player ={start:false,x:150,y:0,speed:5,score:0};

document.addEventListener('keydown', (e) =>{
    e.preventDefault();
    move[e.key]=true;
    // console.log(move);
    
});
document.addEventListener('keyup', (e) =>{
    e.preventDefault();
    move[e.key]=false;
    // console.log(move);
});

//function for infinity line
const moveLines=() =>{
    let lines=document.querySelectorAll(".lines");
    lines.forEach((item) => {
        if(item.x>730)
            item.x-=730;
        item.x+=player.speed;
        item.style.top=item.x+"px";
    });
}

const endGame= (lscore) => {
    player.start=false;
    startScrean.classList.remove("hide");
    startScrean.innerHTML=`
        Game Over <br>
        Your Score : ${lscore+1}<br>
        Click here to start again.

    `
}

const c = () =>{
    let col=Math.floor(Math.random()*256).toString(16);
    return ("0"+col).substr(-2);
}
const randomColor= () => {
    return "#"+c()+c()+c()
}
//code for infinity enemy car
const moveEnemy=(car,lscore) =>{
    let enemies=document.querySelectorAll(".enemy");
    enemies.forEach((item) => {
        if(item.x>730){
            item.x-=850;
            item.style.marginLeft=position[Math.floor(Math.random()*6)];
        }
        item.x+=player.speed;
        item.style.top=item.x+"px";
        if(isCollision(car,item)){
            endGame(lscore);

        }
    });
}

const isCollision =(car,ecar) =>{
    const carP=car.getBoundingClientRect();
    const enemyp=ecar.getBoundingClientRect();

    return !((carP.top>enemyp.bottom) || (carP.left>enemyp.right) ||((enemyp.top-carP.bottom)>0 || (carP.bottom<enemyp.top)) ||(carP.right<enemyp.left) );

}
const gamePlay =() => {
    // console.log("hi, I am clicked");
    let car=document.querySelector(".car");
    // console.log(playArea.getBoundingClientRect())
    if(player.start){
        moveLines();
        moveEnemy(car,player.score);
        score.classList.remove("hide");

        //code for changing the posiion of the car according to arrow
        if(move.ArrowUp &&car.offsetTop>195) player.y +=player.speed;
        if(move.ArrowDown&&car.offsetTop<515) player.y-=player.speed;
        if(move.ArrowRight&&car.offsetLeft<340) player.x+=player.speed;
        if(move.ArrowLeft &&car.offsetLeft>0) player.x-=player.speed;

        // console.log(move);
        // console.log(car.offsetLeft,car.offsetTop);
        car.style.bottom=player.y +"px";
        car.style.left=player.x+"px";
        player.score++;
        score.innerText="Score : "+ player.score;
        window.requestAnimationFrame(gamePlay);
    }
}
const start= ()=>{
    startScrean.classList.add('hide');
    playArea.innerHTML="";
    player.start=true;
    player.score=0;


    let car=document.createElement("div");
    car.classList.add("car");
     // car.innerText="Hi , i am a car"
    playArea.appendChild(car);
    player.x=car.offsetTop;
    player.y=car.offsetLeft;



    //code for line
    for(let i=0;i<5;i++){
        let line=document.createElement("div");
        line.setAttribute("class","lines");
        line.x=i*145;
        line.style.top= (line.x)+"px";
        line.style.marginLeft=130+"px";
        playArea.appendChild(line);
        // setTimeout(() => {
        //     playArea.removeChild(line);
        // }, 100);
    }
    for(let i=0;i<5;i++){
        let line=document.createElement("div");
        line.setAttribute("class","lines");
        line.x=i*145;
        line.style.top= (line.x)+"px";
        line.style.marginLeft=260+"px";
        playArea.appendChild(line);
        // setTimeout(() => {
        //     playArea.removeChild(line);
        // }, 100);
    }

    //code for create enemy car

    for(let i=0;i<3;i++){
        let enemyCar=document.createElement("div");
        enemyCar.setAttribute("class","enemy");
        enemyCar.x=(i+1)*(-270);
        enemyCar.style.top= (enemyCar.x)+"px";
        enemyCar.style.background=randomColor();
        enemyCar.style.marginLeft=position[Math.floor(Math.random()*6)];
        playArea.appendChild(enemyCar);
        // setTimeout(() => {
        //     playArea.removeChild(line);
        // }, 100);
    }
    window.requestAnimationFrame(gamePlay);

    

    // console.log(car.offsetTop);
    // console.log(car.offsetLeft);
}

startScrean.addEventListener('click',start);
