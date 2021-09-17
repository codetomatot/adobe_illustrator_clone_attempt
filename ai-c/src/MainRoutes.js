import React from 'react';
import { Route } from "react-router-dom";
import { Switch } from 'react-router-dom';

import Illustrator from "./components/Illustrator";
import Landing from "./components/Landing";
import DisplayImage from "./components/DisplayImage";
import DrawRect from "./components/DrawRect";

export default function MainRoutes(props) {
    return (
        <Switch>
            <Route exact path="/illustrator" component={Illustrator} />
            <Route exact path="/" component={Landing} />
            <Route exact path="/dp" component={DisplayImage} />
            <Route exact path="/dr" component={DrawRect} />
        </Switch>
    )
}