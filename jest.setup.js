import { mockGetDimensions } from "./src/test-utils/mockDimensions";

const mockAddEventListener = jest.fn(() => ({
  remove: jest.fn(),
}));

jest.mock("react-native", () => {
  return {
    Dimensions: {
      get: jest.fn(() => mockGetDimensions()),
      addEventListener: mockAddEventListener,
    },
    Platform: { OS: "android" },
    Text: () => null,
  };
});
