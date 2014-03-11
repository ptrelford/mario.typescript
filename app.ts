var w = 512, h = 384;

interface Character {
    x: number
    y: number
    vx: number
    vy: number
    dir: string
};

var mario = { x:0, y:0, vx:0, vy:0, dir:"right" };

function drawBackground() {
    var canvas = <HTMLCanvasElement> document.getElementById("canvas");
    canvas.width = w;
    canvas.height = h;

    var context = canvas.getContext("2d")

    context.fillStyle = "rgb(174,238,238)";
    context.fillRect(0, 0, w, h);
    context.fillStyle = "rgb(74,163,41)";
    context.fillRect(0, h - 50, w, 50); 
}

function walk(velocity: CursorKeys.Velocity, character: Character) {
    character.vx = velocity.x;
    if (velocity.x < 0) character.dir = "left";
    else if (velocity.x > 0) character.dir = "right";
}

function jump(velocity:CursorKeys.Velocity, character:Character) {
    if (velocity.y > 0 && character.y == 0) character.vy = 5;    
}

function gravity(character: Character) {
    if (character.y > 0) character.vy -= 0.1;
}

function physics(character: Character) {
    character.x += character.vx;
    character.y = Math.max(0, character.y + character.vy);
}

function verb(character: Character): string {
    if (character.y > 0) return "jump";
    if (character.vx != 0) return "walk";
    return "stand";
}

function update() {
    var canvas = <HTMLCanvasElement> document.getElementById("canvas");
    var image: HTMLElement = document.getElementById("image");
    var arrows = CursorKeys.read();    
    walk(arrows, mario);
    jump(arrows, mario);
    gravity(mario);
    physics(mario);
    image.style.posLeft = w/2-16+mario.x;
    image.style.posTop = canvas.offsetTop + h - 50 - 31 - mario.y;
    var el = <HTMLImageElement> document.getElementById("image");    
    var src = "mario" + verb(mario) + mario.dir + ".gif"
    if (el.src.indexOf(src) == -1) el.src = src;
}

window.onload = () => {
    drawBackground();         
    setInterval(update, 1000/60);
};