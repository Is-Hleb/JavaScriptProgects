let r = function(canvasId, w, h)
{
    let canvas = document.getElementById(canvasId);
    let ctx = canvas.getContext('2d');
    canvas.width = w;
    canvas.height = h;
    DISPLAY = {h: h, w: w};
    this.arc = function(x, y, r, color = 'orange')
    {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
    }
    this.block = function(x, y, w, h, color = "orange")
    {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }
    this.clear = function()
    {
        ctx.clearRect(0, 0, w, h);
    }
    this.backGround = function()
    {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, GROUND, w, h);
    }


}
RENDER = new r("display", 1400, 700);
