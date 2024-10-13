import { renderHook, act } from "@testing-library/react";
import useMultiStep from "./useMultiStep";

describe("useMultiStep", () => {
  test("initializes with default values", () => {
    const { result } = renderHook(() =>
      useMultiStep({ totalCount: 100, initialPage: 2, initialPerPage: 20 })
    );

    expect(result.current.page).toBe(2);
    expect(result.current.perPage).toBe(20);
    expect(result.current.lastPage).toBe(5);
    expect(result.current.canNext).toBe(true);
    expect(result.current.canPrev).toBe(true);
    expect(result.current.totalDataCount).toBe(100);
  });

  test("goes to the next page", () => {
    const { result } = renderHook(() => useMultiStep({ totalCount: 100 }));

    act(() => {
      result.current.goNext();
    });

    expect(result.current.page).toBe(2);
  });

  test("goes to the previous page", () => {
    const { result } = renderHook(() =>
      useMultiStep({ totalCount: 100, initialPage: 2 })
    );

    act(() => {
      result.current.goPrev();
    });

    expect(result.current.page).toBe(1);
  });

  test("goes to a specific page", () => {
    const { result } = renderHook(() => useMultiStep({ totalCount: 100 }));

    act(() => {
      result.current.goTo(3);
    });

    expect(result.current.page).toBe(3);
  });

  test("changes the number of items per page", () => {
    const { result } = renderHook(() =>
      useMultiStep({ totalCount: 100, initialPerPage: 10 })
    );

    act(() => {
      result.current.setPerPage(25);
    });

    expect(result.current.perPage).toBe(25);
  });

  test("updates the total data count", () => {
    const { result } = renderHook(() => useMultiStep({ totalCount: 100 }));

    act(() => {
      result.current.setTotalDataCount(150);
    });

    expect(result.current.totalDataCount).toBe(150);
    expect(result.current.lastPage).toBe(10);
  });

  test("checks if next and previous pages are available", () => {
    const { result } = renderHook(() => useMultiStep({ totalCount: 100 }));

    expect(result.current.canNext).toBe(true);
    expect(result.current.canPrev).toBe(false);

    act(() => {
      result.current.goTo(5);
    });

    expect(result.current.canNext).toBe(true);
    expect(result.current.canPrev).toBe(true);
  });
});
