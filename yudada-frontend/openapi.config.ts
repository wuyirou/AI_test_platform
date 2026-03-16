const { generateService } = require("@umijs/openapi");

generateService({
  requestLibPath: "import request from '@/request'", //自定义请求路径
  schemaPath: "http://localhost:8101/api/v2/api-docs", //后端接口号
  serversPath: "./src",
});
