const canvas = document.getElementById('ray');
const ctx = canvas.getContext('2d');
const h = window.innerHeight;
const w = window.innerWidth;
const ITERATIONS = 800;
const MAX_DIST = 40;
const EX = vec(0.001, 0, 0);
const EY = vec(0, 0.001, 0);
const EZ = vec(0, 0, 0.001);
const ro = vec(-5, 0, -2);

canvas.width = w;
canvas.height = h;
draw();


function vec(x, y, z) {
    return {x: x, y: y, z: z};
}

function sum(a, b) { // Сумма векторов
    return vec(a.x + b.x, a.y + b.y, a.z + b.z);
}

function sub(a, b) { // Разность векторов
    return vec(a.x - b.x, a.y - b.y, a.z - b.z);
}

function mul(a, value) {
    return vec(a.x * value, a.y * value, a.z * value);
}

function dot(a, b) { // Скалярное произведение
    return a.x * b.x + a.y * b.y + a.z * b.z;
}

function getNormal(p) {
    let d = getDist(p);
    let p1 = getDist(sub(p, EX));
    let p2 = getDist(sub(p, EY));
    let p3 = getDist(sub(p, EZ));
    let tri = vec(p1, p2, p3);
    let n = sub(vec(d, d, d), tri);
    return normalize(n);
}

function normalize(a) { //превращение в еденичный вектор
    let l = dist(a, vec(0, 0, 0));
    return vec(a.x / l, a.y / l, a.z / l);
}

function dist(a, b) { // между точками в 3d
    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) + (a.z - b.z) * (a.z - b.z));
}

function smin(a, b, k) {
    let h = Math.max(Math.min(0.5 + 0.5 * (b - a) / k, 1), 0);
    return a * h + b * (1 - h) - k * h * (1.0 - h);
}

function getDist(p) { // Иногда называют map
    p.x = (p.x % 3 + 3) % 3;
    //p.y = (p.y % 3 + 3) % 3;
    let sphere1 = vec(0, 0, 0);
    let sphere2 = vec(2, -2, -3);
    let planeDist = -p.z + 0.8;
    let sphereDist = dist(p, sphere1) - 1;
    let dist2 = dist(p, sphere2) - 2;
    sphereDist = Math.min(dist2, sphereDist);
    return smin(planeDist, sphereDist, 0.5);
}

function light(p) {
    let lightPos = vec(0, -4, -4);
    let lightDir = normalize(sub(lightPos, p));
    let normal = getNormal(p);
    let dif = dot(normal, lightDir) * 0.5 + 0.5;
    return dif;
}

function RayMarching(ro, rd) {
    let p = vec(ro.x, ro.y, ro.z);
    let it = 0;
    for (let i = 0; i < ITERATIONS; i++) {
        let d = getDist(p);
        if (d > MAX_DIST) break;
        p = sum(p, mul(rd, d));
        if (d < 0.01) {
            return light(p);
        }
        it = i;
    }
    return 0.8;
}

function draw() {
    const imageData = ctx.createImageData(w, h);
    let data = imageData.data;
    // Камера


    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            let ind = (i + j * w) * 4;
            let x = (i / w) * 2 - 1;
            let y = (j / h) * 2 - 1;
            x /= h / w;
            // напралвние луча
            let rd = vec(1, x, y);
            // превращение в еденимчный вектор
            rd = normalize(rd);
            //######Рисуем окружность########
            let col = RayMarching(ro, rd);
            //###############################
            col *= 255 ;
            //console.log(ind);
            data[ind] = col;//R
            data[ind + 1] = col;//G
            data[ind + 2] = col;//B
            data[ind + 3] = 255;//прозрачность
        }
    }
    ctx.putImageData(imageData, 0, 0);
    ro.z -= 0.5;
    requestAnimationFrame(draw);
}

