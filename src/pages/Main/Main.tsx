/**
 * @Author JohnLi
 * @Date 2018/2/7 16:13
 */
import React, { Component } from 'react';

import AppMenu from './menu/AppMenu';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Flex } from 'antd-mobile';
import { routing } from '../../routing/routing';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Flex>
            <Flex.Item style={{flex: '0 0 100px'}}>
              <AppMenu/>
            </Flex.Item>
            <Flex.Item>
              <Switch>
                {routing.map(route => {
                  return route.redirect ? <Redirect path={route.path} to={route.to} key={route.path}/> :
                    <Route path={route.path} component={route.component} key={route.path}/>;
                })}
              </Switch>
            </Flex.Item>
          </Flex>
        </Router>
      </React.Fragment>
    );
  }
}

export default Main;