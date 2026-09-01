---
name: Signal / Quiet Utility
description: A focused visual language for building calm, structured interfaces with an agent and a human in the same workspace.
colors:
  primary: "#202426"
  ink: "#202426"
  paper: "#F5F3EE"
  surface: "#FFFFFF"
  muted: "#6F7573"
  line: "#D9D7D0"
  accent: "#C8F169"
  accentInk: "#18200E"
typography:
  display:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 56px
    fontWeight: 700
    lineHeight: 0.98
  heading:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Arial, Helvetica, sans-serif
    fontSize: 11px
    fontWeight: 700
    lineHeight: 1
rounded:
  sm: 8px
  md: 14px
  lg: 22px
  pill: 999px
spacing:
  xs: 8px
  sm: 12px
  md: 20px
  lg: 32px
  xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "12px 18px"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accentInk}"
    rounded: "{rounded.pill}"
    padding: "12px 18px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  divider:
    backgroundColor: "{colors.line}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs}"
  caption:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs}"
---

## Overview

Signal / Quiet Utility is a calm, structured visual language for a shared editor. The interface should make the active contract visible while keeping the canvas primary.

## Colors

Ink and paper form the stable foundation. The accent is reserved for primary actions, validation health, and agent presence.

## Typography

Typography is compact and utilitarian. Display text carries hierarchy; labels stay small and deliberate.

## Layout

Use the spacing scale and avoid arbitrary values. Keep the canvas centered, readable, and surrounded by inspectable context.

## Components

Component entries are the enforceable bridge between the editor and generated interfaces. Variants should resolve to existing tokens.

## Do's and Don'ts

- Do use contract tokens for color, spacing, radius, and component styling.
- Do show validation status and the effect of human and agent changes.
- Don't introduce one-off values without updating this contract.
