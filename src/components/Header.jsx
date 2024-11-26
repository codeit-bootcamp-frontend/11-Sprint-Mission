import React from "react";
import Logo from "../assets/images/logo/logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
	return (
		<header className="globalHeader">
			<div className="leftHeader">
				<Link to="/" className="headerLogo" aria-label="홈이동">
					<img src={Logo} alt="로고"/>
				</Link>
				
				<nav>
					<ul>
						<li>
							<NavLink to="/community" >
								자유게시판
							</NavLink>
						</li>
						<li>
							<NavLink to="/items">
								중고마켓
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
			
			<Link to="/login" className="loginLink btn">
        로그인
      </Link>
		</header>
	)
}

export default Header;