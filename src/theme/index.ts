import { colors, darkColors } from './colors';
import { spacing, layout } from './spacing';
import { radius } from './radius';
import { fonts, typography } from './typography';
import { shadows } from './shadows';
export const theme = { colors, spacing, layout, radius, fonts, typography, shadows };
export const darkTheme = { ...theme, colors: darkColors };
