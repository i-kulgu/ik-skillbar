let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let W = canvas.width;
let H = canvas.height;
let degrees = 0;
let new_degrees = 0;
let time = 0;
let color = "#ffffff";
let bgcolor = "#5eac1b";
let bgcolor2 = "#1c53a4";
let bgcolor3 = "#ff0000";
let key_to_press;
let g_start, g_end;
let animation_loop;

let streak = 0;
let max_streak = 0;

window.addEventListener('message', function(event){
    if (event.data.type == "open") {
        if (event.data.time == 1) {
            time = 4
        } else {
            time = (event.data.time / 1000) + 10
        }
        draw(time);
    } else if (event.data.type == "close") {
        clearInterval(animation_loop);
        setTimeout(() => {
            document.getElementById("canvas").style.display = "none";
        }, 101);
    }
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function init() {
    ctx.clearRect(0,0,W,H);

    ctx.beginPath();
    ctx.strokeStyle = bgcolor;
    ctx.lineWidth = 5;
    ctx.arc(W / 2, H / 2, 100, 0, Math.PI * 2, false);
    ctx.stroke();

    // Green zone
    ctx.beginPath();
    ctx.strokeStyle = bgcolor2;
    ctx.lineWidth = 20;
    ctx.arc(W / 2, H / 2, 100, g_start - 90 * Math.PI / 180, g_end - 90 * Math.PI / 180, false);
    ctx.stroke();

    // Angle in radians = angle in degrees * PI / 180
    let radians = degrees * Math.PI / 180;
    ctx.beginPath();
    ctx.strokeStyle = bgcolor3;
    ctx.lineWidth = 20;
    ctx.arc(W / 2, H / 2, 100, radians + 265 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
    ctx.stroke();

    // Adding the key_to_press
    ctx.fillStyle = color;
    ctx.font = "100px sans-serif";
    let text_width = ctx.measureText(key_to_press).width;
    ctx.fillText(key_to_press, W / 2 - text_width / 2, H / 2 + 35);
}

function draw(Lengths) {
    if (typeof animation_loop !== undefined) clearInterval(animation_loop);
    g_start = getRandomInt(20,40) / 10;
    g_end = getRandomInt(5,10) / 10;
    g_end = g_start + g_end;

    degrees = 0;
    new_degrees = 360;

    key_to_press = 'E';

    time = Lengths;
    animation_loop = setInterval(animate_to, time);

    setTimeout(() => {
        document.getElementById("canvas").style.display = "block";
    }, 100);
}

function animate_to() {
    if (degrees >= new_degrees) {
        wrong();
        return;
    }
    degrees+=2;
    init();
}

function correct() {
    clearInterval(animation_loop);
    $.post('https://ik-skillbar/success');
    document.getElementById("canvas").style.display = "none";
}

function wrong() {
    clearInterval(animation_loop);
    $.post('https://ik-skillbar/fail');
    document.getElementById("canvas").style.display = "none";
}

document.addEventListener("keydown", function(ev) {
    let key_pressed = ev.code;
    let valid_keys = ['KeyE'];

    if( valid_keys.includes(key_pressed) ){
        if( key_pressed === 'KeyE' ){
            let d_start = (180 / Math.PI) * g_start;
            let d_end = (180 / Math.PI) * g_end;
            if( degrees < d_start ){
                wrong();
            }else if( degrees > d_end ){
                wrong();
            }else{
                correct();
            }
        }else{
            wrong();
        }
    }
});