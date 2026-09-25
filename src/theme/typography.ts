export const fonts = {
  regular: 'BeVietnamPro_400Regular',
  medium: 'BeVietnamPro_500Medium',
  semibold: 'BeVietnamPro_600SemiBold',
  bold: 'BeVietnamPro_700Bold',
} as const;
export const typography = {
  display: { fontFamily: fonts.bold, fontSize: 34, lineHeight: 44, letterSpacing: -1.5 },
  title: { fontFamily: fonts.bold, fontSize: 24, lineHeight: 34, letterSpacing: -0.6 },
  heading: { fontFamily: fonts.semibold, fontSize: 18, lineHeight: 28, letterSpacing: -0.4 },
  body: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 22 },
  label: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 22 },
  caption: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 19 },
  eyebrow: { fontFamily: fonts.semibold, fontSize: 10, lineHeight: 16, letterSpacing: 2 },
} as const;
