// test for tablet
mockSetDimensions({ width: 800, height: 1280 });

import { render } from "@testing-library/react-native";
import { useEffect } from "react";
import { Text } from "react-native";
import { mockSetDimensions } from "../test-utils/mockDimensions";
import type { OrientationHookReturn } from "../types";
import { useOrientation } from "../useOrientation";

const OrientationTestComponent = ({
  onRender,
}: {
  onRender: (data: OrientationHookReturn) => void;
}) => {
  const orientationData = useOrientation();

  useEffect(() => {
    onRender(orientationData);
  }, [onRender, orientationData]);

  return <Text>Test</Text>;
};

describe("useOrientation", () => {
  let output: OrientationHookReturn | null = null;

  beforeEach(() => {
    render(<OrientationTestComponent onRender={data => (output = data)} />);
  });

  it("returns orientation and scaling helpers", () => {
    expect(output).not.toBeNull();
    expect(output!.orientation).toMatch(/portrait|landscape/);
    expect(typeof output!.wp).toBe("function");
    expect(typeof output!.hp).toBe("function");
    expect(typeof output!.fp).toBe("function");
    expect(typeof output!.sp).toBe("function");
    expect(typeof output!.isTall).toBe("function");
  });

  it("calculates wp correctly", () => {
    const scaled = output!.wp(100, 375);
    expect(scaled).toBeCloseTo(213.33, 2); // 375 width mocked → 100% scaling
  });

  it("calculates hp correctly", () => {
    const scaled = output!.hp(100, 812);
    expect(scaled).toBeCloseTo(157.64, 2); // 812 height mocked → 100% scaling
  });

  it("calculates fp correctly (default factor)", () => {
    const scaled = output!.fp(100);
    expect(scaled).toBeGreaterThan(100); // fp should increase the size
  });

  it("calculates sp correctly", () => {
    const scaled = output!.sp(100);
    expect(typeof scaled).toBe("number");
  });

  it("returns correct isTall value", () => {
    expect(output!.isTall(1000)).toBe(true);
    expect(output!.isTall(1500)).toBe(false);
  });

  it("matches isPortrait and isLandscape with orientation", () => {
    const isPortrait = output!.orientation === "portrait";
    expect(output!.isPortrait).toBe(isPortrait);
    expect(output!.isLandscape).toBe(!isPortrait);
  });
});
