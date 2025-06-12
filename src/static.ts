import { Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");
export { SCREEN_WIDTH, SCREEN_HEIGHT };

/**
 * Width Percentage - Scales a size horizontally based on the base width.
 * Useful for responsive horizontal spacing, widths, etc.
 * @param size the width you want
 * @param factor For scaling reference. Defaults to `375` (iPhone X width).
 */
export const wp = (size: number, guidelineBaseWidth = 375) =>
  (Dimensions.get("screen").width / guidelineBaseWidth) * size;

/**
 * Height Percentage - Scales a size vertically based on the base height.
 * Useful for responsive vertical spacing, heights, etc.
 * @param size the height you want
 * @param factor For scaling reference. Defaults to `812` (iPhone X height).
 */
export const hp = (size: number, guidelineBaseHeight = 812) =>
  (Dimensions.get("screen").height / guidelineBaseHeight) * size;

/**
 * Font Percentage - Scales a font size based on the screen height,
 * but allows control via a factor to adjust aggressiveness of scaling.
 * @param size the size you want
 * @param factor default `0.5`
 */
export const fp = (size: number, factor = 0.5) =>
  size + (hp(size) - size) * factor;

/**
 * Smart Percentage - Adjusts a size using the screen aspect ratio and a factor.
 * Use for fine-tuned font or icon scaling.
 * @param size the size you want
 * @param factor default `2.2`
 */
export const sp = (size: number, factor = 2.2): number => {
  return (
    ((Dimensions.get("screen").height / Dimensions.get("screen").width) *
      size) /
    factor
  );
};

export type Orientation = "portrait" | "landscape";

/**
 * Determines the orientation of a screen based on its dimensions.
 * @param {ScaledSize} dim - The dimensions object containing `width` and `height` properties.
 * @returns {Orientation} Returns `"portrait"` if height is greater than or equal to width, otherwise `"landscape"`.
 */
export const getOrientation = (): Orientation => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width ? "portrait" : "landscape";
};

/**
 * Returns true if the screen is in portrait mode
 */
export const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

/**
 * Returns true of the screen is in landscape mode
 */
export const isLandscape = () => {
  const dim = Dimensions.get("screen");
  return dim.width >= dim.height;
};

/**
 * Returns true if we have a tall screen
 * @param threshold Minimum screen height to call it tall. Defaults to `800`.
 */
export const isTall = (threshold = 800) => {
  const dim = Dimensions.get("screen");
  return dim.height >= threshold;
};
