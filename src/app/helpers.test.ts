import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { isErrorWithMessage, isFetchBaseQueryError } from "./helpers";

describe("Type Predicates Helpers", () => {
  test("isFetchBaseQueryError should correctly identify FetchBaseQueryError", () => {
    const validError: FetchBaseQueryError = {
      status: 500,
      data: null,
    };

    const invalidError: unknown = {
      data: null,
    };

    expect(isFetchBaseQueryError(validError)).toBe(true);
    expect(isFetchBaseQueryError(invalidError)).toBe(false);
  });

  test("isErrorWithMessage should correctly identify error object with message property", () => {
    const validError: { message: string } = {
      message: "Something went wrong",
    };

    const invalidError: unknown = {
      errorMessage: "Invalid error",
    };

    expect(isErrorWithMessage(validError)).toBe(true);
    expect(isErrorWithMessage(invalidError)).toBe(false);
  });
});
