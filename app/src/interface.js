$(document).ready(function() {
  var game = new Game();

  function updateData() {
    $('#totalscore').text(game.getScore());
    var gameData = game.getFrames();
    var frameNum = gameData.length + 1;
    gameData.forEach(function(frame, index) {
      var currentFrame = index + 1;
      if (frame.bonus === 0) {
        $('#total' + currentFrame).text(frame.total);
      }
      frame.rolls.forEach(function(roll, index) {
        $('#ball' + currentFrame + '-' + (index + 1)).text(roll);
      });
    });
    var currentFrame = game.getCurrentFrame();
    currentFrame.rolls.forEach(function(roll, index) {
      $('#ball' + frameNum + '-' + (index + 1)).text(roll);
    });
  }

  $('.score-buttons button').click(function() {
    var roll = parseInt(this.id.substring(1));
    try {
      game.logRoll(roll);
    } catch (err) {
      alert(err);
    }
    updateData();
  });
});
