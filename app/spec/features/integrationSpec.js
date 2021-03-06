describe('Integration Tests', function() {
  var game;

  beforeEach(function() {
    game = new Game();
  });

  it('A frame should successfully log to score and frames', function() {
    game.logRoll(4);
    game.logRoll(5);
    expect(game.getScore()).toEqual(9);
    expect(game.getFrames()).toEqual([{rolls: [4, 5], total: 9, bonus: 0}]);
  });

  it('A spare should be correctly modified by the next game', function() {
    game.logRoll(5);
    game.logRoll(5);
    expect(game.getFrames()[0].bonus).toEqual(1);
    game.logRoll(6);
    game.logRoll(3);
    expect(game.getScore()).toEqual(25);
    expect(game.getFrames()[0].bonus).toEqual(0);
    expect(game.getFrames()[0].total).toEqual(16);
  });

  it('Strikes should be correctly modified by the next 2 rolls', function() {
    game.logRoll(10);
    expect(game.getFrames()[0].bonus).toEqual(2);
    game.logRoll(6);
    game.logRoll(3);
    expect(game.getScore()).toEqual(28);
    expect(game.getFrames()[0].bonus).toEqual(0);
    expect(game.getFrames()[0].total).toEqual(19);
  });

  it('A perfect game should score 300', function() {
    for (var i = 0; i < 12; i ++) {
      game.logRoll(10);
    }
    expect(game.getScore()).toEqual(300);
  });

  it('A gutter game should score 0', function() {
    for (var i = 0; i < 20; i ++) {
      game.logRoll(0);
    }
    expect(game.getScore()).toEqual(0);
  });
});
