window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

export default function scrollTo(target = 0, speed = 200, easing = 'easeOutSine') {
    // target: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    let scrollY = window.scrollY,
        currentTime = 0;

    // min time .1, max time .8 seconds
    let time = Math.max(.1, Math.min(Math.abs(scrollY - target) / speed, .8));

    let PI_D2 = Math.PI / 2,
        easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

    // add animation loop
    function tick() {
        currentTime += 1 / 60;

        let p = currentTime / time;
        let t = easingEquations[easing](p);

        if (p < 1) {
            requestAnimFrame(tick);

            window.scrollTo(0, scrollY + ((target - scrollY) * t));
        } else {
            console.log('scroll done');
            window.scrollTo(0, target);
        }
    }

    tick();
}