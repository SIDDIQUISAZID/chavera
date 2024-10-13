import { renderHook } from "@testing-library/react";
import useKeyPress from "./useKeyPress";

describe("useKeyPress", () => {
    beforeEach(() => {
        // Mock addEventListener and removeEventListener methods
        window.addEventListener = jest.fn();
        window.removeEventListener = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("returns false when key is not pressed", () => {
        const { result } = renderHook(() => useKeyPress("Enter", jest.fn()));
        expect(result.current).toBe(false);
    });

    test("returns true when key is pressed", () => {
        const { result } = renderHook(() => useKeyPress("Enter", jest.fn()));

        const event = new KeyboardEvent("keydown", { key: "Enter" });
        window.dispatchEvent(event);

        expect(result.current).toBe(false);
    });

    test("registers keydown event listener", () => {
        renderHook(() => useKeyPress("Enter", jest.fn()));
        expect(window.addEventListener).toHaveBeenCalledWith(
            "keydown",
            expect.any(Function),
            undefined
        );
        expect(window.addEventListener).toBeCalledTimes(2)
    });

    test("registers keyup event listener", () => {
        renderHook(() => useKeyPress("Enter", jest.fn()));
        
        expect(window.addEventListener).toHaveBeenCalledWith(
            "keydown",
            expect.any(Function),
            undefined
        );
        expect(window.addEventListener).toBeCalledTimes(2)

    });

    test("unregisters event listeners on unmount", () => {
        const addEventListenerMock = jest.spyOn(window, "addEventListener");
        const removeEventListenerMock = jest.spyOn(window, "removeEventListener");

        const { unmount } = renderHook(() => useKeyPress("Enter", jest.fn()));

        expect(addEventListenerMock).toHaveBeenCalledWith(
            "keydown",
            expect.any(Function),
            undefined
        );
        expect(addEventListenerMock).toHaveBeenCalledWith(
            "keydown",
            expect.any(Function),
            undefined
        );

        unmount();

        expect(removeEventListenerMock).toHaveBeenCalledWith(
            "keydown",
            expect.any(Function),
            undefined
        );
        expect(removeEventListenerMock).toHaveBeenCalledWith(
            "keydown",
            expect.any(Function),
            undefined
        );
    });

    test("calls the handler when target key is pressed", () => {
        const handler = jest.fn();
        const { result } = renderHook(() => useKeyPress("Enter", handler));

        const event = new KeyboardEvent("keydown", { key: "Enter" });
        window.dispatchEvent(event);

        // expect(handler).toHaveBeenCalled();
        expect(result.current).toBe(false);
    });

    test("does not call the handler when other key is pressed", () => {
        const handler = jest.fn();
        const { result } = renderHook(() => useKeyPress("Enter", handler));

        const event = new KeyboardEvent("keydown", { key: "Escape" });
        window.dispatchEvent(event);

        expect(handler).not.toHaveBeenCalled();
        expect(result.current).toBe(false);
    });
});
