class Game {

    start() {

        this.spaceship = {
            x: window.innerWidth / 10, y: window.innerHeight / 2 - 35,
            rotation: 0, goingTo: null, agility: 9, speed: 0
        };

        this.mousePositions = { last: null, start: null };
    }

    play() {

        if (isMousePressed) {

            if(this.mousePositions.start == null)
                this.mousePositions.start = mouseY;

            this.spaceship.goingTo += (mouseY - this.mousePositions.start);


        }
        else {

        }

        push();
        translate(this.spaceship.x, this.spaceship.y);
        if(this.spaceship.goingTo - this.spaceship.y > 45)
            rotate(45);
        else if(this.spaceship.goingTo - this.spaceship.y < -45)
            rotate(-45);
        else
            rotate(this.spaceship.goingTo - this.spaceship.y);

        image(shipImg, 0, 0, 30, 30);
        pop();

        if (this.spaceship.goingTo < this.spaceship.y) 
            this.spaceship.y-=this.spaceship.agility;
        else if (this.spaceship.goingTo > this.spaceship.y) 
            this.spaceship.y+=this.spaceship.agility;

        if (Math.abs(this.spaceship.goingTo - this.spaceship.y) < this.spaceship.agility ) {
            this.spaceship.y = this.spaceship.goingTo;
        }

        if(this.spaceship.goingTo < 0){
            this.spaceship.goingTo = 0;
        }
        else if(this.spaceship.goingTo > height)
        {
            this.spaceship.goingTo = height;
        }

        this.mousePositions.start = mouseY;

    }

    end() {

    }

    onMouseReleased() {
        this.mousePositions.start = null;
    }

}