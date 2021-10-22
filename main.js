song = "";
song2 = "";

scorerightWristY = 0;
scoreleftWristY = 0;

song1_playing = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("DJ.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('Posenet is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftWristY = results[0].pose.keypoints[9].score;
        scoreright = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log(" leftWristX = " + leftWristX + "leftWristY =" + leftWristY);

        scorerightWristY = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(" rightWristX = " + rightWristX + "rightWristY =" + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");
    
   console.log(scoreleftWristY);

    if (scoreleftWristY > 0.05) {
        console.log("inside leftWrist");
        if (song1_playing == "") {
            circle(leftWristX, leftWristY, 20);
            song.play();
            song1_playing = "song";


        }
        if (song1_playing == "song2") {
            song2.stop();
            song.play();
            song1_playing = "song";
        }

    }

    if (scorerightWristY > 0.05) {
        if (song1_playing == "") 
        {
            circle(rightWristX, rightWristY, 20);
            song2.play();
            song1_playing = "song2";

        }
        if(song1_playing == "song")
        {
            song.stop();
            song2.play();
            song1_playing = "song2";
        }
    }


}

function play() {
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
    song.play();
}
