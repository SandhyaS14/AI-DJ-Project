song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeft = 0;
songStatus = "";
scoreRight = 0;
song2Status = "";

function preload() {
    song1 = loadSound("hari_neeve.mp3");
    song2 = loadSound("kadiri.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    pose = ml5.poseNet(video, modelLoaded);
    pose.on("pose", gotResults);
}

function draw() {
    image(video, 0, 0, 500, 500);

    stroke("#ff0000");
    fill("#ff0000");

    songStatus = song1.isPlaying();
    song2Status = song2.isPlaying();

    if(scoreLeft > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if(songStatus == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Song Playing - Hari Neeve";
        }
    }
    if(scoreRight > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if(song2Status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Song Playing - Kadiri Nrusimhudu";
        }
    }
}

function modelLoaded() {
    console.log("PoseNet is initialized");
}

function gotResults(results) {
    if(results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist X: " + leftWristX + "Left wrist Y: " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist X: " + rightWristX + "Right wrist Y: " + rightWristY);

        scoreLeft = results[0].pose.keypoints[9].score;
        scoreRight = results[0].pose.keypoints[10].score;
    }
}