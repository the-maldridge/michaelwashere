var c = document.getElementById("header");
var ctx = c.getContext("2d");


var rainChars = "ムタ二コク1234567890シモラキリエスハヌトユABCDEF";
//converting the string into an array of single characters
rainChars= rainChars.split("");

var font_size = 10;
var title_font_size = 35;
var title_text = "Michael Was Here"
var columns=0;
var drops=[];

function resizeHeader() {
    //size the canvas
    c.height = 100;
    c.width = c.parentNode.clientWidth;
    
    title_font_size = c.height * .65;
    columns = c.width/font_size; //number of columns for the rain
    //an array of drops - one per column
    drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for(var x = 0; x < columns; x++) {
	drops[x] = 1;
    }
}

//drawing the characters
function draw() {
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#007500"; //green text
    ctx.font = font_size + "px monospace";
    //looping over drops
    for(var i = 0; i < drops.length; i++)
    {
	//a random chinese character to print
	var text = rainChars[Math.floor(Math.random()*rainChars.length)];
	//x = i*font_size, y = value of drops[i]*font_size
	ctx.fillText(text, i*font_size, drops[i]*font_size);

	//sending the drop back to the top randomly after it has crossed the screen
	//adding a randomness to the reset to make the drops scattered on the Y axis
	if(drops[i]*font_size > c.height && Math.random() > 0.975)
	    drops[i] = 0;

	//incrementing Y coordinate
	drops[i]++;
    }
    drawTitle()
}

function drawTitle() {
    ctx.font= title_font_size + "px monospace";
    x=c.width/2 - ctx.measureText(title_text).width/2;
    y=c.height/2 - title_font_size/2;
    ctx.textBaseline="hanging";
    ctx.fillStyle = "#00FF00";
    ctx.fillText(title_text, x, y);
}

resizeHeader();
draw();
drawTitle("Michael Was Here");
setInterval(draw, 33);
window.addEventListener("resize",resizeHeader);
