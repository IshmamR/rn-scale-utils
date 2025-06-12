# rn-scale-utils

![TypeScript](https://img.shields.io/badge/TypeScript-included-blue.svg)
![npm](https://img.shields.io/npm/v/rn-scale-utils)
![License](https://img.shields.io/npm/l/rn-scale-utils)
![Downloads](https://img.shields.io/npm/dw/rn-scale-utils)
![Bundle Size](https://img.shields.io/bundlephobia/minzip/rn-scale-utils)

Responsive utility functions and orientation-aware hooks for React Native apps.  
Easily scale UI dimensions, fonts, and icons based on screen size, and react to orientation changes at runtime.

## ✨ Features

- 📏 Static utilities for apps locked to **portrait mode**
- 🔁 Hook-based utilities for **dynamic orientation tracking**
- 🎯 Supports scaling for width, height, fonts, and aspect ratio
- 📱 Compatible with all screen sizes and devices

## 📦 Installation

```bash
npm install rn-scale-utils
# or
yarn add rn-scale-utils
```

Requires react and react-native as peer dependencies.

## 🧰 Usage

### For apps locked to portrait mode

```typescript
import { wp, hp, fp, sp, isPortrait, isLandscape, isTall } from "rn-scale-utils";

const width = wp(50); // Scaled width
const fontSize = fp(16); // Font scaling
```

### For apps supporting orientation changes

```tsx
import { useOrientation } from "rn-scale-utils";

const Component = () => {
  const {
    wp,
    hp,
    fp,
    sp,
    orientation,
    isPortrait,
    isLandscape,
    screen,
  } = useOrientation();

  return (
    <Text style={{ fontSize: fp(16) }}>
      Orientation: {orientation}
    </Text>
  );
};

```

## 📐 API

### Static Utilities

| Function                | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| `wp(size, baseWidth?)`  | Scales a value based on screen width                      |
| `hp(size, baseHeight?)` | Scales a value based on screen height                     |
| `fp(size, factor?)`     | Font scale based on height with optional factor           |
| `sp(size, factor?)`     | Scales using aspect ratio and factor                      |
| `isPortrait()`          | `true` if screen is taller than wide                      |
| `isLandscape()`         | `true` if screen is wider than tall                       |
| `isTall(threshold?)`    | `true` if screen height exceeds threshold (default `800`) |

### `useOrientation()` Hook

Returns an object with:
- `screen`: current screen size
- `orientation`: `"portrait"` or `"landscape"`
- Scaled utils: `wp`, `hp`, `fp`, `sp`
- Booleans: `isPortrait`, `isLandscape`
- Utility: `isTall(threshold?)`

## 🔧 Build

```bash
npm run build
```

## 📜 License
MIT

## 👨‍💻 Author
Created by IshmamR — contributions welcome!

<!-- GitAds-Verify: 9P16DG7NMSC6WO1PXN2W11K2M7315YHE -->