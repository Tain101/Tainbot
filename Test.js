"use strict";
let Mock     = require('./mock.js');
let Commands = require('./Commands.js');
let utils    = require('./utils.js');
let fs       = require('fs');

let testUser       = new Mock.User;
let testMod        = new Mock.User;
testMod.username   = "mod";
let testAdmin      = new Mock.User;
testAdmin.username = "admin";

function runHelpTest() {
    let helpTest       = new Mock.Message;
    helpTest.content   = "!help";

    utils.botMessageFunc(helpTest);
    helpTest.author = testMod;
    utils.botMessageFunc(helpTest);
    helpTest.author = testAdmin;
    utils.botMessageFunc(helpTest);
}

function runRoleTest() {
    let roleTest = new Mock.Message;
    roleTest.content = "!role list test";
    roleTest.server = new Mock.Server;
    // roleTest.server.roles = new Mock.Role;
    utils.botMessageFunc(roleTest);

    roleTest.content = "!role join test";
    utils.botMessageFunc(roleTest);
}

function runTests() {
    let log            = "\n";
    let count          = 0;

    // runHelpTest();
    runRoleTest();

    console.log(log);
    fs.writeFileSync("Test.js.log", log, "utf8");
};

this.runTests = runTests;
