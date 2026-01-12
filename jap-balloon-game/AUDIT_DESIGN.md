# 3D Visual Artifacts & Mobile Viewport Audit

This document outlines the findings from reviewing `3D_ISO_Styles.css` and `App.tsx`, focusing on visual artifacts in the 3D effects and layout issues within mobile viewports.

## 1. 3D Visual Artifacts (3D_ISO_Styles.css)
The application uses a "faux-3D" technique relying on stacked `text-shadow` layers and CSS transforms. While performant, this creates several visual artifacts.

### A. "Stepped" Shadow Artifacts
- **Issue**: The `text-shadow` stack uses discrete pixel increments (`0 1px 0`, `0 2px 0`, etc.).
- **Visual Defect**: On high-resolution displays (Retina/OLED) or when the element is scaled up, these discrete steps become visible as jagged ridges rather than a smooth 3D extrusion. It lacks the smooth gradient or shading of a true 3D mesh.

### B. Disproportionate Depth Scaling
- **Issue**: The shadow offsets are defined in fixed pixels (e.g., `0 20px 20px`).
- **Visual Defect**: The media query reduces `font-size` from `8rem` to `5rem` (a ~37.5% reduction), but the shadow depth remains constant.
- **Result**: On mobile, the text appears to have a disproportionately thick "slab" depth compared to its face size, distorting the isometric aesthetic and potentially obscuring other UI elements.

### C. Transform Aliasing
- **Issue**: `rotateX(20deg) rotateY(-15deg)` is applied to standard DOM text nodes.
- **Visual Defect**: Browsers often rasterize transformed text at the logical resolution before the transform. This results in "jaggies" or blurred edges (aliasing) along the characters, especially on non-rectilinear strokes.

## 2. Mobile Viewport & Layout Deviations (App.tsx)
The current layout configuration poses significant risks for content overflow and UI occlusion on mobile devices.

### A. Viewport Height Instability (`100vh`)
- **Issue**: `.game-container` uses `height: 100vh`.
- **Defect**: On mobile browsers (Safari iOS, Chrome Android), `100vh` includes the area covered by the address bar and navigation controls.
- **Result**: The bottom part of the UI (potentially the input field or "RETRY" button) will be cut off or covered by the browser chrome.

### B. Horizontal Text Overflow
- **Issue**: `font-size: 5rem` is mandated for screens `< 768px`.
- **Defect**: On a standard mobile device (width ~375px), `5rem` (approx 80px) allows for only ~4-5 characters before overflowing the viewport width.
- **Result**: Long words or scores will be clipped by the `.game-container`'s `overflow: hidden`, making the game unplayable or information unreadable.

### C. Virtual Keyboard Occlusion
- **Issue**: The `<input>` field is positioned at the bottom of the visual stack, and `autoFocus` is enabled.
- **Defect**: When the virtual keyboard opens:
    - On iOS: The keyboard slides up and covers the bottom ~40% of the screen. The input field (being at the bottom) is completely hidden behind the keyboard.
    - On Android: The viewport might resize, squashing the flex container and potentially pushing the 3D text on top of the input field or hiding it entirely.

### D. Z-Axis Flattening
- **Issue**: The UI lacks `transform-style: preserve-3d` or perspective on the parent.
- **Defect**: The 3D rotation of the text is calculated relative to its own plane, not a shared 3D space. This creates a "flat card" look rather than a true isometric integration with the 3D Spline background.

## 3. Remediation Strategy

### CSS Improvements
1.  **Units**: Switch shadow offsets from `px` to `em` to ensure depth scales perfectly with font size.
2.  **Viewport**: Replace `height: 100vh` with `height: 100dvh` (dynamic viewport height) to respect browser chrome.
3.  **Typography**: Use fluid typography `clamp(3rem, 15vw, 8rem)` instead of fixed breakpoints to guarantee fit on narrow screens.
4.  **Rendering**: Add `backface-visibility: hidden` and `will-change: transform` to potentially improve anti-aliasing.

### Layout Logic
1.  **Keyboard Awareness**: Move the input field to the top of the screen or use a "Keyboard Avoidance" view strategy (e.g., shifting the view up when focused).
2.  **Safety Margins**: Add `padding-bottom: env(safe-area-inset-bottom)` for modern gesture-based phones.
