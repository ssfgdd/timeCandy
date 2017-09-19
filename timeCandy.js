var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=368;
var RADIUS=5;
var MARGIN_LEFT=60;
var MARGIN_TOP=30;

var date=new Date();
var curHours=date.getHours();
var curMinutes=date.getMinutes();
var curSeconds=date.getSeconds();

var balls=[];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF4444","#CC0000","#CCBB55"];
window.onload=function(){
	WINDOW_WIDTH=document.body.clientWidth;
	WINDOW_HEIGHT=document.body.clientHeight;

	MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
	RADIUS=Math.round(WINDOW_WIDTH*4/5/108)-1;
	MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
	var canvas=document.getElementById("canvas");
	var context=canvas.getContext('2d');

	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	context.fillStyle="rgba(255,255,255,0)";
	render(context);
	var timer=setInterval(function(){render(context);update()},50);
}

function update(){
	var date=new Date();
	var newHours=date.getHours();
	var newMinutes=date.getMinutes();
	var newSeconds=date.getSeconds();
	if(parseInt(newHours/10) != parseInt(curHours/10)){
		addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(newHours/10));
	}
	if(parseInt(newHours%10)!=parseInt(curHours%10)){
		addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(newHours%10));
		curHours=newHours;
	}
	if(parseInt(newMinutes/10) != parseInt(curMinutes/10)){
		addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(newMinutes/10));
	}
	if(parseInt(newMinutes%10) != parseInt(curMinutes%10)){
		addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(newMinutes%10));
		curMinutes=newMinutes;
	}
	if(parseInt(newSeconds/10) != parseInt(curSeconds/10)){
		addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(newSeconds/10));
	}
	if(parseInt(newSeconds%10) != parseInt(curSeconds%10)){
		addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(newSeconds%10));
		curSeconds=newSeconds;
	}

	updateBalls();

}

function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		if(balls[i].y>=WINDOW_HEIGHT-RADIUS){
			balls[i].y=WINDOW_HEIGHT-RADIUS;
			balls[i].vy=-balls[i].vy*0.75;
		}
	}
	var cnt=0;
	for(var j=0;j<balls.length;j++){
		if(balls[j].x+RADIUS>0 && balls[j].x-RADIUS<WINDOW_WIDTH){
			balls[cnt++]=balls[j];
		}
	}

	while(balls.length>Math.min(600,cnt)){
		balls.pop();
	}
}

function addBalls(x,y,num){
	for (var i=0;i<digit[num].length ;i++ )
	{
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				var aBall={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					r:RADIUS,
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				
				balls.push(aBall);
			}
		}
	}
}

function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var date=new Date();
	var hours=curHours;
	var minutes=curMinutes;
	var seconds=curSeconds;

	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;

		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		cxt.closePath();
		cxt.lineStyle="#000";
		cxt.lineWidth=1;

		cxt.fill();
		cxt.stroke();
	}
}

function renderDigit(x,y,num,cxt){
	cxt.fillStyle="rgb(255,255,255)";

	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+2*j*(RADIUS+1)+(RADIUS+1),y+2*i*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath;
				cxt.lineStyle="#000";
				cxt.lineWidth=1;

				cxt.fill();
				cxt.stroke();
			}
		}
	}
}