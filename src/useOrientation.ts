import { useCallback, useEffect, useMemo, useState } from "react";
import { Dimensions, type ScaledSize } from "react-native";
import type { Orientation, OrientationHookReturn } from "./types";

export const useOrientation = (): OrientationHookReturn => {
  const [screen, setScreen] = useState(Dimensions.get("screen"));

  const orientation: Orientation = useMemo(() => {
    return screen.height >= screen.width ? "portrait" : "landscape";
  }, [screen.height, screen.width]);

  useEffect(() => {
    const handler = ({ screen: scr }: { screen: ScaledSize }) => {
      try {
        setScreen(scr);
      } catch (error) {
        console.warn(
          "[RN_SCALE_UTILS] Failed to update screen dimensions:",
          error
        );
      }
    };

    const subscription = Dimensions.addEventListener("change", handler);

    return () => {
      subscription?.remove?.(); // for RN >= 0.65
    };
  }, []);

  const wp = useCallback(
    (size: number, baseWidth = 375) => {
      if (size <= 0) return 0;
      if (baseWidth <= 0) return size;
      return (screen.width / baseWidth) * size;
    },
    [screen.width]
  );

  const hp = useCallback(
    (size: number, baseHeight = 812) => {
      if (size <= 0) return 0;
      if (baseHeight <= 0) return size;
      return (screen.height / baseHeight) * size;
    },
    [screen.height]
  );

  const fp = useCallback(
    (size: number, factor = 0.5) => size + (hp(size) - size) * factor,
    [hp]
  );

  const sp = useCallback(
    (size: number, factor = 2.2) =>
      ((screen.height / screen.width) * size) / factor,
    [screen.height, screen.width]
  );

  const isTall = useCallback(
    (threshold = 800) => screen.height >= threshold,
    [screen.height]
  );

  return {
    screen,
    orientation,
    wp,
    hp,
    fp,
    sp,
    isPortrait: orientation === "portrait",
    isLandscape: orientation === "landscape",
    isTall,
  };
};
