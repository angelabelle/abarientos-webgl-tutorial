let video;
let poseNet;
let pose;
let skeleton;

let earR;
let earL;
let eyeR;
let eyeL;
let nose;
let d;

let spiritedAway;
let phoneC;
let tree;

function preload() {
    //spiritedAway = loadImage('images/spirited3.gif');
    // phoneC = loadModel('objects/phoneC.obj', true);
    tree = loadModel('objects/tree.obj', true);
}

function setup() {
    createCanvas(640, 480, WEBGL);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    //creates an array of data with this function, and runs it through the
    //gotPoses function to store it
    poseNet.on('pose', gotPoses);
    noStroke();
}

//"poses" is the new array
function gotPoses(poses) {
    if (poses.length > 0) {
        //stores the always refreshing pose to a variable
        pose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('poseNet ready');
    select('#status').html("Don't call me a tree head.");
}

function draw() {

    background(0);
    ambientLight(100, 100, 100);
    pointLight(250, 255, 0, width / 4, height / 4);
    scale(-1, 1);
    translate(-width / 2, -height / 2, 0);
    image(video, 0, 0);

    if (pose) {
        earR = pose.rightEar;
        earL = pose.leftEar;
        eyeR = pose.rightEye;
        eyeL = pose.leftEye;
        nose = pose.nose;
        d = dist(earR.x, earR.y, earL.x, earL.y);
        let rotSpeed = .1;
        let degZ = 0;

        push();
        translate(nose.x, nose.y, d);
        scale(.2);
        rotateZ(frameCount * rotSpeed);
        rotateX(radians(90));
        ambientMaterial(0, 200, 100);
        model(tree);
        pop();

        push();
        translate(nose.x, eyeR.y - 70, d);
        scale(.25);
        rotateY(frameCount * -rotSpeed);
        rotateX(radians(180));
        ambientMaterial(0, 200, 100);
        model(tree);
        pop();

        push();
        translate(earR.x + 10, earR.y - 40, d);
        scale(.25);
        rotateX(radians(180));
        rotateY(frameCount * -rotSpeed);
        ambientMaterial(0, 200, 100);
        model(tree);
        pop();

        push();
        translate(eyeR.x, eyeR.y - 60, d);
        scale(.25);
        rotateX(radians(180));
        rotateY(frameCount * rotSpeed);
        ambientMaterial(0, 200, 100);
        model(tree);
        pop();

        push();
        translate(earL.x - 10, earL.y - 40, d);
        scale(.25);
        rotateX(radians(180));
        rotateY(frameCount * -rotSpeed);
        ambientMaterial(0, 200, 100);
        model(tree);
        pop();

        push();
        translate(eyeL.x, eyeL.y - 60, d);
        scale(.25);
        rotateX(radians(180));
        rotateY(frameCount * rotSpeed);
        ambientMaterial(0, 200, 100);
        model(tree);
        pop();
    }
}
