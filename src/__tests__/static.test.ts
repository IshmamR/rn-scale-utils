// need to manually mock again because of the nature of the static utils
jest.mock("react-native", () => {
  return {
    Dimensions: {
      get: jest.fn(() => ({ width: 800, height: 1280 })),
    },
  };
});

import {
  fp,
  getOrientation,
  hp,
  isLandscape,
  isPortrait,
  isTall,
  sp,
  wp,
} from "../static";

describe("static with tablet dimensions", () => {
  it("wp calculates width correctly", () => {
    expect(wp(100)).toBeCloseTo((800 / 375) * 100);
  });

  it("hp calculates height correctly", () => {
    expect(hp(100)).toBeCloseTo((1280 / 812) * 100);
  });

  it("fp scales font with factor", () => {
    const base = 100;
    const scaled = hp(base);
    expect(fp(base)).toBeCloseTo(base + (scaled - base) * 0.5);
    expect(fp(base, 1)).toBeCloseTo(scaled);
  });

  it("sp scales smart percentage", () => {
    const expected = ((1280 / 800) * 100) / 2.2;
    expect(sp(100)).toBeCloseTo(expected);
  });

  it("getOrientation returns portrait", () => {
    expect(getOrientation()).toBe("portrait");
  });

  it("isPortrait and isLandscape return correctly", () => {
    expect(isPortrait).toBe(true);
    expect(isLandscape).toBe(false);
  });

  it("isTall detects tall screen", () => {
    expect(isTall()).toBe(true);
    expect(isTall(1400)).toBe(false);
  });
});
