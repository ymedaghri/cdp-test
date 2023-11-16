const { processCommandLineArgs } = require("./app")

describe("Parsing command line arguments", () => {


    test("Should process the command line argument --count to count the animals under a person", () => {
        //Given
        const args = ["--count"]
        const data = getData()
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
                        { name: 'John Dory' }]
                }, {
                    name: 'Blanche Viciani [3]',
                    animals:
                        [{ name: 'Oryx' },
                        { name: 'Rhea' },
                        { name: 'Ryan Blanton' }]
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

    test("Should process the command line argument --uppercase by doing nothing to the data since this command is unknown", () => {
        //Given
        const args = ["--uppercase"]
        const data = getData()
        //When
        const transformedData = processCommandLineArgs(args, data)

        //Then
        expect(transformedData).toStrictEqual(data)
    })

    test("Should process the command line argument --filter with no params by doing nothing to the data since this command is a non unary and should receive a parameter", () => {
        //Given
        const args = ["--filter"]
        const data = getData()
        //When
        const transformedData = processCommandLineArgs(args, data)

        //Then
        expect(transformedData).toStrictEqual(data)
    })

    test("Should parse a binary command line argument : --filter=ry and filter accorgding to the param", () => {
        //Given
        const args = ["--filter=ry"]
        const data = getData()

        //When
        const transformedData = processCommandLineArgs(args, data)

        //Then
        expect(transformedData).toStrictEqual([{
            name: 'Dillauti',
            people:
                [{
                    name: 'Winifred Graham',
                    animals:
                        [{ name: 'John Dory' }]
                }, {
                    name: 'Blanche Viciani',
                    animals:
                        [
                            { name: 'Oryx' },
                            { name: 'Ryan Blanton' }
                        ]
                }]
        }, {
            name: 'Tohabdal',
            people:
                [{
                    name: 'Effie Houghton',
                    animals: []
                }]
        }])
    })

    test("Should parse two commands --count and --filter=ry that present natively a temporal coupling", () => {
        //Given
        const args = ["--filter=ry", "--count"]
        const data = getData()

        //When
        const transformedData = processCommandLineArgs(args, data)

        //Then
        expect(transformedData).toStrictEqual([{
            name: 'Dillauti',
            people:
                [{
                    name: 'Winifred Graham [1]',
                    animals:
                        [{ name: 'John Dory' }]
                }, {
                    name: 'Blanche Viciani [2]',
                    animals:
                        [
                            { name: 'Oryx' },
                            { name: 'Ryan Blanton' }
                        ]
                }]
        }, {
            name: 'Tohabdal',
            people:
                [{
                    name: 'Effie Houghton [0]',
                    animals: []
                }]
        }])
    })

    test("Test the same temporal coupling in the other direction", () => {
        //Given
        const args = ["--count", "--filter=ry"]
        const data = getData()

        //When
        const transformedData = processCommandLineArgs(args, data)

        //Then
        expect(transformedData).toStrictEqual([{
            name: 'Dillauti',
            people:
                [{
                    name: 'Winifred Graham [1]',
                    animals:
                        [{ name: 'John Dory' }]
                }, {
                    name: 'Blanche Viciani [2]',
                    animals:
                        [
                            { name: 'Oryx' },
                            { name: 'Ryan Blanton' }
                        ]
                }]
        }, {
            name: 'Tohabdal',
            people:
                [{
                    name: 'Effie Houghton [0]',
                    animals: []
                }]
        }])
    })
})


function getData() {
    return [{
        name: 'Dillauti',
        people:
            [{
                name: 'Winifred Graham',
                animals:
                    [
                        { name: 'Anoa' },
                        { name: 'John Dory' }
                    ]
            }, {
                name: 'Blanche Viciani',
                animals:
                    [{ name: 'Oryx' },
                    { name: 'Rhea' },
                    { name: 'Ryan Blanton' }]
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
}