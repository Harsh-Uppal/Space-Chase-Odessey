class Background {

    static generate(res) {

        this.pixelsSetX = [];
        this.pixelsSet = [];
        this.Verts = [];

        this.runFromStart = true;
        this.resolution = res;

        this.createPerlinLayer(-80,0,30,0.01);
        this.createPerlinLayer(0,10000,60,0.005);
        this.createPerlinLayer(100,100000,90,0.003);
        this.createPerlinLayer(200, 1000000,120,0.002);

        this.setStars();
        this.starsImg = loadImage("Images/stars.png");

        this.runFromStart = false;

        this.update();

    }

    static update(){
        this.updateStars();

        this.createPerlinLayer(-80,0,30);
        this.createPerlinLayer(0,10000,60);
        this.createPerlinLayer(100,100000,90);
        this.createPerlinLayer(200,1000000,120);

        
        noStroke();
        textAlign(CENTER);
        textFont("MS Mincho");
        textSize(60);
        text("Space Chase",window.innerWidth/2,window.innerHeight/3);
        strokeWeight(.1);
        stroke(255);
        line(width/2 - 150,height/3 + 20,width/2 + 150,height/3 + 20);
        textSize(35);
        noStroke();
        text("Click To Start",width/2,height/2);
        image(this.starsImg,width - 70,30,40,40);
    }

    static createPerlinLayer(posY,offset,color,increment) {

        if(this.runFromStart)
        {
            let Verts = [];
            let xOff = 0;
            let inc = increment;

            for (var i = -1; i < width / this.resolution + 1; i++) {

                var x = (width / (width/this.resolution)) * i;
                var y = (noise(xOff + inc + offset) * height) + posY;
                var s = Math.sin(xOff + inc + offset);

                Verts[Verts.length] = { x: x, y: y + map(s/2,-1,1,0,1) };

                xOff += inc;

                if(this.pixelsSetX.find(element => element == x) == null ||
                this.pixelsSet[this.pixelsSetX.find(element => element == x)] > y)
                {
                this.pixelsSetX[this.pixelsSetX.length] = x;
                this.pixelsSet[this.pixelsSet.length] = y;
                }

            }

		    this.Verts[color] = Verts;
        }

        stroke(color);
        strokeWeight(3);
        noFill();

        beginShape();
        for (var i = 0; i < this.Verts[color].length; i++) {
            vertex(this.Verts[color][i].x, this.Verts[color][i].y);
        }
        endShape();

        fill(color);
        beginShape();
        for (var i = 0; i < this.Verts[color].length; i++) {
            vertex(this.Verts[color][i].x, this.Verts[color][i].y);
        }
        vertex(width + 5,height + 5);
        vertex(-5,height + 5);
        endShape(CLOSE);
    }

    static setStars(){

        this.stars = [];

        for(var y = 0; y < height / 2;y ++)
        {
            for(var x = 0;x < width;x++)
            {
                if(round(random(0,1000)) == 0)
                {
                    let xPos = this.pixelsSetX.find(element => element == x);

                    if(y < this.pixelsSet[xPos] - 5)
                    {
                        this.stars[this.stars.length] = {pos : {x : x,y : y},data : {goingTo : "n",isAt : round(random(150,255))}};
                    }
                }
            }
        }
    }

    static updateStars(){

        noStroke();

        for(var i = 0;i < this.stars.length;i++){

            fill(this.stars[i].data.isAt);
            ellipse(this.stars[i].pos.x,this.stars[i].pos.y,3,3);

            if(this.stars[i].data.goingTo == "+")
            {
                if(this.stars[i].data.isAt > 254)
                {
                    this.stars[i].data.goingTo = "n";
                }
                else
                {
                    this.stars[i].data.isAt+= 5;
                }
            }
            else if(this.stars[i].data.goingTo == "-")
            {
                if(this.stars[i].data.isAt < 70)
                {
                    this.stars[i].data.goingTo = "+";
                }
                else
                {
                    this.stars[i].data.isAt-= 5;
                }
            }
            else if(round(random(0,200)) == 1)
            {
                this.stars[i].data.goingTo = "-";
            }

        }
    }

}