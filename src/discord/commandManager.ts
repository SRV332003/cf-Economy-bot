import { Collection } from 'discord.js';

import { readdir } from 'fs/promises';

export class CommandManager {
    private commands: Collection<string, any> = new Collection();

    private async importCommand(filePath: string) {
        try {
            const { default: command } = await import(filePath);
            if ("data" in command && "execute" in command) {
                this.commands.set(command.data.name, command);
            } else {
                console.log(
                    `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
                );
            }
        } catch (error) {
            console.error(`Error importing ${filePath}: ${error}`);
        }
    }

    private async loadCommands() {
        const commandFiles = await readdir("./src/discord/commands");// doubt here in handling path
        for (const file of commandFiles) {
            this.importCommand(`./commands/${file}`);
        }
    }

    getCommands() {
        const commandsData = new Collection<string, any>();
        this.commands.forEach((command, key) => {
            commandsData.set(command.data.name, command.data.toJSON());
        });
        return commandsData;
    }

    getCommand(name: string) {
        return this.commands.get(name);
    }

    constructor() {
        this.loadCommands();
    }
}