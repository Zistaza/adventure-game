#! /usr/bin/env node

import inquirer from "inquirer";
import { normalize } from "node:path/posix";

// variables for Game

let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamageToHero = 25;

// variable for players

let heroHealth = 100;
let attackDamageToEnemy = 50;
let numHealthPortion = 3;
let healthPortionHealAmount = 30;
let healthPortionDropChance = 50;

// by using while loop

let gameRunning = true;

console.log("WELCOME TO DEADZONE!");

AdventureGame:
while (gameRunning){
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth + 1)
    let enemyIndex = Math.floor(Math.random() * enemies.length)
    let enemy = enemies[enemyIndex]

    console.log(`# ${enemy} has appeared #\n`);

    while (enemyHealth > 0){
        console.log(`Your Health ${heroHealth}`);
        console.log(`${enemy} Health: ${enemyHealth}`);

        let options = await inquirer.prompt([
            {
            name: "ans",
            type: "list",
            message: "What would you like to do?",
           choices: ["1. Attack", "2. TakeHealthPortion", "3. Run"]
        
        }as any,])
    

        if(options.ans === "1. Attack"){
            let damageEnemy = Math.floor(Math.random() * attackDamageToEnemy + 1 )
            let damageHero = Math.floor(Math.random() * enemyAttackDamageToHero + 1)

            enemyHealth -= damageEnemy
            heroHealth -= damageHero
            console.log(`You strike the ${enemy} for ${damageEnemy}`);
            console.log(`${enemy} strike you for ${damageHero} damage.`);

            if(heroHealth < 1){
                console.log("You have taken too much damage. You are too weak to continue.");
                break;
            }

        }

        else if(options.ans === "2. TakeHealthPortion"){
            if(numHealthPortion > 0){
                heroHealth += healthPortionHealAmount
                numHealthPortion--

                console.log(`You use health portion for ${healthPortionHealAmount}`);
                console.log(`You now have ${heroHealth} health.`);
                console.log(`You have ${numHealthPortion} health portions left.`);
            }else{
                console.log("You have no health portions available. Defeat enemy to get health portion");
            }
        }

        else if(options.ans === "3. Run"){
            console.log(`You Run Away From ${enemy}`);
            continue AdventureGame;
        }
    }
    if(heroHealth < 1){
        console.log("You are out of Game, You are too weak.");
        break
    }

    console.log(`${enemy} is defeated!`);
    console.log(`You have ${heroHealth} health now.`);

    let randomNumber = Math.floor(Math.random() * 100 + 1)
    if (randomNumber < healthPortionDropChance){
        numHealthPortion++

        console.log("Enemy give you health portion!.");
        console.log(`Your health is ${heroHealth}`);
        console.log(`Now your health portion is ${numHealthPortion}`);
    }

    let userOption = await inquirer.prompt([
        {name: "ans",
        type:"list",
        message:"What would you like to do now..?",
        choices: ["1. continue" , "2. Exit"],

    }as any,])

    if(userOption.ans === "1. continue"){
        console.log("You are continue in your adventure!.");
    }else {
        console.log("You have exited from Adventure Game!.");
        break;
    }

    console.log("THANKYOU FOR PLAYING.\n");

    }

