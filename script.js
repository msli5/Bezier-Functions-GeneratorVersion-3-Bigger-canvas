//<Description> Allows you drag handles and export code for drawing bezierVertex, a group of Bezier Curves combined to form a single shape. </Description>
/* Special thanks to sauj123 for some tweaks that make it easier to keep ahold of the handles and prevents handles from snapping to one another */

var centerOffset = 0;
var offsetX = 0; 
var offsetY = 0; 
var bezierThickness = 2;
var which = 0;
var dragCircles = [];

var codeParagraph="";
var codeParagraph2="";

function setup() {
  // Code here runs only once
  createCanvas(800, 800);

  
  offsetX += centerOffset; 
  offsetY += centerOffset; 

translate(offsetX, offsetY);
rotate(0);

  //bezierVertex
createCircle(160, 140);
createCircle(200, 80);
createCircle(280, 120); 
createCircle(160, 240);
createCircle(45, 120); 
createCircle(120, 80);

//bezier()
createCircle(420, 160); 
createCircle(460, 100);
createCircle(540, 160); 
createCircle(640, 140);
  
codeParagraph = createP('');
codeParagraph2 = createP('');
}

function draw() {

background(255); // Clear the Screen White
drawGrid();
drawDraggableCircles();

  
noFill();
stroke(0)
strokeWeight(bezierThickness);

  //bezierVertex
fill(204, 153, 255,70)
beginShape();
vertex(dragCircles[0].x, dragCircles[0].y);
bezierVertex(dragCircles[1].x, dragCircles[1].y, dragCircles[2].x, dragCircles[2].y, dragCircles[3].x, dragCircles[3].y);
bezierVertex(dragCircles[4].x, dragCircles[4].y, dragCircles[5].x, dragCircles[5].y, dragCircles[0].x, dragCircles[0].y);
endShape();

stroke(127, 0, 255, 120); // Handle color light purple
line(dragCircles[3].x,dragCircles[3].y,dragCircles[4].x,dragCircles[4].y);
line(dragCircles[0].x,dragCircles[0].y,dragCircles[5].x,dragCircles[5].y);

stroke(0, 225, 255, 120); // Handle color light blue
line(dragCircles[0].x,dragCircles[0].y,dragCircles[1].x,dragCircles[1].y);
line(dragCircles[2].x,dragCircles[2].y,dragCircles[3].x,dragCircles[3].y);


  //bezier
  stroke(0)
  fill(255, 153, 0,70)
  bezier(dragCircles[6].x, dragCircles[6].y, dragCircles[7].x, dragCircles[7].y, dragCircles[8].x, dragCircles[8].y,dragCircles[9].x, dragCircles[9].y);

  stroke(255, 204, 0, 120); // Handle color light orange
line(dragCircles[6].x,dragCircles[6].y,dragCircles[7].x,dragCircles[7].y);
line(dragCircles[8].x,dragCircles[8].y,dragCircles[9].x,dragCircles[9].y);


  //bezier's coordinate location
  fill(0)
  noStroke()
  textSize(14)
  for (var i = 0; i < dragCircles.length; i++){
  text("("+int(dragCircles[i].x)+", "+int(dragCircles[i].y)+")",int(dragCircles[i].x-25), int(dragCircles[i].y+18))
      }//print dragCircles location
  // text("("+dragCircles[0].x+" ,"+dragCircles[0].y+")", dragCircles[0].x-25, dragCircles[0].y+18)//1st Anchor Point
  // text("("+dragCircles[3].x+" ,"+dragCircles[3].y+")", dragCircles[3].x-25, dragCircles[3].y+18)//2nd Anchor Point
  //   text("("+dragCircles[1].x+" ,"+dragCircles[1].y+")", dragCircles[1].x-25, dragCircles[1].y+18)//1st Control Point
  // text("("+dragCircles[2].x+" ,"+dragCircles[2].y+")", dragCircles[2].x-25, dragCircles[2].y+18)//2nd Control Point
  //     text("("+dragCircles[4].x+" ,"+dragCircles[4].y+")", dragCircles[4].x-25, dragCircles[4].y+18)//3rd Control Point
  // text("("+dragCircles[5].x+" ,"+dragCircles[5].y+")", dragCircles[5].x-25, dragCircles[5].y+18)//4th Control Point
  
  textSize(10)
  text("1st Anchor Point", dragCircles[0].x-30, dragCircles[0].y+28)
  text("2nd Anchor Point", dragCircles[3].x-30, dragCircles[3].y+28)
  text("1st Control Point", dragCircles[1].x-30, dragCircles[1].y+28)
  text("2nd Control Point", dragCircles[2].x-30, dragCircles[2].y+28)
  text("3rd Control Point", dragCircles[4].x-30, dragCircles[4].y+28)
  text("4th Control Point", dragCircles[5].x-30, dragCircles[5].y+28)

  text("1st Anchor Point", dragCircles[6].x-30, dragCircles[6].y+28)
  text("1st Control Point", dragCircles[7].x-30, dragCircles[7].y+28)
  text("2nd Control Point", dragCircles[8].x-30, dragCircles[8].y+28)
  text("2nd Anchor Point", dragCircles[9].x-30, dragCircles[9].y+28)

}


