export const mainSectionHeight = "-250px";
export const layoutStyle = (theme) => ({
  [theme.fn.smallerThan("md")]: {
    minHeight: `calc(${mainSectionHeight} + 100vh)`,
  },
  [theme.fn.largerThan("md")]: {
    height: `calc(${mainSectionHeight} + 100vh)`,
  },
});
