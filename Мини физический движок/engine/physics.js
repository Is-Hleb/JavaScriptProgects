class Vector2{
    constructor(pos_start = {x: 0, y: 0}, pos_end = {x: 0, y: 0}, value = 0)
    {
        this.pos_start = pos_start;
        this.pos_end = pos_end;
        this.value = value;
    }
    autoValue()
    {
        this.value = Math.floor(Math.sqrt(Math.pow(Math.abs(this.pos_start.x - this.pos_end.x), 2) + Math.pow(Math.abs(this.pos_start.y - this.pos_end.y), 2)));
    }
    static getProections(vector1)
    {
        return { x: Math.abs(vector1.pos_start.x - vector1.pos_end.x), y: Math.abs(vector1.pos_start.y - vector1.pos_end.y)};
    }
    static sum(vector1, vector2)
    {
        return new Vector2(vector1.pos_start, {x: vector1.pos_end.x + vector2.pos_end.x, y: vector1.pos_end.y - vector2.pos_end.y}, vector1.value + vector2.value);
    }
    static getNone(vector)
    {
        return new Vector2(vector.pos_start, vector.pos_start, 0);
    }
    static direction(vector)
    {
        let dir = { x: 0, y: 0 };
        if(vector.pos_start.x - vector.pos_end.x < 0)
            dir.x = 1;
        else if(vector.pos_start.x - vector.pos_end.x > 0)
            dir.x = -1;
        else
            dir.x = 0;

        if(vector.pos_start.y - vector.pos_end.y < 0)
            dir.y = 1;
        else if(vector.pos_start.y - vector.pos_end.y > 0)
            dir.y = -1;
        else
            dir.y = 0;
        return dir;
    } 
}

class Operations2D
{

    static get_distance(pos1, pos2)
    {
        return Math.floor(Math.sqrt(Math.pow(Math.abs(pos1.x - pos2.x), 2) + Math.pow(Math.abs(pos1.y - pos2.y), 2)));
    }

}

class Physics{
    pos = {x: 20, y: 20};
    speed = {x: 0,y: 0 };
    border = {left: {x: 0, y: 0 }, right: {x: 0, y: 0 }, top: {x: 0, y: 0 }, bottom: {x: 0, y: 0 }, h: 0, w: 0}; 
    moove = new Vector2();
    friction = 0;
    constructor(pos, mass)
    {
        this.pos = pos;
        this.mass = mass;
        this.gravitation = new Vector2();
        this.gravitation = new Vector2(this.pos, {x: this.pos.x, y: GROUND - this.pos.y + this.border.h}, this.mass * PHYSICS.gravity);
        this.moove = Vector2.sum(this.gravitation, this.moove);
        this.a = {x: 0, y: 0};
        this.dir = {x: 0, y: 0};

        this.dir = Vector2.direction(this.moove);
        this.a = Vector2.getProections(this.moove);

        this.a.x = this.moove.value * this.dir.x;
        this.a.y = this.moove.value * this.dir.y;

    }
    addForce(vector)
    {
        this.a = {x: 0, y: 0};

        this.moove = vector;
        this.dir = Vector2.direction(this.moove);

        this.a.x = this.moove.value * this.dir.x;
        this.a.y = this.moove.value * this.dir.y;
        this.speed = this.a;
        this.a = {x: 0, y: 0};
    }
    mainPHYSICS()
    {

        if(this.dir.y == 1 || this.pos.y + this.border.h < GROUND)
        {
            this.speed.y += this.gravitation.value;
        }
        else if(this.dir.y == -1)
        {
            this.speed.y += this.gravitation.value;
        }

        if(this.dir.x == 1)
        {
            this.speed.x -= this.friction;
            if(this.speed.x < 0) this.speed.x = 0;

        }        
        else if(this.dir.x == -1)
        {
            this.speed.x += this.friction;
            if(this.speed.x > 0) this.speed.x = 0;
        }

        let prepos = {x: this.pos.x + this.speed.x, y: this.pos.y + this.speed.y};
        if(prepos.y + this.border.h > GROUND)
        {
            prepos.y = GROUND - this.border.h;
            this.speed = {x: 0, y: 0};
        }
        this.pos = prepos;    
    }
    COLLISIONS()
    {
        let object = undefined,
            dis = 0
        ;

        for(let i in OBJECTS)
        {
            object = OBJECTS[i];
            if(object == this)
                continue;
        }

    }
}