import React from "react"

class Header extends React.Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper purple darken-3 px1">
                    <a href="/" className="brand-logo">Список дел</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="/">Список дел</a></li>
                        <li><a href="/">Информация</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header