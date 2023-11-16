const { parseCommandLineArgs, processCommandLineArgs } = require("./app")
const { COUNT_COMMAND, FILTER_COMMAND } = require("./commands")

describe("Parsing command line arguments", () => {

    test("Should parse a unary command line argument : --count", () => {
        //Given
        const args = ["--count"]

        //When
        const commands = parseCommandLineArgs(args)

        //Then
        expect(commands).toHaveLength(1)
        expect(commands[0]).toBe(COUNT_COMMAND)
    })

    test("Should process the command line argument --count to count the animals under a person", () => {
        //Given
        const args = ["--count"]
        const data = [{
            name: 'Dillauti',
            people:
                [{
                    name: 'Winifred Graham',
                    animals:
                        [
                            { name: 'Anoa' },
                            { name: 'Duck' }
                        ]
                }, {
                    name: 'Blanche Viciani',
                    animals:
                        [{ name: 'Barbet' },
                        { name: 'Rhea' },
                        { name: 'Snakes' }]
                }]
        },
        {
            name: 'Tohabdal',
            people:
                [{
                    name: 'Effie Houghton',
                    animals:
                        [{ name: 'Zebra' },
                        { name: 'Ring-tailed Lemur' },
                        { name: 'Fly' },
                        { name: 'Blue Iguana' }]
                }]
        }]

        //When
        const transformedData = processCommandLineArgs(args, data)

        //Then
        expect(transformedData).toStrictEqual([{
            name: 'Dillauti',
            people:
                [{
                    name: 'Winifred Graham [2]',
                    animals:
                        [{ name: 'Anoa' },
                        { name: 'Duck' }]
                }, {
                    name: 'Blanche Viciani [3]',
                    animals:
                        [{ name: 'Barbet' },
                        { name: 'Rhea' },
                        { name: 'Snakes' }]
                }]
        }, {
            name: 'Tohabdal',
            people:
                [{
                    name: 'Effie Houghton [4]',
                    animals:
                        [{ name: 'Zebra' },
                        { name: 'Ring-tailed Lemur' },
                        { name: 'Fly' },
                        { name: 'Blue Iguana' }]
                }]
        }])
    })

    test("Should return an empty string when no known commands are passed as command line argument : uppercase", () => {
        //Given
        const args = ["--uppercase"]

        //When
        const commands = parseCommandLineArgs(args)

        //Then
        expect(commands).toHaveLength(0)
    })

    test("Should parse a binary command line argument : --filter=", () => {
        //Given
        const args = ["--filter=ry"]

        //When
        const commands = parseCommandLineArgs(args)

        //Then
        expect(commands).toHaveLength(1)
        expect(commands[0]).toBe(FILTER_COMMAND
        )
    })

    test("Should not parse a binary command line argument who is presented as unary : --filter", () => {
        //Given
        const args = ["--filter"]

        //When
        const commands = parseCommandLineArgs(args)

        //Then
        expect(commands).toHaveLength(0)
    }
    )
})