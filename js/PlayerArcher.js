var angle2;

class PlayerArcher {
  constructor(x, y, width, height,angle) {

    const options = {
      isStatic: true
    };

 
    this.body = Matter.Bodies.rectangle(x, y, width, height, options);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.collapse = false;
    this.angle = angle;
    this.image = loadImage("./assets/playerArcher.png");

    World.add(world, this.body);
    Matter.Body.setAngle(this.body, 40);
  }

  display() {
    
    if(keyIsDown(LEFT_ARROW)&&this.angle > 200){
      this.angle = this.angle - 1;
      console.log("WORKS!")
      angle2 = this.angle;
    }
    if(keyIsDown(RIGHT_ARROW)&&this.angle < 280){
      this.angle = this.angle + 1;
      angle2 = this.angle;
    }

    push();
    translate(this.x,this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();
  }
}




