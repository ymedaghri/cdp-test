const { COUNT_COMMAND, FILTER_COMMAND } = require("./commands");

const parseCommandLineArgs = (args) => {

    const temporallyCoupledCommands = [FILTER_COMMAND, COUNT_COMMAND]
    const instructions = []

    for (const command of temporallyCoupledCommands) {
        instructions.push(...args.map(arg => {
            if (command.matcher(arg).doesMatch) {
                const parameter = command.matcher(arg).parameter
                return { transformation: command, parameter }
            }
            return null
        }).filter(instruction => instruction != null))
    }

    return instructions
}

const processCommandLineArgs = (args, data) => {
    const commands = parseCommandLineArgs(args)
    return commands.reduce((acc, command) => {
        const { transformation, parameter } = command
        return [...transformation.process(acc, parameter)]
    }, data)

}

module.exports = { processCommandLineArgs }