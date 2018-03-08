/**
 * @Author JohnLi
 * @Date 2018/3/7 19:55
 */
import React, { Component } from 'react';
import './AppHeader.css';

interface HeaderProps {
toggleDrawer?: any;
}
class AppHeader extends Component<HeaderProps> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="app-header-wrap">
                    <a className="bars-btn" onClick={(event) => this.props.toggleDrawer(true)}>
                        <i className="fa fa-bars"/>
                    </a>
                    <h2 className="page-title">页面标题</h2>
                </div>
            </React.Fragment>
        );
    }
}

export default AppHeader;