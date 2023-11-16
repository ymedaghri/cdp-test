const COUNT_COMMAND = {
    matcher: (arg) => {
        const regex = /^--count$/;
        const match = arg.match(regex);
        return !!match
    },
    process: (data) => {
        return data.map(element => {
            const { name, people } = element

            const peopleWithCount = people.map(
                person => ({
                    ...person, name: `${person.name} [${person.animals.length}]`
                })
            )
            return { name, people: peopleWithCount }
        })
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

const processCommandLineArgs = (args, data) => {
    const commands = parseCommandLineArgs(args)
    return commands.reduce((acc, command) => {
        return [...acc, ...command.process(data)]
    }, [])

}

module.exports = { parseCommandLineArgs, processCommandLineArgs, COUNT_COMMAND, FILTER_COMMAND }