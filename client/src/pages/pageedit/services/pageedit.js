import instance from '../../../utils/axios';

export function fetch(values) {
  return Promise.all([instance.get(`/api/pages/detail`, {params: values} ), instance.get('/api/templates')]);
}
export function submit(values) {
  return instance.post('/api/pages/saveDetail', values);
}
export function fetchComponents() {
  return instance.get('/api/templates');
}
