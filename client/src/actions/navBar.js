import apis from '../api';

// 获取全部分类
export function categoryAction(isAll) {
  return dispatch => {
    dispatch({ type: 'BEGIN_GET_CATEGORY' });
    return fetch(apis.getAllCategory).then(response => response.json()).
      then(json => {
        let cateObj = {};
        if (!isAll) {
          json.data.forEach(item => {
            let id = '_id';
            cateObj[item[id]] = item.name;
          });
        } else {
          cateObj = json.data;
        }
        dispatch({ type: 'GET_CATEGORY', data: cateObj });
      });
  };
}
