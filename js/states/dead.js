var dead = function(game){

}

dead.prototype = {
    init: function(score){
        this.score = score;
    },
    preload: function(){
		game.load.spritesheet('button', 'assets/button.png', 368, 139);
    },
onUp: function(button, pointer, isOver) {

    //  In this example if the Pointer is no longer over the Button, then we'll treat it
    //  as if the user cancelled the operation and didn't want to press the Button after all
        console.log("hi");
        if (isOver)
        {
        game.state.start("theGame");
        }
    },
    create: function() {
        //does it need to be this.onUp?
		button = game.add.button(game.world.centerX - 95, 400, 'button', this.onUp, this, 0, 0, 0);
        this.make_modal();

	},

    update: function(){
        
    },

    render: function() {
        
    },
    shutdown: function(){
        this.modal.parentNode.removeChild(this.modal);
    },
    make_modal: function(){
        modal = document.createElement("div");
        this.modal = modal;
        modal.id = "modal";
        var form = document.createElement("form");
        modal.appendChild(form);
        form.innerHTML = "You took " + this.score + " seconds!<br>name:\
  <input type='text' name='name' placeholder='eternalenvy'><br>\
  <input type='submit' value='Submit'>";
        this.game.canvas.parentNode.insertBefore(modal, null);
                //this.game.canvas.appendChild(modal);

    }
	
}