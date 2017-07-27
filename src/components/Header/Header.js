import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import { logout } from '../../helpers/auth'

class Header extends Component {

    constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
   toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
        <a className="navbar-brand" href="#"></a>
        <ul className="nav navbar-nav d-md-down-none mr-auto">
          <li className="nav-item">
            <button className="nav-link navbar-toggler sidebar-toggler" type="button" onClick={this.sidebarToggle}>&#9776;</button>
          </li>
          <li className="nav-item px-1">
            <a className="nav-link" href="#">Dashboard</a>
          </li>
          <li className="nav-item px-1">
            <a className="nav-link" href="#">Users</a>
          </li>
          <li className="nav-item px-1">
            <a className="nav-link" href="#">Settings</a>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item hidden-md-down">
            <a className="nav-link" href="#">
              <i className="icon-bell"></i>
              <span className="badge badge-pill badge-danger">5</span>
            </a>
          </li>
          <li className="nav-item hidden-md-down">
            <a className="nav-link" href="#">
              <i className="icon-list"></i>
            </a>
          </li>
          <li className="nav-item hidden-md-down">
            <a className="nav-link" href="#">
              <i className="icon-location-pin"></i>
            </a>
          </li>
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <button onClick={this.toggle} className="nav-link dropdown-toggle" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                <img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span className="d-md-down-none">admin</span>
              </button>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem header className="text-center"><strong>Settings</strong></DropdownItem>
                <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
                <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem> <a className="nav-link"  onClick={() => {
                logout()
                }} href="/"><i className="fa fa-lock"></i> Logut</a></DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </li>
          
          <li className="nav-item hidden-md-down">
            <a className="nav-link navbar-toggler aside-menu-toggler" href="#">☰</a>
          </li>
        </ul>
      </header>
    )
  }
}

export default Header;


/*
<li className="nav-item">
            <div className="dropdown">
              <a className="nav-link dropdown-toggle nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <img src="img/avatars/6.jpg" className="img-avatar" alt="admin@bootstrapmaster.com" />
                <span className="hidden-md-down">admin</span>
              </a>
              <div tabIndex="-1" aria-hidden="true" role="menu" className="dropdown-menu-right dropdown-menu">
                <h6 tabIndex="-1" className="text-center dropdown-header">
                  <strong>Account</strong>
                </h6>
                <button tabIndex="0" className="dropdown-item">
                  <i className="fa fa-bell-o"></i>
                  <span className="badge badge-info">42</span>
                </button>
                <button tabIndex="0" className="dropdown-item">
                  <i className="fa fa-envelope-o"></i>
                  <span className="badge badge-success">42</span>
                </button>
                <button tabIndex="0" className="dropdown-item">
                  <i className="fa fa-tasks"></i>
                  <span className="badge badge-danger">42</span>
                </button>
                <button tabIndex="0" className="dropdown-item">
                  <i className="fa fa-comments"></i>
                  <span className="badge badge-warning">42</span>
                </button>
                <h6 tabIndex="-1" className="text-center dropdown-header">
                  <strong>Settings</strong>
                </h6>
                <button tabIndex="0" className="dropdown-item">
                  <i className="fa fa-user"></i>
                </button>
                <button tabIndex="0" className="dropdown-item">
                  <i className="fa fa-wrench"></i>
                </button>
                <button tabIndex="0" className="dropdown-item">
                  <i className="fa fa-usd"></i>
                  <span className="badge badge-default">42</span>
                </button>
                <button tabIndex="0" className="dropdown-item">
                  <i className="fa fa-file"></i>
                  <span className="badge badge-primary">42</span>
                </button>
                <div tabIndex="-1" className="dropdown-divider"></div>
                <button tabIndex="0" className="dropdown-item">
                  <i className="fa fa-shield"></i>
                </button>
                <button tabIndex="0" className="dropdown-item"><i className="fa fa-lock"></i>
                </button>
              </div>
            </div>
          </li>
          */