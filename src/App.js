import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SupportRequestC from "./screens/SupportRequestC";
import Dashboard from './screens/Dashboard';
import {ChakraProvider, extendTheme} from "@chakra-ui/react";


const colors = {
    brand: {
        900: "#1a310d",
        800: "#153e75",
        700: "#2a69ac",
    },
}

const theme = extendTheme({colors})

function App() {
    return (
        <Router>
            <Switch>
                <Route path='/dashboard'>
                    <ChakraProvider theme={theme}>
                        <Dashboard/>
                    </ChakraProvider>
                </Route>
                <Route path='/'>
                    <ChakraProvider theme={theme}>
                        <SupportRequestC/>
                    </ChakraProvider>
                </Route>
            </Switch>
        </Router>

    )
}

export default App;
