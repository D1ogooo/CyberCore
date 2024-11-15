import { extendTheme } from "@chakra-ui/react";

export const customTheme = extendTheme({
  config: {
    useSystemColorMode: false, // Não usar o modo de cor do sistema
  },
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#09090B", 
      },
    },
  },
});