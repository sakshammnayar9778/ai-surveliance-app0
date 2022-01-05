objects = [];
video="";
status="";
function preload(){
    video = createVideo('video.mp4');
    video.hide();
}
function setup(){
canvas = createCanvas(480,380);
canvas.center();
}
function draw(){
image(video , 0, 0, 480, 380);
if( status !=""){
    objectDetector.detect(video,gotResults);
}
}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("mrstatus").innerHTML = "Status: Detecting Objects";
}
function modelloaded(){
    console.log("Your Model Is loaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(results,error){
    if(error){
     console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
    for( i=0 ; i < objects.lenght; i++){
        document.getElementById("mrstatus").innerHTML="Objects Detcted";
        document.getElementById("numberofobjectsdetected").innerHTML="No. of Detected Are"+ objects.lenght;

        fill("#483D8B");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15 , objects[i].y + 15);
         noFill();
         stroke("#483D8B");
        rect( objects[i].x , objects[i].y , objects[i].width , objects[i].height);
    }
}