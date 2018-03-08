/**
 * @Author JohnLi
 * @Date 2018/2/7 17:06
 */
import React, { Component } from 'react';
import { List } from 'antd-mobile';

import { Link } from 'react-router-dom';

import { routing } from '../../../routing/routing';

import './AppSidebar.css';

class AppSidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
            <List className="app-sidebar">
              {
                routing.map(route => {
                  return (<List.Item key={route.path}>
                    <Link to={route.path}>
                        <span className="icon-wrap">
                            {route.icon ? <i className={`fa ${route.icon}`}/> : null}
                        </span>
                        {route.name}
                    </Link>
                  </List.Item>);
                })
              }
            </List>
      </React.Fragment>
    );
  }
}

export default AppSidebar;