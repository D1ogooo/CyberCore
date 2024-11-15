import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { customTheme } from "../theme.ts";
import { Router } from "./routes/index";
import { AuthProvider } from "./hooks/useAuth.tsx";
import "./index.css";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ChakraProvider theme={customTheme}>
			<AuthProvider>
				<Router />
			</AuthProvider>
		</ChakraProvider>
	</StrictMode>,
);
