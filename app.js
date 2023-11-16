const { COUNT_COMMAND, FILTER_COMMAND } = require("./commands");

const parseCommandLineArgs = (args) => {

    const commands = args.map(arg => {
        if (COUNT_COMMAND.matcher(arg)) {
            return COUNT_COMMAND
        }
        if (FILTER_COMMAND.matcher(arg)) {
            return FILTER_COMMAND
        }
        return null
    }).filter(command => command != null);

    return commands
}

const processCommandLineArgs = (args, data) => {
    const commands = parseCommandLineArgs(args)
    return commands.reduce((acc, command) => {
        return [...acc, ...command.process(data)]
    }, [])

}

module.exports = { parseCommandLineArgs, processCommandLineArgs }