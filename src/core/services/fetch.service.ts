/**
 * @Author JohnLi
 * @Date 2018/2/23 18:32
 */
import axios from 'axios';
import { Observable } from 'rxjs';
import iziToastService from './izi-toast.service';

const NProgress = require('nprogress');

const CancelToken = axios.CancelToken;

import { environment }  from '../../environments/environment';

class FetchService {
  private apiUrl = environment.apiUrl;
  get (url, params, hasWarning?) {
    let cancel;
    return Observable.create(observer => {
      NProgress.start();
      const apiURL = this.getFullUrl(url);
      axios.get(apiURL, {
        params: params,
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        })
      }).then(res => {
        NProgress.done();
        if (res.data.error_code === 0) {
          observer.next(res.data);
        } else {
          if (hasWarning) {
            iziToastService.error('Error', `${res.data.message}`);
          }
          observer.error(res.data);
        }
        observer.complete();
      }).catch(error => {
        NProgress.done();
        if (hasWarning) {
          iziToastService.error('Error', `${error.message}`);
        }
        observer.error(error);
        observer.complete();
      });

      return function unsubscribe() {
        cancel();
      };
    });
  }

  post(url, params, hasWarning?) {
    let cancel;
    return Observable.create(observer => {
      const apiURL = this.getFullUrl(url);
      axios.post(apiURL, params, {
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
        cancelToken: new CancelToken(function executor(c) {
          cancel = c;
        })
      }).then(res => {
        NProgress.done();

        if (res.data.error_code === 0) {
          observer.next(res.data);
        } else {
          if (hasWarning) {
            iziToastService.error('Error', `${res.data.message}`);
          }
          observer.error(res.data);
        }
        observer.complete();
      }).catch(error => {
        NProgress.done();

        if (hasWarning) {
          iziToastService.error('Error', `${error.message}`);
        }
        observer.error(error);
        observer.complete();
      });

      return function unsubscribe() {
        cancel();
      };
    });
  }

  private getFullUrl(url) {
    return /^(http:\/\/|https:\/\/|:?\/\/)/.test(url) ? url : this.apiUrl + url;
  }
}

export default new FetchService();