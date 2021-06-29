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
  
      car1 = createSprite(100,200);
      car1.addImage("car1",car1img);
      car1.scale = 0.5;
      //car1.visible = false;
      car2 = createSprite(300,200);
      car2.addImage("car2",car2img);
      car2.scale = 0.5;
      //car2.visible = false;
      car3 = createSprite(500,200);
      car3.addImage("car3",car3img);
      car3.scale = 0.5;
      //car3.visible = false;
      car4 = createSprite(700,200);
      car4.addImage("car4",car4img);
      car4.scale = 0.5;
      //car4.visible = false;
      //car5 = createSprite(900,200);
      //car5.addImage("car5",car5img);
      cars = [car1, car2, car3, car4];
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      player.getCarsAtEnd();
      
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(bgimg, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 175 ;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
          cars[index-1].x = x;
          cars[index-1].y = y;
         // console.log(index, player.index)
  
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            cars[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y;
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(w) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.distance > 3860){
        gameState = 2;
        player.rank = player.rank +1 ;
        console.log("this player rank "+ player.rank);
        Player.updateCarsAtEnd(player.rank);
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
      if(count === 0) {
        alert(player.rank);
        count++;
      }
    }
  }
  