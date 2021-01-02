// puissance4 // code : Nicolas Chenard
// 2020, january 

var sonGlisse = new Audio("./p4_snd/go.wav");
var sonPose = new Audio("./p4_snd/pose.wav");
var sonWin = new Audio("./p4_snd/win.ogg");

var can0=document.getElementById('can0');
var ctx0=can0.getContext('2d');
var can1=document.getElementById('can1');
var ctx1=can1.getContext('2d');
var can2=document.getElementById('can2');
var ctx2=can2.getContext('2d');

var imgJ=document.getElementById("imgJ");
var imgR=document.getElementById("imgR");

size=can2.width/7;
demiSize=size/2;
var space=2;
var pas=10;
var posX=0;
var posY=0;
var prevX=0;
var statut="disp";
var joueur=1;
var couleur=[["red","brown"],["yellow","brown"]];

var xMouse=0;
var yMouse=0;
var xDispose=0;
var yDispose=0;
souris=0;
var testerCpt=0;
var gagnant = 0;
var gameTab=[
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [9,9,9,9,9,9,9]
]

clear=function(ctx){
    ctx.clearRect(0,0,can0.width, can0.height);
}

gagnant=function(){
    sonGlisse.pause();
    sonGlisse.currentTime = 0;
    dispose();
    sonPose.play();
    sonWin.play();
    statut="gagnant";
    if(joueur==1){
    ctx2.drawImage(imgR,0+demiSize,0+size)}
    else{ctx2.drawImage(imgJ,0+demiSize,0+size) }
}

posToTab=function(pos){
    if(pos==posY){
        
   return( parseInt((posY-demiSize+pas)/size))
    }
    if(pos==posX){
   return(parseInt(posX/size));
}}

tester=function(){
    testerCpt=0;
    for(i=0;i<4;i++){
//vertical :
        if(gameTab[posToTab(posY)-1+i][posToTab(posX)]!=joueur){
            break;
        }else{
            testerCpt++;
            if(testerCpt==4){gagnant(); break}
            }
        }
//horizontal
testerCpt=0;
    for(i=0;i<4;i++){
        if(gameTab[posToTab(posY)-1][posToTab(posX)+i]!=joueur){// si ça butte à droite
            for(j=0;j<4;j++){
                if(gameTab[posToTab(posY)-1][posToTab(posX)-1-j]!=joueur){ break;}
                    else{
                    
                    testerCpt++;

                if(testerCpt==4){gagnant();break;}
                }
            }
            break;
            }else{//si ça ne butte pas à droite
            testerCpt++;
            if(testerCpt==4){gagnant();break;
            }
        }
    }
// DIAGONALE droite
    testerCpt=0;
    for(i=1;i<5;i++){
        if(posToTab(posY)-1-i>=0 && posToTab(posX)+i<=7){//si on est dans le cadre
            if(gameTab[posToTab(posY)-1-i][posToTab(posX)+i]!=joueur){// si ça butte en haut à droite 
                for(j=1;j<5;j++){// test vers bas gauche
                    if(gameTab[posToTab(posY)-1+j][posToTab(posX)-j]==joueur){ testerCpt++;}else{break;}
                    if(testerCpt==3){gagnant();break;}
                }//for
            break;}
            else{//si c'est un joueur en haut à droite
                if(gameTab[posToTab(posY)-1-i][posToTab(posX)+i]==joueur){ 
                    testerCpt++;
                    if(testerCpt==3){gagnant();break;
                    }
                }
            }// else
    }} // diag haut dr

    // DIAGONALE gauche
    testerCpt=0;
    for(i=1;i<5;i++){
        if(posToTab(posY)-1-i>=0 && posToTab(posX)-i>=-1){//si on est dans le cadre
            if(gameTab[posToTab(posY)-1-i][posToTab(posX)-i]!=joueur){// si ça butte en haut à gauche
                for(j=1;j<5;j++){// test vers bas droite
                    if(gameTab[posToTab(posY)-1+j][posToTab(posX)+j]==joueur){ testerCpt++;}else{break;}
                    if(testerCpt==3){gagnant();break;}
                }//for
            break;}
            else{//si c'est un joueur en haut à gauche
                if(gameTab[posToTab(posY)-1-i][posToTab(posX)-i]==joueur){ 
                    testerCpt++;
                    if(testerCpt==3){gagnant();break;
                    }
                }
            }// else
    }} // diag haut dr
}// func tester

