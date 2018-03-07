/**
 * @Author JohnLi
 * @Date 2018/2/24 10:38
 */
import React, { Component } from 'react';

import { Button } from 'antd-mobile';

import fetchService from '../../core/services/fetch.service';

class Axios extends Component {
  constructor(props) {
    super(props);
  }

  getData() {
    fetchService.get('http://www.baidu.com', {name: 'djlxs'}).subscribe();
  }

  postData() {
    fetchService.post('login', {name: 'djlxs'}).subscribe();
  }

  render() {
    return (
      <React.Fragment>
        <Button onClick={() => { this.getData(); }}>Get请求</Button>
        <Button onClick={() => {this.postData(); }}>Post请求</Button>
      </React.Fragment>
    );
  }
}

export default Axios;