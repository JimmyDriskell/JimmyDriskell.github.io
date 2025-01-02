import RequireAuth from './routes/requireAuth';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Home from "./routes/home";
import Login from "./routes/login";
import SignUp from './routes/signup';
import Landing from "./routes/landing";
import Profile from "./routes/profile";
import Survey from "./routes/survey";
import About from "./routes/about";
import AdminHome from './routes/adminHome';
import AdminResults from './routes/adminResults';
import AdminSurvey from './routes/adminSurvey';
import TermsOfUse from './routes/termsOfUse';
import AdminAssign from './routes/adminAssign';
import AdminCreate from './routes/adminCreate';
import AdminPasswordReset from './routes/adminPasswordReset';
import ForgotPassword from './routes/forgotPassword';

const ROLES = {
  'User': 'user',
  'Admin': 'admin'
}

function App() {

  return (
    <AuthProvider>
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/toa" element={<TermsOfUse />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />

      {/* we want to protect these routes */}
      <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/about" element={<About />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/adminResults" element={<AdminResults />} />
          <Route path="/adminSurvey" element={<AdminSurvey />} />
          <Route path="/adminAssign" element={<AdminAssign />} />
          <Route path="/adminCreate" element={<AdminCreate />} />
          <Route path="/adminPasswordReset" element={<AdminPasswordReset />} />

        </Route>
      </Routes>
    </AuthProvider>
   
  );
}

export default App;