var CommandList = [];
var Command = function (key, role, call) {
    this.key  = key;
    this.role = role;
    this.call = call;
}
let roleList = {
    admin:    server.roles.get("name", "admin"),
    mod:      server.roles.get("name", "mod"),
    everyone: server.roles.get("name", "everyone"),
}

CommandList.push(new Command("help",     roleList.everyone, function (message, key, args) {
    let helpMessage = "";
    for (var Command in CommandList) {
        if(checkPermissions(message.author, Command.role)){
            helpMessage += "!" + Command.key + " - ";
            helpMessage += "```" + Command.description + "```" + "\n";
        }
    }
    return true;
}));
CommandList.push(new Command("owStat",   roleList.everyone, function (message, key, args) {
    return owStats(message, args);
}));
CommandList.push(new Command("role",     roleList.everyone, function (message, key, args) {
    return gameRole(mybot, message, args);
}));
CommandList.push(new Command("game",     roleList.mod,      function (message, key, args) {
    return moveUsersToGame(message);
}));
CommandList.push(new Command("ping",     roleList.admin,    function (message, key, args) {
    mybot.sendMessage(message, "!pong");
    console.log("!pong");
    return true;
}));
CommandList.push(new Command("updateOW", roleList.admin,    function (message, key, args) {
    return updateOwStats();
}));
CommandList.push(new Command("setGame",  roleList.admin,    function (message, key, args) {
    console.log(message.author.id);
    console.log("setGame " + args.join(' '));
    let flag = true;

    mybot.setPlayingGame(args.join(' '), function (err) {
        if(err){
            console.log("err: \n    " + err);
            flag = false;
        }
    });

    return flag;
}));