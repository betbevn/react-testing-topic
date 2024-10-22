import { setupServer } from "msw/node";
import { handlers } from "../../mock/handler";
import { renderHook, waitFor } from "@testing-library/react";
import { useApi } from "./useApi";
import { rest } from "msw";
import { act } from "react-dom/test-utils";

const server = setupServer(...handlers);
const url = "http://localhost:3002/test";

describe("useApi", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => server.resetHandlers());

  describe("GET", () => {
    test("fetch data", async () => {
      const { result } = await renderHook(() => useApi(url));
      await waitFor(() => expect(result.current.data).not.toBeNull());

      expect(result.current.data).toEqual({ message: "Get data" });
      expect(result.current.error).toBeNull();
    });

    test("mock error", async () => {
      server.use(
        rest.get(url, (_, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      const { result } = renderHook(() => useApi(url));

      await waitFor(() =>
        expect(result.current.error).toBe("エラーが発生しました")
      );
    });
  });

  describe("POST", () => {
    test("post data", async () => {
      const { result } = await renderHook(() => useApi(url));
      let response;

      await act(async () => {
        response = await result.current.postData({});
      });

      expect(response!.data).toEqual({ message: "Post data" });
    });

    test("mock error", async () => {
      server.use(
        rest.post(url, (_, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      const { result } = renderHook(() => useApi(url));

      await act(async () => {
        await result.current.postData({});
      });

      await waitFor(() =>
        expect(result.current.error).toBe("エラーが発生しました")
      );
    });
  });
});
