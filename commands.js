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

module.exports = { COUNT_COMMAND, FILTER_COMMAND }