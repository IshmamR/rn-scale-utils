import { useEffect, useState } from "react";
import { Dimensions, type ScaledSize } from "react-native";
import { wp, hp, fp, sp, isTall, type Orientation } from "./static";

type OrientationHookReturn = {
  screen: ScaledSize;
  orientation: Orientation;
  wp: typeof wp;
  hp: typeof hp;
  fp: typeof fp;
  sp: typeof sp;
  isPortrait: boolean;
  isLandscape: boolean;
  isTall: typeof isTall;
};

const getOrientation = (dim: ScaledSize): Orientation =>
  dim.height >= dim.width ? "portrait" : "landscape";

export const useOrientation = (): OrientationHookReturn => {
  const [screen, setScreen] = useState(Dimensions.get("screen"));
  const [orientation, setOrientation] = useState<Orientation>(
    getOrientation(Dimensions.get("screen"))
  );

  useEffect(() => {
    const handler = ({ screen: scr }: { screen: ScaledSize }) => {
      setScreen(scr);
      setOrientation(getOrientation(scr));
    };

    const subscription = Dimensions.addEventListener("change", handler);

    return () => {
      subscription.remove?.(); // for RN >= 0.65
    };
  }, []);

  const wp = (size: number, baseWidth = 375) =>
    (screen.width / baseWidth) * size;

  const hp = (size: number, baseHeight = 812) =>
    (screen.height / baseHeight) * size;

  const fp = (size: number, factor = 0.5) => size + (hp(size) - size) * factor;

  const sp = (size: number, factor = 2.2) =>
    ((screen.height / screen.width) * size) / factor;

  return {
    screen,
    orientation,
    wp,
    hp,
    fp,
    sp,
    isPortrait: orientation === "portrait",
    isLandscape: orientation === "landscape",
    isTall: (threshold = 800) => screen.height >= threshold,
  };
};
