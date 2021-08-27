const colorsLight: string[] = [
  "#d5e6ff",
  "#e8d5cc",
  "#f8cce6",
  "#e0d3f9",
  "#fddecc",
  "#cce7e1",
  "#ffccd1",
  "#d7d7d5",
];
const colorsDark: string[] = [
  "#3f6982",
  "#62534c",
  "#923f6d",
  "#64508d",
  "#906b37",
  "#3c7469",
  "#9b5452",
  "#505558",
];

export const randomColor = (dark: boolean = false): string => {
  return dark
    ? colorsDark[Math.floor(Math.random() * colorsDark.length)]
    : colorsLight[Math.floor(Math.random() * colorsLight.length)];
};

export const switchColor = (color: string): string => {
  if (colorsLight.includes(color)) {
    return colorsDark[colorsLight.indexOf(color)];
  }
  return colorsLight[colorsDark.indexOf(color)];
};
