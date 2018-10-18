import instance from '../../../utils/axios';

export function fetch() {
  return instance.get('/api/templates');
}
