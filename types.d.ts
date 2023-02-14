import {
  Client,
  CommandInteraction,
  Guild,
  GuildMember,
  Message,
  TextChannel,
  User,
} from 'discord.js';

export default class Main {
  constructor({ client, commandsDir }: MainOptions);
}

export interface MainOptions {
  client: Client; // Discord.js bot client
  commandsDir: string; // Path to commands directory
  mongoUri?: string; // MongoDB connection URI
}

// Command object types
export interface CommandObject {
  callback: (commandUsage: CommandUsage) => unknown;
}

// Command callback argument (usage) types
export interface CommandUsage {
  client: Client;

  /* Message, args, and text only exist if the command is used in a message
     They're null if the command is used in a slash command */
  message?: Message | null;
  args?: string[] | null;
  text?: string | null;
}
