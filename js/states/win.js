var win = function(game){

}

win.prototype = {
    init: function(score){
        this.score = score;
    },
    preload: function(){
		game.load.spritesheet('buttonwin', 'assets/buttonwin.png', 368, 139);
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
		button = game.add.button(game.world.centerX - 95, 400, 'buttonwin', this.onUp, this, 0, 0, 0);
        this.make_modal();

	},

    update: function(){
        
    },

    render: function() {
        
    },
    make_modal: function(){
        var modal = document.createElement("div");
        modal.id = "modal";
        var form = document.createElement("form");
        modal.appendChild(form);
        form.innerHTML = "You took " + this.score + " seconds!<br>name:\
  <input id='namescore' type='text' name='name' placeholder='eternalenvy'><br>\
  <input type='submit' value='Submit' id='submitscore'>";
        this.game.canvas.parentNode.insertBefore(modal, null);
                //this.game.canvas.appendChild(modal);

             function funct1(evt)
            {
                              evt.preventDefault();

                console.log("this happened!");
                alert("hello");
                alert("oh");
                firebase.set({name: getElementById("namescore").value, score: this.score});
                alert("oh");
            }

        var submit = document.getElementById("submitscore");

        submit.onclick = funct1;
    }
	
}