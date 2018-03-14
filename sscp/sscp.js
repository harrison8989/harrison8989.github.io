// Stores hashes in plaintext. Isn't that a bad idea?
// A server really is a lot better for this
// Naah, what's the worst that can happen?

/* How is this gonna work:
 *
 * * 8 (or 9) squares signifying each of the puzzles
 * * Click on a square
 * * On click, the other squares blur out
 * * Have textbox + submit appear (this is the form)
 * * Hash. Check if the hash matches
 * * If yes, display correct + next location (+ send query somewhere? where?)
 *   If it's serverless, we won't know when a person can move on
 * * If no, check if hash matches a pre-defined list
 ***/

/****************** Constants ****************/

// Please don't try to reverse engineer the hashes!
var puzzleHashes = [
    { name: 'Flight Paths', answer_hash: 88157272 },
    { name: 'Solar Misunderstanding', answer_hash: 1547991946 },
    { name: 'Old and New Sponsors',
      answer_hash: 2136588712,
      partial_hashes: [ -2049721136, -2028157256, 2025298004 ] },
    { name: 'New Features',
      answer_hash: -704709568,
      partial_hashes: [ 79713527, -1711135842, -739699212 ] },
    { name: 'Materials Research',
      answer_hash: 1993573657,
      partial_hashes: [ 2162 ] },
    { name: 'Power over Ethernet', answer_hash: 1500941257 },
    { name: 'Around the Bend', answer_hash: -736970293 },
    { name: 'Highway Landmarks', answer_hash: -44812461 },
    { name: 'Test Drive Banter', answer_hash: 38871460 } ];

var puzzleNames = [
    'Flight Paths',
    'Solar Misunderstanding',
    'Old and New Sponsors',
    'New Features',
    'Materials Research',
    'Power over Ethernet',
    'Around the Bend',
    'Highway Landmarks',
    'Test Drive Banter' ,
];

var CORRECT = 2;
var CLOSE = 1;
var WRONG = 0;

/******************** Helper functions ********************/

// Probability that there's a hash collision? wellll
String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length == 0) {
        return hash;
    }
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function sanitize(string) {
    return string.toUpperCase().replace(/\s/g, '');
}

function checkAnswer(puzzleName, guess) {
    // sanitize the input
    guess = sanitize(guess);
    for (var i = 0; i < puzzleHashes.length; i++) {
        if (puzzleHashes[i].name === puzzleName) {
            if (guess.hashCode() === puzzleHashes[i].answer_hash) {
                return CORRECT;
            }

            if ("partial_hashes" in puzzleHashes[i]) {
                for (var j = 0; j < puzzleHashes[i].partial_hashes.length; j++) {
                    if (guess.hashCode() === puzzleHashes[i].partial_hashes[j]){
                        return CLOSE;
                    }
                }
            }

            return WRONG;
        }
    }
    return WRONG;
}

function tests() {
    var rightAnswer = "teslaHQ";
    var sortaAnswer = "tesla";
    for(var i = 0; i < 9; i++) {
        console.log(puzzleNames[i], checkAnswer(puzzleNames[i], rightAnswer));
    }
    for(var i = 0; i < 9; i++) {
        console.log(puzzleNames[i], checkAnswer(puzzleNames[i], sortaAnswer));
    }
}
// tests();

/********************* View logic *******************/

document.getElementById("form").onsubmit = function() {
    var puzzleName = document.getElementById("puzzleName").value;
    var guess = document.getElementById("guess").value;

    var outputText;
    var check = checkAnswer(puzzleName, guess);
    if (check == CORRECT) {
        outputText = "<strong>" + sanitize(guess) + "</strong> is correct!";
    } else if (check == CLOSE) {
        outputText = "<strong>" + sanitize(guess) + "</strong> is on the right track. Keep going!";
    } else {
        outputText = "Incorrect. Try again!";
    }

    document.getElementById("output").innerHTML = outputText;
};

/********************** Initialization **************/
(function init() {
    // Populate the select
    var puzzleNameSelect = document.getElementById("puzzleName");
    for (var i = 0; i < puzzleNames.length; i++) {
        var option = document.createElement("option");
        option.text = puzzleNames[i];
        puzzleNameSelect.add(option);
    }
})();
