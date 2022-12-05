import {Home} from "../pages/Home/Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Game} from "../pages/Game/Game";
import {Signup} from "../components/Signup/Signup";

export const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/game">
                    <Game/>
                </Route>
                <Route exact path="/signup">
                    <Signup/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}