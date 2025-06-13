import type { ScaledSize } from "react-native";

export type Orientation = "portrait" | "landscape";

export type OrientationHookReturn = {
  screen: ScaledSize;
  orientation: Orientation;
  wp: (size: number, guidelineBaseWidth?: number) => number;
  hp: (size: number, guidelineBaseHeight?: number) => number;
  fp: (size: number, factor?: number) => number;
  sp: (size: number, factor?: number) => number;
  isPortrait: boolean;
  isLandscape: boolean;
  isTall: (threshold?: number) => boolean;
};
