const { parseCommandLineArgs, COUNT_COMMAND, FILTER_COMMAND } = require("./app")

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