drawPiece=function(x,y,t,color,color2,ctx){
    with(ctx){
    beginPath();
    fillStyle=color;
    arc(x,y,t,0,Math.PI*2);
    fill();
    beginPath();
    arc(x,y,t-2,0,Math.PI*2);
    strokeStyle=color2;
        stroke();
    }
}


drawCase=function(x,y,t,e){ // x&y=position, t = size,  e= size add
    with(ctx2){
        beginPath();
        fillStyle='#1E347A';
        strokeStyle='#28438A';
        arc(x,y,t-e,0,Math.PI);
        lineTo(x-t,y)
        lineTo(x-t,y+t);
        lineTo(x+t,y+t);
        lineTo(x+t,y);
        fill();
        beginPath();
        arc(x,y,t-e,0,Math.PI,-1);
        lineTo(x-t,y);
        lineTo(x-t,y-t);
        lineTo(x+t,y-t);
        lineTo(x+t,y);
        fill();
        beginPath();
        arc(x,y,t-e,0,Math.PI*2);
        strokeStyle='#28438A';
        stroke();
    }//with
}//func drawCase


drawTab=function(){

    for(i=0;i<7;i++){
        for(j=0;j<6;j++){
            drawCase(i*(size)+demiSize,j*(size)+size+demiSize,demiSize,space)
        }
    }
    with(ctx2){
        beginPath();
        moveTo(0,size);
        lineTo(size*7,size);
        lineTo(size*7,size*7);
        lineTo(0,size*7);
        lineTo(0,size);
        strokeStyle='#28438A';
        stroke();
    }//with
}//drawTab


document.addEventListener('mousemove', mouv);
function mouv(e){
    bords=can2.getBoundingClientRect();
    xDispose=e.clientX-bords.left;
    yDispose=e.clientY-bords.top;
  
}


dispose=function(){
    if(souris==1){
      
    posY=(yDispose/yDispose)*size;
    
    
if(gameTab[0][posToTab(posX)]!=0){
    posY=demiSize;
}
if(xDispose>0&&xDispose<7*size&&yDispose>size&&yDispose<7*size){
    clear(ctx1)  
    posX=parseInt(xDispose/size)*size+demiSize;
    drawPiece(posX,posY,demiSize-space*2,couleur[joueur-1][0],couleur[joueur-1][1],ctx1);
    
}// if xDispose
if(statut=="disp")
requestAnimationFrame(dispose);
    }
}// function dispose

tombe=function(){
    sonGlisse.play();
    
    ctx1.clearRect(prevX-demiSize,posY-demiSize-pas,size,size);
    drawPiece(posX,posY,demiSize-space*2,couleur[joueur-1][0],couleur[joueur-1][1],ctx1);
        
    if(gameTab[parseInt((posY-demiSize+pas)/size)][posToTab(posX)]==0){
    posY+=pas;
    requestAnimationFrame(tombe);
    }
    else{
        posY+=pas;
        ctx1.clearRect(prevX-demiSize,posY-demiSize-pas,size,size);
       drawPiece(posX,posY,demiSize-space*2,couleur[joueur-1][0],couleur[joueur-1][1],ctx0);

        gameTab[posToTab(posY)-1][posToTab(posX)]=joueur;
        tester();
        if(statut!="gagnant"){
        yDispose=-20;
        if(joueur==1){joueur=2} else{joueur=1};
        statut="disp";
        sonGlisse.pause();
        sonGlisse.currentTime = 0;
        dispose();
        sonPose.play();
        }
    }
}


document.addEventListener('click', click);

    function click(e){

        if(statut=="disp"){
       
            bords=can2.getBoundingClientRect();
            xMouse=e.clientX-bords.left;
            yMouse=e.clientY-bords.top;
             
            posX=parseInt(xMouse/size)*size+demiSize;
        if(gameTab[posToTab(posY)][posToTab(posX)]==0
        &&xMouse>0&&xMouse<7*size&&yMouse>size&&yMouse<7*size){
            statut="tomb"
            prevX=posX;
           
            tombe();
  }}
}

var startBtn=document.getElementById("start");
startBtn.onclick=function(){
    startGame();
}

startGame=function(){
    gameTab=[
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [9,9,9,9,9,9,9]
    ];
    clear(ctx0);
    clear(ctx1);
    clear(ctx2);
    statut="disp";

    drawTab();
    dispose();
}

testF=function(){

    if(xDispose>0){souris=1;
        clearInterval(test);
    
    dispose();}
}
var test=setInterval(testF,300)

startGame();

