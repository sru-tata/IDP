import { BrowserRouter } from "react-router-dom";

import AppProvider from "./context/AppProvider";

import AppRoutes from "./routes/AppRoutes";

function DemoApp() {

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <AppProvider>
                <AppRoutes />
            </AppProvider>
        </BrowserRouter>
    );

}

export default DemoApp;