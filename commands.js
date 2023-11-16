const COUNT_COMMAND = {
    matcher: (arg) => {
        const regex = /^--count$/;
        const match = arg.match(regex);
        return { doesMatch: !!match }
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
        return (match) ? { doesMatch: true, parameter: match[1] } : { doesMatch: false }
    },
    process: (data, filter) => {
        return data.map(element => {
            const { name, people } = element

            const peopleWithFilteredAnimals = people.map(
                person => ({
                    ...person, animals: person.animals.filter(animal => animal.name.toLowerCase().includes(filter.toLowerCase()))
                })
            )
            return { name, people: peopleWithFilteredAnimals }
        })
    }
}

module.exports = { COUNT_COMMAND, FILTER_COMMAND }