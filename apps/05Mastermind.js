'use strict';

var assert = require('assert');
var colors = require('colors/safe');
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var board = [];
var solution = '';
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var lossCheck = false;
var winCheck = false;

function printBoard() {
    for (var i = 0; i < board.length; i++) {
        console.log(board[i]);
    }
}

function generateSolution() {
    for (var i = 0; i < 4; i++) {
        var randomIndex = getRandomInt(0, letters.length);
        solution += letters[randomIndex];
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(solution, guess) {
    // your code here
    var solutionArray = solution.split('');
    var guessArray = guess.split('');

    var correctLetterLocations = 0;
    for (var i = 0; i < solutionArray.length; i++) {
        if (solutionArray[i] === guessArray[i]) {
            correctLetterLocations++;
            solutionArray[i] = null;
        }
    };

    var correctLetters = 0;
    for (var i = 0; i < solutionArray.length; i++) {
        var targetIndex = guessArray.indexOf(solutionArray[i]);
        if (targetIndex > -1) {
            correctLetters++;
            solutionArray[i] = null;
        }
    };

    return correctLetterLocations + '-' + correctLetters;

}

function mastermind(guess) {
    // your code here
    var currentHint = generateHint(solution, guess);
    board.push(guess + ' ' + currentHint);
    if (board.length > 10) {
        lossCheck = true;
        return ('You ran out of turns! The solution was ' + solution);
    } else if (guess === solution) {
        winCheck = true;
        return ('You guessed it!');
    } else {
        console.log('Guess again.');
    }
}

function getPrompt() {
    console.log('Guess a 4 letter string using the letters a, b, c, d, e, f, g, and h')
    rl.question('guess: ', (guess) => {
        // scrub input
        guess = guess.trim();
        guess = guess.toLowerCase();

        // if board doesn't meet loss or win condition, execute the game
        console.log(mastermind(guess));
        if ((lossCheck !== true) && (winCheck !== true)) {
            printBoard();
            getPrompt();
        } else {
            // if loss or win condition is met ask user if they'd like to play again
            rl.question('Would you like to play again? Enter y/n: ', (playAgain) => {
                playAgain = playAgain.trim();
                playAgain = playAgain.toLowerCase();

                // if yes, reset the winCheck and board to default and start game over
                if (playAgain === 'y') {
                    winCheck = false;
                    lossCheck = false;
                    board = [];
                    solution = '';
                    generateSolution();
                    getPrompt();

                // otherwise cease execution of game
                } else {
                    return;
                }
            })
        }
    });
}

// Tests

if (typeof describe === 'function') {

    describe('#mastermind()', function() {
        it('should register a guess and generate hints', function() {
            solution = 'abcd';
            mastermind('aabb');
            assert.equal(board.length, 1);
        });
        it('should be able to detect a win', function() {
            assert.equal(mastermind(solution), 'You guessed it!');
        });
    });

    describe('#generateHint()', function() {
        it('should generate hints', function() {
            assert.equal(generateHint('abcd', 'abdc'), '2-2');
        });
        it('should generate hints if solution has duplicates', function() {
            assert.equal(generateHint('abcd', 'aabb'), '1-1');
        });

    });

} else {

    generateSolution();
    getPrompt();
}
