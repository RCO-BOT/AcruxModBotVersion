const { Command } = require('discord.js-commando');
const Minesweeper = require('discord.js-minesweeper');
 
class MinesweeperCommand extends Command {
  constructor(client) {
    super(client, {
        name: "minesweeper", 
        description: "Minesweeper minigame. Credit goes to `https://www.npmjs.com/package/discord.js-minesweeper`", 
        memberName: "minesweepercommand", 
        aliases: ["minesweeper"],
        group: "owner",
      args: [
        {
          key: 'rows',
          prompt: 'How many rows?',
          type: 'integer',
          min: 4,
          max: 20
        },
        {
          key: 'columns',
          prompt: 'How many columns?',
          type: 'integer',
          min: 4,
          max: 20
        },
        {
          key: 'mines',
          prompt: 'How many mines?',
          type: 'integer',
          min: 1
        }
      ]
    });
  }
 
  async run(message, { rows, columns, mines }) {
    const minesweeper = new Minesweeper({ rows, columns, mines });
    const matrix = minesweeper.start();
 
    return matrix
      ? message.say(matrix)
      : message.say(':warning: The provided data is invalid.');
  }
};
 
module.exports = MinesweeperCommand;