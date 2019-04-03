function renderBackground() {
    var background = {}

    background.initializr = function () {

        var $this = this;



        //option
        $this.id = "background_css3";
        $this.style = {
            bubbles_color: "#cedce7",
            stroke_width: 0,
            stroke_color: "black"
        };
        $this.bubbles_number = 30;
        $this.speed = [1500, 8000]; //milliseconds
        $this.max_bubbles_height = $this.height;
        $this.shape = false // 1 : circle | 2 : triangle | 3 : rect | false :random

        if ($("#" + $this.id).lenght > 0) {
            $("#" + $this.id).remove();
        }
        $this.object = $("<div style='z-index:-1;margin:0;padding:0; overflow:hidden;position:absolute;bottom:0' id='" + $this.id + "'> </div>'").appendTo("body");

        $this.ww = $(window).width()
        $this.wh = $(window).height();
        $this.width = $this.object.width($this.ww);
        $this.height = $this.object.height($this.wh);


        $("body").prepend("<style>.shape_background {transform-origin:center; width:80px; height:80px; background: " + $this.style.bubbles_color + "; position: absolute}</style>");


        for (i = 0; i < $this.bubbles_number; i++) {
            $this.generate_bubbles()
        }

    }

    background.generate_bubbles = function () {
        var $this = this;
        var base = $("<div class='shape_background'></div>");
        var shape_type = $this.shape ? $this.shape : Math.floor($this.rn(1, 3));
        if (shape_type == 1) {
            var bolla = base.css({
                borderRadius: "50%"
            })
        } else if (shape_type == 2) {
            var bolla = base.css({
                width: 0,
                height: 0,
                "border-style": "solid",
                "border-width": "0 40px 69.3px 40px",
                "border-color": "transparent transparent " + $this.style.bubbles_color + " transparent",
                background: "transparent"
            });
        } else {
            var bolla = base;
        }
        var rn_size = $this.rn(.8, 1.2);
        bolla.css({
            "transform": "scale(" + rn_size + ") rotate(" + $this.rn(-360, 360) + "deg)",
            top: $this.wh + 100,
            left: $this.rn(-60, $this.ww + 60)
        });
        bolla.appendTo($this.object);
        bolla.transit({
            top: $this.rn($this.wh / 2, $this.wh / 2 - 60),
            "transform": "scale(" + rn_size + ") rotate(" + $this.rn(-360, 360) + "deg)",
            opacity: 0
        }, $this.rn($this.speed[0], $this.speed[1]), function () {
            $(this).remove();
            $this.generate_bubbles();
        })

    }


    background.rn = function (from, to, arr) {
        if (arr) {
            return Math.random() * (to - from + 1) + from;
        } else {
            return Math.floor(Math.random() * (to - from + 1) + from);
        }
    }
    background.initializr()
}


function renderBackground1() {

    var w = c.width = window.innerWidth,
        h = c.height = window.innerHeight,
        ctx = c.getContext('2d'),

        minDist = 10,
        maxDist = 30,
        initialWidth = 10,
        maxLines = 100,
        initialLines = 4,
        speed = 5,

        lines = [],
        frame = 0,
        timeSinceLast = 0,

        dirs = [
            // straight x, y velocity
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
            // diagonals, 0.7 = sin(PI/4) = cos(PI/4)
            [.7, .7],
            [.7, -.7],
            [-.7, .7],
            [-.7, -.7]
        ],
        starter = { // starting parent line, just a pseudo line

            x: w / 2,
            y: h / 2,
            vx: 0,
            vy: 0,
            width: initialWidth
        };

    function init() {

        lines.length = 0;

        for (var i = 0; i < initialLines; ++i)
            lines.push(new Line(starter));

        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, w, h);

        // if you want a cookie ;)
        // ctx.lineCap = 'round';
    }

    function getColor(x) {

        return 'hsl( hue, 80%, 50% )'.replace(
            'hue', x / w * 360 + frame
        );
    }

    function anim() {

        window.requestAnimationFrame(anim);

        ++frame;

        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(0,0,0,.02)';
        ctx.fillRect(0, 0, w, h);
        ctx.shadowBlur = .5;

        for (var i = 0; i < lines.length; ++i)

            if (lines[i].step()) { // if true it's dead

                lines.splice(i, 1);
                --i;

            }

            // spawn new

            ++ timeSinceLast

        if (lines.length < maxLines && timeSinceLast > 10 && Math.random() < .5) {

            timeSinceLast = 0;

            lines.push(new Line(starter));

            // cover the middle;
            ctx.fillStyle = ctx.shadowColor = getColor(starter.x);
            ctx.beginPath();
            ctx.arc(starter.x, starter.y, initialWidth, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function Line(parent) {

        this.x = parent.x | 0;
        this.y = parent.y | 0;
        this.width = parent.width / 1.25;

        do {

            var dir = dirs[(Math.random() * dirs.length) | 0];
            this.vx = dir[0];
            this.vy = dir[1];

        } while (
            (this.vx === -parent.vx && this.vy === -parent.vy) || (this.vx === parent.vx && this.vy === parent.vy));

        this.vx *= speed;
        this.vy *= speed;

        this.dist = (Math.random() * (maxDist - minDist) + minDist);

    }
    Line.prototype.step = function () {

        var dead = false;

        var prevX = this.x,
            prevY = this.y;

        this.x += this.vx;
        this.y += this.vy;

        --this.dist;

        // kill if out of screen
        if (this.x < 0 || this.x > w || this.y < 0 || this.y > h)
            dead = true;

        // make children :D
        if (this.dist <= 0 && this.width > 1) {

            // keep yo self, sometimes
            this.dist = Math.random() * (maxDist - minDist) + minDist;

            // add 2 children
            if (lines.length < maxLines) lines.push(new Line(this));
            if (lines.length < maxLines && Math.random() < .5) lines.push(new Line(this));

            // kill the poor thing
            if (Math.random() < .2) dead = true;
        }

        ctx.strokeStyle = ctx.shadowColor = getColor(this.x);
        ctx.beginPath();
        ctx.lineWidth = this.width;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(prevX, prevY);
        ctx.stroke();

        if (dead) return true
    }

    init();
    anim();

    window.addEventListener('resize', function () {

        w = c.width = window.innerWidth;
        h = c.height = window.innerHeight;
        starter.x = w / 2;
        starter.y = h / 2;

        init();
    })
}