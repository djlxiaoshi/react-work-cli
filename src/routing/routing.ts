/**
 * @Author JohnLi
 * @Date 2018/2/8 18:13
 */
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Axios from '../pages/Axios/Axios';
import Charts from '../pages/Charts/Charts';

interface Route {
  path: string;
  component?: Object;
  name?: string;
  icon?: string;
  redirect?: boolean;
  to?: string;
}
export const routing: Route[] = [
  {path: '/home', name: '主页', component: Home, icon: 'fa-home'},
  {path: '/about', name: '关于我', component: About, icon: 'fa-user'},
  {path: '/contact' , name: '联系方式', component: Contact, icon: 'fa-phone'},
  {path: '/chart' , name: '图', component: Charts, icon: 'fa-chart-pie'},
  {path: '/axios' , name: '请求', component: Axios},
  {path: '/', redirect: true, to: 'home'}
];
