class Circle extends Physics
{
    constructor(massa, friction_in, radius, position = {x: 50, y: 0}, IsPhysics = true, color = 'orange'){
        super(position, massa);
        this.isPhysics = IsPhysics;
        this.r = radius;
        this.pos = position;
        this.friction = friction_in;
        this.mass = massa;
        OBJECTS.push(this);
    }
    main()
    {
        
        this.border = {
            left: {x: this.pos.x - this.r, y: this.pos.y},
            right: {x: this.pos.x + this.r, y: this.pos.y},
            top: {x: this.pos.x, y: this.pos.y - this.r},
            bottom: {x: this.pos.x, y: this.pos.y + this.r},
            h: this.r,
            w: this.r,
        }
        if(this.isPhysics) 
        {
            this.COLLISIONS();
            this.mainPHYSICS();
        }
        RENDER.arc(this.pos.x, this.pos.y, this.r);
    }

}

class Block extends Physics
{
    constructor(position = {x: 0, y: 0}, w = 150, h = 200, IsPhysics = false, massa)
    {
        super(position, massa);
        this.pos = position;
        this.mass = massa;
        this.w = w;
        this.h = h;
        this.IsPhysics = IsPhysics;
        OBJECTS.push(this);
    }
    main()
    {
        this.border = {
            left: {x: this.pos.x, y: this.pos.y + this.h/2},
            right: {x: this.pos.x + this.w, y: this.pos.y + this.h/2},
            top: {x: this.pos.x + this.w/2, y: this.pos.y},
            bottom: {x: this.pos.x + this.w/2, y: this.pos.y + this.h},
            h: this.h,
            w: this.w,
        }
        if(this.IsPhysics)
        {
            this.COLLISIONS();
            this.mainPHYSICS();
        }
        RENDER.block(this.pos.x, this.pos.y, this.w, this.h, "black");
    }
}