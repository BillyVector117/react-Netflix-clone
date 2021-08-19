import "./sidebar.css";
import {
  // Timeline,
  // TrendingUp,
  // Storefront,
  // AttachMoney,
  // BarChart,
  // DynamicFeed,
  // ChatBubbleOutline,
  // WorkOutline,
  // Report,
  LineStyle,
  PermIdentity,
  MailOutline,
  PlayCircleOutline,
  ExitToApp,
  List
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { logOut } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";

export default function Sidebar() {
  const { dispatch } = useContext(AuthContext);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            {/*           <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li className="sidebarListItem">
                <PlayCircleOutline className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/lists" className="link">
              <li className="sidebarListItem">
                <List className="sidebarIcon" />
                Lists
              </li>
            </Link>
            {/* <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Reports
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
          <Link to="/email" className="link">
              <li className="sidebarListItem">
                <MailOutline className="sidebarIcon" />
                Mail / Feedback
              </li>
            </Link>
            {/*    <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            {/*  <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li> */}
            <li className="sidebarListItem" onClick={() => logOut(dispatch)}>
              <ExitToApp className="sidebarIcon" />
              Logout
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
