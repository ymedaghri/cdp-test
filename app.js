const COUNT_COMMAND = {
    parameter: "--count"
}

const parseCommandLineArgs = (args) => {

    const commands = args.map(arg => {
        if (arg === COUNT_COMMAND.parameter) {
            return COUNT_COMMAND
        }

        return null
    }).filter(command=>command!=null);

    return commands
}

module.exports = { parseCommandLineArgs, COUNT_COMMAND }