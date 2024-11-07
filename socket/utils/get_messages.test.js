const get_messages = require("./get_messages");
const { getMessages } = require("../db/client");

jest.mock("../db/client", () => ({
    getMessages: jest.fn(),
}));

describe("get_messages", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("should call getMessages with argument '1'", async () => {
        getMessages.mockResolvedValueOnce([{ id: 1, text: "Hello" }]);

        await get_messages();

        expect(getMessages).toHaveBeenCalledWith("1");
    });

    test("should return an object with the correct structure", async () => {
        const mockData = [{ id: 1, text: "Hello" }];
        getMessages.mockResolvedValueOnce(mockData);

        const result = await get_messages();

        expect(result).toEqual({
            "1": mockData,
        });
    });
});
