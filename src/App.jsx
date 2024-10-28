import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import BookingForm from "./Pages/BookingForm";
import MyAppointment from "./Pages/MyAppointment";
import Login from "./Pages/LoginForm";
import HomePage from "./Pages/HomePage";
import LayoutPage from "./Pages/LayoutPage";
import { AuthProvider } from "./components/AuthProvider";
import Profile from "./Pages/Profile";
import RequireAuth from "./contexts/RequireAuth";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutPage />}>
            {/* Wrap protected routes with RequireAuth */}
            <Route
              path="home"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
            <Route
              path="booking"
              element={
                <RequireAuth>
                  <BookingForm />
                </RequireAuth>
              }
            />
            <Route
              path="myappointment"
              element={
                <RequireAuth>
                  <MyAppointment />
                </RequireAuth>
              }
            />
            <Route
              path="profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
