import api from '../library/axios/api';

// 根据你的接口封装以下服务
let IndexService = {
  
  articleAdd: (data) => {
    return api.post('/api/article/add', data);
  },
  getArticleList: (data) => {
    return api.get('/api/article/find?pageSize='+data.pageSize+'&pageNo='+data.pageNo)
  },
  delArticle: (id) => {
    return api.get('/api/article/del?id='+ id)
  },
  findArticleById: (id) => {
    return api.get('/api/article/findById?id='+ id)
  },
  updateArticle: (data) => {
    return api.post('/api/article/update', data);
  },

  //登录
  login: (data) => {
    return api.post('/api/admin/login', data);
  },
  //登出
  logout: () => {
    return api.get('/api/admin/logout');
  }
};

module.exports = IndexService;
