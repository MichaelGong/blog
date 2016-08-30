import category from './category';
import info from './info';
import tags from './tags';
import article from './article';
const BASEURL = 'http://localhost:8989';
const apis = {
  ...category,
  ...info,
  ...tags,
  ...article
};
Object.keys(apis).forEach((item) => {
  apis[item] = BASEURL + apis[item];
});
export default apis;
