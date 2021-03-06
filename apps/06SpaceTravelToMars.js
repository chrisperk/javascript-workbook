'use strict';
//require assert
var assert = require('assert');

var jobTypes = {
    pilot: 'MAV',
    mechanic: 'Repair Ship',
    commander: 'Main Ship',
    programmer: 'Any Ship!'
};

// Your code here

function CrewMember(name, job, specialSkill) {
    this.name = name;
    this.job = job;
    this.specialSkill = specialSkill;
    this.ship = null;

    // enterShip() pushes this crewMember onto the crew array of the ship entered as a parameter
    this.enterShip = function(ship) {
        ship.crew.push(this);
        this.ship = ship;
    }
}

function Ship(name, type, ability) {
    this.name = name;
    this.type = type;
    this.ability = ability;
    this.crew = [];
    this.missionStatement = function() {

        // QUICK EXIT -- if there are no crew members return can't perform yet msg
        if (this.crew.length === 0) {
            return "Can't perform a mission yet.";
        }

        // if there is crew, loop through the crew array to check if any of the crew member's jobs match the ship type's requirements to conduct missions
        for (var i = 0; i < this.crew.length; i++) {
            if (jobTypes[this.crew[i].job] === this.type) {
                return this.ability;

            // if it reaches the end of the array and no crew pass the check then return can't perform yet msg
            } else if (i === this.crew.length - 1) {
                return "Can't perform a mission yet.";
            }
        }
    }
}

var mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
var rick = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
var jim = new CrewMember ('Jim Abbot', 'mechanic', 'anatomy');


jim.enterShip(mav);
rick.enterShip(mav);

// console.log(rick.ship.name);
// console.log(mav.crew.length); //=> 1
// console.log(mav.crew[0].name); //=> 'Rick Martinez'
// console.log(rick.ship === mav); //=> true
// console.log(mav.crew.indexOf(rick) === 0); //=> true
console.log(mav.crew);
console.log(mav.crew[0]);
console.log(mav.crew[0].job);
console.log(mav.missionStatement());

//tests
if (typeof describe === 'function') {
    describe('CrewMember', function() {
        it('should have a name, a job, a specialSkill and ship upon instantiation', function() {
            var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
            assert.equal(crewMember1.name, 'Rick Martinez');
            assert.equal(crewMember1.job, 'pilot');
            assert.equal(crewMember1.specialSkill, 'chemistry');
            assert.equal(crewMember1.ship, null);
        });

        it('can enter a ship', function() {
            var mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
            var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
            crewMember1.enterShip(mav);
            assert.equal(crewMember1.ship, mav);
            assert.equal(mav.crew.length, 1);
            assert.equal(mav.crew[0], crewMember1);
        });
    });

    describe('Ship', function() {
        it('should have a name, a type, an ability and an empty crew upon instantiation', function() {
            var mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
            assert.equal(mav.name, 'Mars Ascent Vehicle');
            assert.equal(mav.type, 'MAV');
            assert.equal(mav.ability, 'Ascend into low orbit');
            assert.equal(mav.crew.length, 0);
        });

        it('can return a mission statement correctly', function() {
            var mav = new Ship('Mars Ascent Vehicle', 'MAV', 'Ascend into low orbit');
            var crewMember1 = new CrewMember('Rick Martinez', 'pilot', 'chemistry');
            var hermes = new Ship('Hermes', 'Main Ship', 'Interplanetary Space Travel');
            var crewMember2 = new CrewMember('Commander Lewis', 'commander', 'geology');
            assert.equal(mav.missionStatement(), "Can't perform a mission yet.");
            assert.equal(hermes.missionStatement(), "Can't perform a mission yet.");

            crewMember1.enterShip(mav);
            assert.equal(mav.missionStatement(), "Ascend into low orbit");

            crewMember2.enterShip(hermes);
            assert.equal(hermes.missionStatement(), "Interplanetary Space Travel");
        });
    });
}
