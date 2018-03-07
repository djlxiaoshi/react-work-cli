const iziToast = require('izitoast');

class IziToastService {

  info(title: string, message: string = ''): void {
    iziToast.info({
      position: 'topRight',
      title: title,
      message: message || '',
    });
  }

  error(title: string, message: string = ''): void {
    iziToast.error({
      position: 'topRight',
      title: title,
      message: message || '',
    });
  }

  success(title: string, message: string = ''): void {
    iziToast.success({
      position: 'topRight',
      title: title,
      message: message || ''
    });
  }

  warning(title: string, message: string = ''): void {
    iziToast.warning({
      position: 'topRight',
      title: title,
      message: message
    });
  }
}

export default new IziToastService();
