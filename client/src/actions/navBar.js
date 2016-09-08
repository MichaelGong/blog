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

// 更新category
export function categoryUpdateAction(id, name, desc) {
  console.log(id, name, desc);
  return dispatch => {
    dispatch({ type: 'BEGIN_UPDATE_CATEGORY' });
    return fetch(apis.updateCategory, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        name: name,
        desc: desc
      })
    }).
    then(response => response.json()).
    then(json => {
      dispatch({ type: 'UPDATE_CATEGORY', data: json });
    }).
    catch(json => {
      dispatch({ type: 'UPDATE_CATEGORY', data: json });
    });
  };
}

export function emptyCategoryUpdate() {
  return dispatch => dispatch({ type: 'UPDATE_CATEGORY', data: null });
}
// 添加分类
export function addCategoryAction(name, desc) {
  return dispatch => {
    dispatch({ type: 'BEGIN_ADD_CATEGORY' });
    return fetch(apis.addCategory, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        desc: desc
      })
    }).
    then(response => response.json()).
    then(json => {
      dispatch({ type: 'ADD_CATEGORY', data: json });
    }).
    catch(json => {
      dispatch({ type: 'ADD_CATEGORY', data: json });
    });
  };
}


