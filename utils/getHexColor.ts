type Colors = {
  [key: string]: {
    DEFAULT: string;
    [key: number]: string;
  };
};
const colors: Colors = {
  primary: {
    100: "#e6edff",
    200: "#ccdaff",
    300: "#C6BDF9",
    400: "#80a2ff",
    500: "#6F58F8",
    600: "#1a5bff",
    700: "#0041e6",
    800: "#002480",
    900: "#00164d",
    DEFAULT: "#6F58F8",
  },
  neutral: { DEFAULT: "#D9D9D9" },
  black: { DEFAULT: "#353535" },
  available: { 500: "#00C853", 800: "#008035", DEFAULT: "#00C853" },
  unknown: { 500: "#FFD600", 800: "#b39500", DEFAULT: "#FFD600" },
  unavailable: { 500: "#FF4646", 800: "#590000", DEFAULT: "#FF4646" },
};

const getHexColor = (color: string): string | null => {
  const splitColor = color.split("-");
  if (splitColor.length === 1) {
    return colors[splitColor[0] as keyof Colors].DEFAULT as string;
  } else if (splitColor.length === 2) {
    return colors[splitColor[0] as keyof Colors][
      splitColor[1] as keyof Colors as number
    ] as string;
  }
  return null;
};

export default getHexColor;
