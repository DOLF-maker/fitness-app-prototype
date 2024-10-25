import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import BookingForm from './Pages/BookingForm';
import MyAppointment from './Pages/MyAppointment';
import Login from './Pages/LoginForm';
import HomePage from './Pages/HomePage';
import LayoutPage from './Pages/LayoutPage';
import { AuthProvider } from './components/AuthProvider';
import Profile from './Pages/Profile';

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutPage />}>
          <Route path="home" element={<HomePage />} />
          <Route path="booking" element={<BookingForm />} />
          <Route path="myappointment" element={<MyAppointment />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
