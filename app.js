const COUNT_COMMAND = {
    matcher: (arg) => {
        const regex = /^--count$/;
        const match = arg.match(regex);
        return !!match
    }
}

const FILTER_COMMAND = {
    matcher: (arg) => {
        const regex = /^--filter=(.+)$/;
        const match = arg.match(regex);
        return !!match
    }
}

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

module.exports = { parseCommandLineArgs, COUNT_COMMAND, FILTER_COMMAND }