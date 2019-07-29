import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Registration from "./views/Registration";
import Success from "./views/Success";
import PaymentSuccess from "./views/PaymentSuccess";
import Error from "./views/Error";
import Questions from "./views/Questions";
import Payment from './views/Payment';
import { useAuth0 } from "./react-auth0-spa";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import TotalRegistrations from "./views/TotalRegistrations";
initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-3">
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/registration" exact component={Registration} />
            <PrivateRoute path="/success" exact component={Success} />
            <PrivateRoute path="/paymentsuccess" exact component={PaymentSuccess} />
            <PrivateRoute path="/error" exact component={Error} />
            <PrivateRoute path="/questions" exact component={Questions}/>
            <PrivateRoute path="/payment" exact component={Payment}/>
            <PrivateRoute path="/totalregistrations" exact component={TotalRegistrations} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
