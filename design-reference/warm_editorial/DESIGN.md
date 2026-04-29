---
name: Warm Editorial
colors:
  surface: '#fff8f6'
  surface-dim: '#e6d7d1'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1eb'
  surface-container: '#faebe5'
  surface-container-high: '#f4e5df'
  surface-container-highest: '#efdfd9'
  on-surface: '#211a17'
  on-surface-variant: '#54433c'
  inverse-surface: '#372f2b'
  inverse-on-surface: '#fdeee7'
  outline: '#87736a'
  outline-variant: '#d9c2b8'
  surface-tint: '#924b25'
  primary: '#924b25'
  on-primary: '#ffffff'
  primary-container: '#e08a5e'
  on-primary-container: '#5f2501'
  inverse-primary: '#ffb692'
  secondary: '#40674d'
  on-secondary: '#ffffff'
  secondary-container: '#bfeaca'
  on-secondary-container: '#446b51'
  tertiary: '#00696c'
  on-tertiary: '#ffffff'
  tertiary-container: '#44aeb1'
  on-tertiary-container: '#003d3f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcb'
  primary-fixed-dim: '#ffb692'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#74340f'
  secondary-fixed: '#c2edcd'
  secondary-fixed-dim: '#a6d1b2'
  on-secondary-fixed: '#002110'
  on-secondary-fixed-variant: '#284e37'
  tertiary-fixed: '#8ef3f6'
  tertiary-fixed-dim: '#70d6d9'
  on-tertiary-fixed: '#002021'
  on-tertiary-fixed-variant: '#004f51'
  background: '#fff8f6'
  on-background: '#211a17'
  surface-variant: '#efdfd9'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  button:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  safe-area: 24px
  gutter: 16px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
  touch-target: 56px
---

## Brand & Style

This design system is built for a lifestyle-first experience, moving away from utility-heavy "dashboard" aesthetics toward an editorial, magazine-inspired feel. The brand personality is welcoming, tactile, and effortless—tailored for college students who value both convenience and quality. 

The design style is **Minimalism with a Tactile Editorial influence**. It prioritizes heavy whitespace and "breathing room" to reduce cognitive load, using large, confident typography as the primary navigational anchor. By removing the traditional bottom navigation bar, the interface emphasizes immersive, card-based interactions and one-thumb usability, creating a focused "flow" state rather than a complex information hierarchy.

## Colors

The palette is anchored by a warm off-white background that mimics high-quality paper stock, paired with a charcoal text color for high legibility without the harshness of pure black. 

The system utilizes two core brand gradients to distinguish between the app's two primary modes: 
- **Terracotta (Swipe Today):** Used for discovery, decision-making, and high-energy interactions. 
- **Sage (Cook Tonight):** Used for instructional content, ingredient lists, and calm, process-oriented tasks. 

Neutral tones should be used sparingly, primarily as subtle dividers or background fills for secondary card elements, maintaining the warmth of the `#FAF7F2` base.

## Typography

This design system uses **Plus Jakarta Sans** (as a high-quality alternative to Nunito that maintains the friendly, rounded, and confident editorial feel) to drive the visual narrative. 

Typography is used as a structural element. Headlines should be oversized and tight-leading to create a "bold" editorial statement. Body text is set with generous line height to ensure maximum readability on mobile screens. Use the `label-caps` style for category tags or small metadata to provide contrast against the large, organic shapes of the headlines.

## Layout & Spacing

The layout follows a **Fluid Margin** model optimized for one-handed mobile use. 
- **Safe Areas:** A generous 24px margin on the left and right edges ensures content never feels cramped.
- **Vertical Rhythm:** Elements are stacked using a 8px base grid, but primary sections should use `stack-lg` (48px) to create the intentional "white space" characteristic of lifestyle magazines.
- **Thumb Zone:** Interactive elements must be placed within the lower two-thirds of the screen. Since there is no bottom nav bar, the "Home" or "Back" actions should be integrated into large, accessible floating elements or gestures.

## Elevation & Depth

Depth is conveyed through **Tonal Layers** and **Ambient Shadows** rather than traditional borders.
- **Surface Depth:** Cards use a very slight brightness shift from the background or a soft, diffused shadow (15% opacity of the brand colors) to appear "lifted."
- **Interaction Shifting:** When a card is swiped or tapped, use a slight scale-down effect (98%) to mimic physical compression.
- **Backdrop Blurs:** Use subtle background blurs (10px - 20px) behind floating action buttons or overlays to maintain context of the underlying "Swipe" or "Cook" state without cluttering the view.

## Shapes

The shape language is organic and approachable. 
- **Primary Cards:** Use `rounded-lg` (1rem/16px) for recipe cards and food imagery to soften the editorial look.
- **Action Elements:** Buttons and interactive chips use `rounded-xl` (1.5rem/24px) or full pill-shapes to signify touchability.
- **Imagery:** Photos should always have rounded corners to match the UI containers, reinforcing the "warm" and friendly brand personality.

## Components

### Buttons & Large Tap Targets
All primary actions must meet a minimum `touch-target` of 56px in height. Primary buttons should utilize the brand gradients with white text. Secondary buttons should use a subtle tint of the background color with charcoal text.

### Recipe Cards
Cards are the hero of the application. They should feature full-bleed imagery at the top with a bottom-weighted typography area. Use "Swipe Today" terracotta accents for the "Save" or "Like" interactions within the card.

### Editorial Lists
List views should avoid thin grey dividers. Instead, use generous vertical spacing (`stack-md`) and subtle background fills to separate items. Information should be hierarchically clear: Title (H3) followed by minimal metadata (Label-Caps).

### Selection & Inputs
Checkboxes for ingredient lists should be oversized and circular, turning into the "Cook Tonight" sage green when active. Text inputs should be "Ghost Style"—no heavy borders, just a simple underline or a very light tonal fill that expands slightly when focused.

### Gestural Navigation
Since no bottom nav exists, use a "Floating Trigger" at the bottom center of the screen. This trigger should be a pill-shaped element that expands into a full-screen menu or toggles between the "Swipe" and "Cook" modes with a fluid animation.