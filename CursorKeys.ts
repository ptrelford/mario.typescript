module CursorKeys {

    var keysPressed = Array();

    document.onkeydown = (e: KeyboardEvent) =>
        keysPressed[e.keyCode] = true;   

    document.onkeyup = (e: KeyboardEvent) =>
        keysPressed[e.keyCode] = false;   

    function isKeyDown(code: number) : boolean
    {
        return keysPressed[code];
    }

    export interface Velocity {
        x: number
        y : number
    }

    function velocity(keyCode) {
        return isKeyDown(keyCode) ? 1 : 0;
    }

    export function read(): Velocity {
        return {
            x: velocity(39) - velocity(37),
            y: velocity(38) - velocity(40)
        };
    }
} 