import React from "react";
import SideBar from "react-fixed-sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineHome, AiFillFileAdd } from "react-icons/ai";
import { BsKey } from "react-icons/bs";
import { RiStickyNoteLine } from "react-icons/ri";
import { MdOutlineHighlight } from "react-icons/md";
import { BiSort } from "react-icons/bi";

export default class Fixedsidebar extends React.Component {
  toggleSideBar = () => {
    // use our 'ref' to the sidebar component
    // to open it
    this.sidebar.toggle();
  };
  switchGroup = () => {
    //toggle the sidebar if isgrouped is false
    this.toggleSideBar();
    this.props.setG(!this.props.isgrouped);
  };

  handleHomeClick = () => {
    this.toggleSideBar();
    this.props.setG(false);
  };

  sortNotes = () => {
    this.toggleSideBar();
  };

  showsAddNotes = () => {
    this.toggleSideBar();
    this.props.setShowingAddNote(true);
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleSideBar} className="sidebar-menu">
          <GiHamburgerMenu />
        </button>
        <SideBar
          className="sidebar"
          ref={(sidebar) => {
            this.sidebar = sidebar;
          }}
        >
          <div
            style={{ cursor: "pointer" }}
            className="d-flex align-items-center logo"
          >
            <RiStickyNoteLine
              style={{ color: "#edebed" }}
              className="user-icon logo"
            />
            <h2 style={{ fontSize: "25px" }}>StickyNotes</h2>
          </div>
          <hr className="mb-3" />

          <div
            onClick={this.handleHomeClick}
            className=" d-flex align-items-center mb-2 sidebar-icons"
          >
            <AiOutlineHome className="user-icon" />
            <small>Home</small>
          </div>
          <div className=" d-flex align-items-center mb-2 sidebar-icons">
            <FaRegUserCircle className="user-icon" />
            <small>Profile</small>
          </div>
          <div className=" d-flex align-items-center mb-2 sidebar-icons">
            <BsKey className="user-icon" />
            <small>Log in/ Sign up</small>
          </div>

          <div
            onClick={this.switchGroup}
            className=" d-flex align-items-center mb-2 sidebar-icons"
          >
            <MdOutlineHighlight className="user-icon" />
            {!this.props.isgrouped ? (
              <small>Group Highlights</small>
            ) : (
              <small> Ungroup Highlights</small>
            )}
          </div>

          <div
            onClick={this.sortNotes}
            className=" d-flex align-items-center mb-2 sidebar-icons"
          >
            <BiSort className="user-icon" />
            <small>Sort</small>
          </div>

          <div
            onClick={this.showsAddNotes}
            className="d-flex align-items-center sidebar-icons"
          >
            <AiFillFileAdd className="user-icon" />
            <small>Add Note</small>
          </div>
        </SideBar>
      </div>
    );
  }
}
