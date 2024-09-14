export const mainSectionHeight = "-10.550rem";
export const layoutStyle = (theme) => ({
  [theme.fn.smallerThan("sm")]: {
    minHeight: `calc(${mainSectionHeight} + 100vh)`,
  },
  [theme.fn.largerThan("md")]: {
    height: `calc(${mainSectionHeight} + 100vh)`,
  },
});
