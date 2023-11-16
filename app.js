const { COUNT_COMMAND, FILTER_COMMAND } = require("./commands");

const parseCommandLineArgs = (args) => {

    const commands = args.map(arg => {
        if (COUNT_COMMAND.matcher(arg).doesMatch) {
            return { transformation: COUNT_COMMAND }
        }
        if (FILTER_COMMAND.matcher(arg).doesMatch) {
            const parameter = FILTER_COMMAND.matcher(arg).parameter
            return { transformation: FILTER_COMMAND, parameter }
        }
        return null
    }).filter(command => command != null);

    return commands
}

const processCommandLineArgs = (args, data) => {
    const commands = parseCommandLineArgs(args)
    return commands.reduce((acc, command) => {
        const { transformation, parameter } = command
        return [...transformation.process(acc, parameter)]
    }, data)

}

module.exports = { processCommandLineArgs }