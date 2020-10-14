
color=["#fece00","#0065ae","#9f971a","#be418d","#f19043","#84c28e","#f2a4b7","#84c28e","#d5c900","#e4b327","#8c5e24","#007e49","#99d4de","#622280"];
var metros = [];
var numberOflines=network.length;
var numberofStationligne1= 12;
var numberofMetroperlign = 4;
var sens=1;
var n=0;
var lines = [];




function startGame() {
    myGameArea.start();
    for(j=0;j<numberOflines;j++){
        var line=[];
        for(i = 0; i < network[j].length; ++i){
        console.log(network[j][i][0]);
         var newStation = new station(network[j][i][0],network[j][i][1],color[j]);
          // var newStation = new station(500*Math.random()+50*i,500*Math.random()+50*j,color[j]);
           // var newStation = new station(60*i+40*j,30*j*Math.pow(-1,j)+40+80,color[j]);
            line.push(newStation);
            }
        lines.push(line);

     }
     for(j=0;j<numberOflines;j++){
        for(k=0;k<numberofMetroperlign;k++){  
        myGamePiece = new metro(10, 10, color[j], lines[j][2*k].x, lines[j][2*k].y,j,2*k,sens);
        metros.push(myGamePiece); 
    }
     }
}
    
    


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width =1000;
        this.canvas.height = 1000;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
       this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
}
function station(x,y,color){
    this.x=x;
    this.y=y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, 15, 15);
}
}

function metro(width, height, color, x, y,j,n,sens) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.j=j;
    this.n=n;
    this.sens=sens;
    this.color=color;
    this.refresh = function(j,n,sens){
        this.update();
        this.movemetro(j,n,sens);
        this.newPos();
    }
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.movemetro =function(j,n,sens){
        var nbstationj=lines[j].length;
        if((this.n==nbstationj-1)&&this.sens==1){
            this.sens=-1;
        }
        else if (this.n==0&& this.sens==-1){
            this.sens=1;
            
        }
        else{
        var firstStationx=lines[j][this.n].x;
        var firstStationy=lines[j][this.n].y;
        var secondstationx=lines[j][this.n+this.sens].x;
        var secondstationy=lines[j][this.n+this.sens].y;
        
        var distanceTofirstStation = Math.sqrt(Math.pow(firstStationy-this.y,2)+Math.pow(firstStationx-this.x,2));
        
        var distanceTosecStation = Math.sqrt(Math.pow(secondstationy-this.y,2)+Math.pow(secondstationx-this.x,2));
        var distanceinterstation= Math.sqrt(Math.pow(secondstationy-firstStationy,2)+Math.pow(secondstationx-firstStationx,2));
                if(distanceTosecStation>5){
                number = this.j;
                speedYabs=(secondstationy-this.y);
                speedXabs=(secondstationx-this.x);
                    if(distanceTofirstStation<distanceinterstation/5 || distanceTosecStation<distanceinterstation/5){
                        mult=1/4;
                    }else{mult=1;}
                this.speedY=mult*speedYabs/((Math.sqrt(Math.pow(speedYabs,2)+Math.pow(speedXabs,2))));
                this.speedX=mult*speedXabs/((Math.sqrt(Math.pow(speedYabs,2)+Math.pow(speedXabs,2))));
                
                }
                else{
                this.speedY=0;
                this.speedX=0;
                    
                this.n=this.n+this.sens;
                }
     }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
    
}

function updateGameArea() {
    myGameArea.clear();
    
 
    for(j=0;j<numberOflines;j++){
        for(i=0;i<network[j].length;i++){
        lines[j][i].update();
        for(k=0;k<numberofMetroperlign;k++){
        metros[numberofMetroperlign*j+k].refresh(j,n,sens);}}
    }
}
