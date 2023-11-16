import { createTheme } from "@mui/material/styles";

export const light = createTheme({
    palette: {
        primary: {
            main: "#B3FEEC",
            contrastText: "#ffff",
        },
        error:{
          main: "#F93434",
          contrastText: "#ffff",
        },
        success:{
          main: "#39DC79",
          contrastText: "#ffff",
        },
        secondary:{
          main: "#39DC79",
          contrastText: "#252836",
        }
    },
});
