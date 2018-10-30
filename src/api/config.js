export default process.env.NODE_ENV === 'development' ? {
  // 开发环境
  // pcHost: 'http://people.management.test.ums86.com/api/pc',
  // domain: "http://60.255.48.150:304",
  domain: '',
} : {
  // 发布环境
  domain: 'http://60.255.48.150:304',
};
