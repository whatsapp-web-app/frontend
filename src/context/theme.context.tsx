import React, {createContext, useEffect, useMemo} from "react";
import {ThemeProvider as MuiThemeProvider, createTheme, Box, CircularProgress} from "@mui/material";
import { Theme } from "@emotion/react";

export enum ThemeOption {
  DEFAULT = "default",
  THEME_2 = "theme2",
  THEME_1 = "theme1",
}

export enum FontOption {
  ROBOTO = "Roboto",
  RUBIK = "Rubik",
}

type ThemeContextProps = {
  theme: ThemeOption;
  setTheme: React.Dispatch<React.SetStateAction<ThemeOption>>;
  toggleTheme: (theme: ThemeOption) => void;
  font: FontOption;
  setFont: React.Dispatch<React.SetStateAction<FontOption>>;
  toggleFont: (font: FontOption) => void;
};
export const ThemeContext = createContext({} as ThemeContextProps);

type Palette = {
  [key in ThemeOption]: Theme;
};

const palette: Palette = {
  [ThemeOption.DEFAULT]: {
    palette: {
      primary: {
        main: "#0a2463",
      },
      secondary: {
        main: "#3e92cc",
      },
      background: {
        default: "#f5f5f5",
      },
    },
  },
  [ThemeOption.THEME_1]: {
    palette: {
      primary: {
        main: "#094074",
      },
      secondary: {
        main: "#ffdd4a",
      },
      background: {
        default: "#f5f5f5",
      },
    },
  },
  [ThemeOption.THEME_2]: {
    palette: {
      primary: {
        main: "#47C857",
      },
      secondary: {
        main: "#134d04",
      },
      background: {
        default: "#f5f5f5",
      },
    },
  },
};

const fonts = {
  [FontOption.ROBOTO]: {
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
          }
        `,
      },
    },
  },
  [FontOption.RUBIK]: {
    typography: {
      fontFamily: "Rubik, sans-serif",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'Rubik';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
          }
        `,
      },
    },
  },
};

type ThemeContextProviderProps = {
  children: React.ReactNode;
};
export const ThemeProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [theme, setTheme] = React.useState<ThemeOption>(ThemeOption.THEME_2);
  const [font, setFont] = React.useState<FontOption>(FontOption.ROBOTO);

  function create(theme: ThemeOption, font: FontOption) {
    return createTheme({
      ...palette[theme],
      ...fonts[font],
    });
  }

  const toggleTheme = (theme: ThemeOption) => {
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };
  const toggleFont = (font: FontOption) => {
    localStorage.setItem("font", font);
    setFont(font);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || ThemeOption.THEME_2;
    const storedFont = localStorage.getItem("fonts") || FontOption.ROBOTO;
    console.log(storedTheme, storedFont);
    setTheme(storedTheme as ThemeOption);
    setFont(storedFont as FontOption);
    setIsLoading(false);
  }, []);



  const values=useMemo(()=>({
    theme,
    setTheme,
    toggleTheme,
    font,
    setFont,
    toggleFont
  }),[theme,font])

  if (isLoading) {
    return (
        <Box width={'100vw'} height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} >
          <CircularProgress color="secondary" />
        </Box>
    )
  }


  return (
    <MuiThemeProvider theme={create(theme, font)}>
      <ThemeContext.Provider
        value={values}
      >
        {children}
      </ThemeContext.Provider>
    </MuiThemeProvider>
  );
};
