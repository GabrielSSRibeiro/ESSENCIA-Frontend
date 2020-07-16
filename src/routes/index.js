import React, { useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import api from "../services/api";

import Login from "../pages/Login";

import Dashboard from "../pages/Dashboard";
import PlayerGames from "../pages/Dashboard/PlayerGames";
import GMGames from "../pages/Dashboard/GMGames";
import NewGame from "../pages/Dashboard/GMGames/NewGame";

//  CharCreation
import CharCreation from "./charCreation";

// GM
import GMPanel from "../pages/GMPanel";
import Management from "../pages/GMPanel/Management";
import NewPlayer from "../pages/GMPanel/Management/NewPlayer";

// Player
import PlayerPanel from "../pages/PlayerPanel";

export default function Routes() {
  const { signed } = useAuth();

  useEffect(() => {
    api.defaults.headers.authorization = `Bearer ${localStorage.getItem("ESSENCIA:token")}`;
  }, [signed]);

  // const PrivateRoute = ({ component: Component, ...rest }) => (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       signed ? (
  //         <Component {...props} />
  //       ) : (
  //         <Redirect to={{ pathname: "/", state: { from: props.location } }} />
  //       )
  //     }
  //   />
  // );

  return (
    <BrowserRouter>
      {!signed ? (
        <Switch>
          <Route path="/" exact component={Login} />

          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      ) : (
        <>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard-player-list" exact component={PlayerGames} />
          <Route path="/dashboard-gm-list" exact component={GMGames} />
          <Route path="/dashboard-gm-list-new-game" exact component={NewGame} />

          {/* CharCreation */}
          <CharCreation />

          {/* GM */}
          <Route path="/gm-panel" exact component={GMPanel} />
          <Route path="/gm-management" exact component={Management} />
          <Route path="/gm-new-player" exact component={NewPlayer} />

          {/* Player */}
          <Route path="/player-panel" exact component={PlayerPanel} />

          <Route>
            <Redirect to="/dashboard" />
          </Route>
        </>
      )}
    </BrowserRouter>
  );
}