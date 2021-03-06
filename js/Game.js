class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    bike1 = createSprite(200,800);
    bike2 = createSprite(200,800);
    bike3 = createSprite(200,800);
    bike4 = createSprite(200,800);
    bikes = [bike1, bike2, bike3, bike4];

line = createSprite(100,-1000,2000000,10)

   
  }

  play(){
    form.hide();
background("blue")
    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the bikes
      var x = 0;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the bikes a little away from each other in x direction
        x = x + 400;
        //use data form the database to display the bikes in y direction
        y = displayHeight - allPlayers[plr].distance;
        bikes[index-1].x = x;
        bikes[index-1].y = y;

        if (index === player.index){
          bikes[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = bikes[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null || touches.length){
      player.distance +=10
      player.update();
    }

    if(bike1.isTouching(line) || bike2.isTouching(line) || bike3.isTouching(line) || bike4.isTouching(line)){
      line.shapeColor = random(0,255,random(0,255),random(0,255))
     }


    drawSprites()
  }
}
