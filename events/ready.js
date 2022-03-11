const client = require("../index");

client.on("ready", () =>
    console.log("\x1b[34m",`✔️ ${client.user.tag} is up`)
);