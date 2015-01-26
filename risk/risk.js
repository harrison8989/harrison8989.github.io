function numAttack(numSoldiers) {
    return Math.min(numSoldiers-1, 3);
}

function numDefend(numSoldiers) {
    return Math.min(numSoldiers, 2);
}

function randNum(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
}

function getDie(numDie) {
    var die = [];
    for(var i = 0; i < numDie; i++) {
        die.push(randNum(1,6));
    }
    die.sort(function(a,b) {return b-a;});
    return die;
}

document.getElementById("form").onsubmit = function() {
    var attacker = parseInt(document.getElementById("attacker").value);
    var defender = parseInt(document.getElementById("defender").value);
    var attackerlimit = parseInt(document.getElementById("attackerlimit").value) || 0;
    var defenderlimit = parseInt(document.getElementById("defenderlimit").value) || 0;
    var numAttacks = parseInt(document.getElementById("numAttacks").value) || -1;
    if(!attacker && !defender) {
        document.getElementById("result").innerHTML = "Error: did not supply attacker or defender values!";
    } else {
        var resultString = "Battle Start! " + attacker + " vs " + defender + "<br />";
        var attackCounter = 0;
        while(attackCounter != numAttacks && attacker > attackerlimit && attacker > 1 && defender > defenderlimit) {
            var attackDie = getDie(numAttack(attacker));
            var defendDie = getDie(numDefend(defender));

            resultString += attackDie + " vs " + defendDie + "<br />";

            var defendLoss = 0;
            var attackLoss = 0;

            for(var i = 0; i < numAttack(attacker) && i < numDefend(defender); i++) {
                if(attackDie[i] > defendDie[i]) {
                    defendLoss++;
                } else {
                    attackLoss++;
                }
            }
            resultString += "Attacker loss: " + attackLoss + " Defender loss: " + defendLoss + "<br />";
            attacker -= attackLoss;
            defender -= defendLoss;
            resultString += "<b>Result: " + attacker + " vs " + defender + "<br /><br /></b>";

            attackCounter++;
        }
        document.getElementById("result2").innerHTML = "<h3>Final result: " + attacker + " vs " + defender + "</h3>";
        document.getElementById("result").innerHTML = resultString;
    }
    document.getElementById("attacker").value = attacker;
    document.getElementById("defender").value = defender;
    document.getElementById("attackerlimit").value = "";
    document.getElementById("defenderlimit").value = "";

};
