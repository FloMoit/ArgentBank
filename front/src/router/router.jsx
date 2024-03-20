import { Routes, Route, BrowserRouter } from "react-router-dom";

import Header from "../layout/header/header";
import Footer from "../layout/footer/footer";

import Home from "../pages/home/home.tsx";
import SignIn from "../pages/signIn/signIn.tsx";
import User from "../pages/user/user.tsx";

import { Provider } from "react-redux";
import store from "../redux/store/store";

function Router() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="User" element={<User />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}
export default Router;
