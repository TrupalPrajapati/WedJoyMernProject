import React from "react";
import { SignUp } from "./Components/Common/SignUp";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Components/Common/Login";
import AddEvent from "./Components/AddEvent";
import Navbar from "./Components/Navbar";
import SelectRole from "./Components/SelectRole";
import {SignupUser} from "./Components/Common/SignupUser";
import {SignupEventOrg} from "./Components/Common/SignupEventOrg";
import {SignupBussinessOwner} from "./Components/Common/SignupBussinessOwner"
import {LoginEventOrg} from "./Components/Common/LoginEventOrg";
import {LoginBusinessOwner} from "./Components/Common/LoginBusinessOwner";
import { LoginUser } from "./Components/Common/LoginUser";
import axios from "axios";
import { Bounce, ToastContainer } from "react-toastify";
import { UserRolePage } from "./Components/UserRolePage";
import { BusinessOwnerPage } from "./Components/BusinessOwnerPage";
import {EventOrgRolePage} from "./Components/EventOrgRolePage";
import PrivateRoutes from "./Components/privatehooks/PrivateRoutes";
import { ViewEvents } from "./Components/ViewEvents";
import { ViewEventAsCommunityMember } from "./Components/ViewEventAsCommunityMember";
import { ViewRegisteredEvents } from "./Components/ViewRegisteredEvents";
import { ViewBusiness } from "./Components/ViewBusiness";
import { ResetPassword } from "./Components/Common/ResetPassword";
import { ViewAllBusiness } from "./Components/ViewAllBusiness";
import { ViewBusinessDetails } from "./Components/ViewBusinessDetails";
import ReviewForm from "./Components/ReviewForm";
import { ForgotPswd } from "./Components/Common/ForgotPswd";
import  EventDetails  from "./Components/EventDetails";
import { PostFeed } from "./Components/PostFeed";
import { CreateNewsPost } from "./Components/CreateNewsPost";
import { Footer } from "./Components/Common/Footer";
import Hero from "./Components/Hero";
import "../src/App.css"
import {ContactUs} from "./Components/ContactUs";
import EditBusiness from "./Components/EditBusiness";
 

export const App = () => {

  axios.defaults.baseURL = "http://localhost:3001"

  return (
    <div className="app-container">
        <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
                <Navbar />
    
    <div className="main-container">
      <div className="content">
      <Routes>
      <Route path="/" element={<Hero />} />
        <Route path="/selectrole" element={<SelectRole></SelectRole>}></Route>
        {/* <Route path="/signup" element={<SignUp></SignUp>}></Route> */}
        <Route path="/signup/eventorganizer" element={<SignupEventOrg />} />
        <Route path="/signup/businessowner" element={<SignupBussinessOwner />} />
        <Route path="/signup/user" element={<SignupUser />} />
        <Route path="/login/eventorganizer" element={<LoginEventOrg />} />
        <Route path="/login/businessowner" element={<LoginBusinessOwner />} />
        <Route path="/login/user" element={<LoginUser />} />
        <Route path="" element={<PrivateRoutes></PrivateRoutes>}>
            <Route path="/addevent" element={<AddEvent></AddEvent>}></Route>
            <Route path="/viewevent" element={<ViewEvents></ViewEvents>}></Route>
        </Route>
        
        <Route path="/viewbusiness" element={<ViewBusiness></ViewBusiness>}></Route>
        <Route path="/viewallbusiness" element={<ViewAllBusiness></ViewAllBusiness>}></Route>
        <Route path="/reviewform/:eventId" element={<ReviewForm></ReviewForm>}></Route>
        <Route path="/viewbusinessdetails/:id" element={<ViewBusinessDetails></ViewBusinessDetails>}></Route>
        <Route path="/userrolepage" element={<UserRolePage></UserRolePage>}></Route>
        <Route path="/vieweventascommunitymember" element={<ViewEventAsCommunityMember></ViewEventAsCommunityMember>}></Route>
        <Route path="/eventorgrolepage" element={<EventOrgRolePage></EventOrgRolePage>}></Route>
        <Route path="/userregisteredevents" element={<ViewRegisteredEvents></ViewRegisteredEvents>}></Route>
        <Route path="/busineessownerrolepage" element={<BusinessOwnerPage></BusinessOwnerPage>}></Route>
        <Route path="/resetpassword/:token" element={<ResetPassword></ResetPassword>}></Route>
        <Route path="/forgotpassword" element={<ForgotPswd></ForgotPswd>}></Route>
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/newspostfeed" element={<PostFeed />} />
        <Route path="/create-news-post" element={<CreateNewsPost />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/editbusiness/:id" element={<EditBusiness />} />
      </Routes>
    
      
      </div>
      
    </div>
    {/* <Footer></Footer> */}
    </div>
    
  );
};
