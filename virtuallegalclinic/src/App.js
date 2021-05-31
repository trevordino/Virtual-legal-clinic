import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import PrivateRoute from "./routes/PrivateRoute";

import Dashboard from "./components/dashboard/dashboard";
import Home from "./components/home/home";
import Header from "./components/common/header";
import Onboarding from "./components/onboarding/onboarding";
import ProcessLogin from "./components/authorisation/processlogin";
import ProcessMyinfo from "./components/authorisation/processmyinfo";
import Scheduler from "./components/scheduler/scheduler";
import Confirmation from "./components/confirmation/confirmation";
import Test from "./components/test/test";
import OnboardingLawyer from "./components/onboarding/onboardingLawyer";
import Triage from "./components/triage/triage";
import Facts from "./components/facts/facts";
import VideoChat from "./components/twilio/VideoChat"

function App(props) {
  return (
    <AuthProvider>
      <Header />
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/test" component={Test} />
        <Route path="/processlogin" component={ProcessLogin} />
        <Route path="/processmyinfo" component={ProcessMyinfo} />
        <PrivateRoute path="/onboarding" component={Onboarding} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/scheduler" component={Scheduler} />
        <PrivateRoute path="/confirmation" component={Confirmation} />
        <PrivateRoute path="/triage" component={Triage} />
        <PrivateRoute path="/facts" component={Facts} />
        <Route path="/meeting" component={VideoChat} />
        <Route path="/onboardingLawyer" component={OnboardingLawyer} />
        
      </Router>
    </AuthProvider>
  );
}

export default App;
