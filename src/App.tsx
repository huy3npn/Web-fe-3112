import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Messenger from "./pages/Messenger";
import UserAuth from "./utils/UserAuth";
import RequireAuth from "./utils/RequireAuth";
import VideoCall from "./components/VideoCall";
import ReceiveCall from "./components/ReceiveCall"
import Userlist from "./components/Userlist"
import Profile from "./components/Profile"
import ChangeImg from "./pages/ChangeImg";
// import { AnswerCall } from "./call";
import ChangeInfor from "./pages/ChangeInfor";
import ForgetPass from "./pages/ForgetPass";
import ChangePass from "./pages/ChangePass";


const App: React.FC = () => {
  return (
    <UserAuth>
      <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Messenger />
              </RequireAuth>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/videocall/:callusername" element={<VideoCall />} />
          <Route path="/answercall/:answerusername" element={<ReceiveCall />} />
          <Route path="/users/" element={<Userlist />}/>
          {/* <Route path="/answercall/:answeruserid" element={<AnswerCall />} /> */}
          <Route path="/profile/:username" element={<Profile />}/>
          <Route path="/changeimg" element={<ChangeImg />}/>
          <Route path="/changeinfor" element={<ChangeInfor />}/>
          <Route path="/api/password_reset/:token" element={<ForgetPass />}/>
          <Route path="/changepass" element={<ChangePass />}/>
          
      </Routes>
    </UserAuth>
  );
};

export default App;