//---------FUCTIONS------------

// When function is called, "push" a new Array entry
function createCircle(cX,cY){
    dragCircles.push({
        x:cX,
        y:cY,
        mouseOver: false,
        circleSize: 12
    });
};

// Cycle through the Array and draw a Circle for each entry
function drawDraggableCircles(){
strokeWeight(1);


    for (var i = 0; i < dragCircles.length; i++){
if(dist(dragCircles[i].x, dragCircles[i].y, mouseX-offsetX, mouseY-offsetY) < dragCircles[i].circleSize/1.5 && (!which || which === i+1)) {
            fill (255, 0, 102, 120); 
        }
        else{ 
            noFill(); 
        }
        ellipse(dragCircles[i].x, dragCircles[i].y, dragCircles[i].circleSize, dragCircles[i].circleSize);
    }
};

function drawGrid(){
    strokeWeight(2); // Line Thickness
    stroke(0, 0, 0, 160);

    // Draw a rectangle around the canvas
  noFill()
  rect(0,0,width,height)
    
    // Draw Gray Grid
  strokeWeight(1); // Line Thickness
  fill(0, 0, 0, 100);
    stroke(140, 140, 140, 75); // light gray
  textSize(10);
    for(var i = 0; i < width ; i = i + 20){// x-axis
        line(i, 0, i, height);
        text(i*2,i*2-10,15);//print x-coordinates
    }
  for(var n = 0; n < height ; n += 20){//y-axis
        line(0, n, width, n);
        text(n*2, 5, n*2+3); //print y-coordinates
    }
};

function mouseDragged(){
    if(!which) {
        // Cycle through the Array
        for (var i = 0; i < dragCircles.length; i++){
            // If Radius Collision Detected...
            if (dist(dragCircles[i].x, dragCircles[i].y, 
                mouseX-offsetX, mouseY-offsetY) < dragCircles[i].circleSize/1.5 ){
                which = i + 1;
                break;
            }
        }
    } else {
        // Move Circle to current Mouse Position
        dragCircles[which - 1].x = mouseX-offsetX;
        dragCircles[which - 1].y = mouseY-offsetY;
    }

//show bezierVertex code that can be copied

  var printIt= "//~~~Copy the bezierVertex(cx2, cy2, cx3, cy3, ax4, ay4) code below~~~\n\nfill(204,153,255,70)\nbeginShape();\nvertex("+int(dragCircles[0].x)+","+int(dragCircles[0].y)+");\nbezierVertex("+int(dragCircles[1].x)+","+int(dragCircles[1].y)+","+int(dragCircles[2].x)+","+int(dragCircles[2].y)+","+int(dragCircles[3].x)+","+int(dragCircles[3].y)+");\nbezierVertex("+int(dragCircles[4].x)+","+int(dragCircles[4].y)+","+int(dragCircles[5].x)+","+int(dragCircles[5].y)+","+int(dragCircles[0].x)+","+int(dragCircles[0].y)+");\nendShape();\n\n";
console.log(printIt)

      //To let the text under the canvas run when mouse is within the canvas. Without this, it is hard to copy the text as the code is consistantly running.
  if(mouseX<=width &&mouseY<=height){
//print code at the bottom of the canvas and use CSS to add line break.
codeParagraph.html(printIt);
codeParagraph.id('just-line-break');
  }
  //show bezier code that can be copied

  var printIt2= "//~~~Copy the bezier(ax1, ay1, cx2, cy2, cx3, cy3, ax4, ay4) code below~~~\n\nfill(255,153,0,70)\nbezier("+int(dragCircles[6].x)+","+int(dragCircles[6].y)+","+int(dragCircles[7].x)+","+int(dragCircles[7].y)+","+int(dragCircles[8].x)+","+int(dragCircles[8].y)+","+int(dragCircles[9].x)+","+int(dragCircles[9].y)+");\n\n";


  
  if(mouseX<=width &&mouseY<=height){
console.log(printIt2)
codeParagraph2.html(printIt2);
codeParagraph2.id('line-break-and-tab');
  }
};

function mouseReleased() {
    which = 0;
};