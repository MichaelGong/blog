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
export function categoryUpdateAction(data) {
  console.log(data);
  return dispatch => {
    dispatch({ type: 'BEGIN_UPDATE_CATEGORY' });
    return fetch(apis.updateCategory, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
// 清空 UPDATE_CATEGORY
export function emptyCategoryUpdateAction() {
  return dispatch => dispatch({ type: 'UPDATE_CATEGORY', data: null });
}
// 添加分类
export function addCategoryAction(data) {
  return dispatch => {
    dispatch({ type: 'BEGIN_ADD_CATEGORY' });
    return fetch(apis.addCategory, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
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
// 清空
export function emptyAddCategoryAction() {
  return dispatch => dispatch({ type: 'ADD_CATEGORY', data: null });
}

// 删除分类
export function deleteCategoryAction(id) {
  return dispatch => {
    dispatch({ type: 'BEGIN_DELETE_CATEGORY' });
    return fetch(apis.deleteCategory, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    }).
    then(response => response.json()).
    then(json => {
      dispatch({ type: 'DELETE_CATEGORY', data: json });
    }).
    catch(json => {
      dispatch({ type: 'DELETE_CATEGORY', data: json });
    });
  };
}
// 清空
export function emptyDeleteCategoryAction() {
  return dispatch => dispatch({ type: 'DELETE_CATEGORY', data: null });
}

