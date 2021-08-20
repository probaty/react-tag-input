const colors: string[] = [
  "#d5e6ff",
  "#e8d5cc",
  "#f8cce6",
  "#e0d3f9",
  "#fddecc",
  "#cce7e1",
  "#ffccd1",
  "#d7d7d5",
];

export const randomColor = (): string => {
  return colors[Math.floor(Math.random() * colors.length)];
};
