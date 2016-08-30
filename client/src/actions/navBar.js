import apis from '../api';

// 获取全部分类
export function category() {
  return dispatch => {
    dispatch({ type: 'BEGIN_GET_CATEGORY' });
    return fetch(apis.getAllCategory).then(response => response.json()).
      then(json => {
        let cateObj = {};
        json.data.forEach(item => {
          let id = '_id';
          cateObj[item[id]] = item.name;
        });
        dispatch({ type: 'GET_CATEGORY', data: cateObj });
      });
  };
}
