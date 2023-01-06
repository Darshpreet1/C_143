song = "";
leftwristy = 0;
leftwristx = 0;
rightwristy = 0;
rightwristx = 0;
Numberleftwristy = 0;
scoreLeftwristy = 0;

function preload()
{
	song = loadSound("music.mp3");
}

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

    posenet = ml5.poseNet(video,modelLoded);
    posenet.on('pose',gotposes);
}

function draw() {
	image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    
    if(scoreLeftwristy > 0.2){
    circle(leftwristx,leftwristy,20);
    Numberleftwristy = Number(leftwristy);
    volume = floor(leftwristy)/500;
    song.setVolume(volume);
    document.getElementById("volume").innerHTML = "Volume = "+volume;}
}

function modelLoded(){
    console.log("modelLoded");
}

function gotposes(results){
    if(results.length != 0){
    console.log(results);
    leftwristy = results[0].pose.leftWrist.y;
    leftwristx = results[0].pose.leftWrist.x;
    rightwristy = results[0].pose.rightWrist.y;
    rightwristx = results[0].pose.rightWrist.x;
    scoreLeftwristy = results[0].pose.keypoints[9].score;
    console.log("leftWrist y = "+leftwristy +" leftWrist x = "+leftwristx+" rightWrist y = "+rightwristy+" rightWrist x  = "+rightwristx+"leftWristScore = "+scoreLeftwristy);
}}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}