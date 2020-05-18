let circle = undefined;
let vector = undefined;
let block = undefined;
function setup()
{
    circle = new Circle(10, 0.05, 20, {x: 0, y: 0});
    block = new Block({x: 150, y: 200}, 500, 50, true, 5);
}
let f = false;
function loop()
{
    addEventListener('keypress', (ev)=>{
        switch(ev.keyCode)
        {
            case 119:
                f = true;
                vector = new Vector2(circle.pos, {x: circle.pos.x, y: circle.pos.y - 15}, 15);
                return ;
            case 97:
                f = true;
                vector = new Vector2(circle.pos, {x: circle.pos.x - 8, y: circle.pos.y}, 15);
                return;
            case 100:
                f = true;
                vector = new Vector2(circle.pos, {x: circle.pos.x + 8, y: circle.pos.y}, 15);
                return ;
            case 115:
                f = true;
                vector = new Vector2(circle.pos, {x: circle.pos.x, y: circle.pos.y + 15}, 15);
                return ;
        }
        
    })
    if(f){
        vector.autoValue();
        circle.addForce(vector);
        f = false;
    }
}