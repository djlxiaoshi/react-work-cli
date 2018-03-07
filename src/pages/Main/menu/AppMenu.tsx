/**
 * @Author JohnLi
 * @Date 2018/2/7 17:06
 */
import React, { Component } from 'react';
import { List } from 'antd-mobile';

import { Link } from 'react-router-dom';

import { routing } from '../../../routing/routing';

class AppMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <List>
          {
            routing.map(route => {
              return (<List.Item key={route.path}>
                <Link to={route.path}>{route.name}</Link>
              </List.Item>);
            })
          }
        </List>
      </React.Fragment>
    );
  }
}

export default AppMenu;