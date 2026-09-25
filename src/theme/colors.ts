export const colors = {
  primary: '#ED542F',
  primarySoft: '#FFF0E9',
  background: '#F7F7F7',
  surface: '#FFFFFF',
  text: '#252822',
  textSecondary: '#74766F',
  muted: '#9B9D96',
  border: '#ECEDE8',
  success: '#33866A',
  warning: '#CA881B',
  error: '#D44343',
  onPrimary: '#FFFFFF',
  skeleton: '#EBECE7',
  cream: '#F5F1E8',
  sage: '#EAF0E5',
  lavender: '#EFEDF7',
  blue: '#EAF1F7',
  shadow: '#252822',
} as const;

export type ThemeColors = { [K in keyof typeof colors]: string };

// Semantic tokens allow a future preference/provider to switch the complete palette.
export const darkColors: ThemeColors = {
  ...colors,
  background: '#171916',
  surface: '#232620',
  text: '#F4F4EF',
  textSecondary: '#B1B4AB',
  muted: '#8C9085',
  border: '#35392F',
  primarySoft: '#402B22',
  skeleton: '#34392F',
  cream: '#322F25',
  sage: '#293426',
  lavender: '#302D3B',
  blue: '#26333C',
};
