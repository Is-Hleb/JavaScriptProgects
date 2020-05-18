
setup();
function MAIN_LOOP()
{
    RENDER.clear();
    RENDER.backGround();
    for(let i = 0; i < OBJECTS.length; i++)
    {
        OBJECTS[i].main();
    }
    loop();
    requestAnimationFrame(MAIN_LOOP);
}
MAIN_LOOP();
