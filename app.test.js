const { parseCommandLineArgs, COUNT_COMMAND} = require("./app")

describe("Parsing command line arguments", () => {

    test("Should parse a unary command line argument : count", () => {
        //Given
        const args = [COUNT_COMMAND.parameter]

        //When
        const commands = parseCommandLineArgs(args)

        //Then
        expect(commands).toHaveLength(1)
        expect(commands[0]).toBe(COUNT_COMMAND)
    })

    test("Should resturn an empty string when no known commands are passed as command line argument : uppercase", () => {
        //Given
        const args = ["--uppercase"]

        //When
        const commands = parseCommandLineArgs(args)

        //Then
        expect(commands).toHaveLength(0)
    })
})