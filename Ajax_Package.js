function ajax(options) {
  // 默认值
  var defaults = {
    type: 'get',
    url: '',
    async: true,
    data: {},
    requestHeader: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success: function() {},
    error: function() {},
  };

  //对象覆盖
  Object.assign(defaults, options);
  
  var xhr = new XMLHttpRequest();
  //拼接参数字符串
  var params = '';
  for(var attr in defaults.date) {
    params += attr + '=' + defaults.date[attr] + '&';
  }
  params = params.substr(0, params.length - 1);

  // 当 GET类型请求时
  if(defaults.type == 'get') {
    var getUrl = defaults.url + '?' + params;
    xhr.open(defaults.type, getUrl, defaults.async);
  }else{
    xhr.open(defaults.type, defaults.url, defaults.async);
  }

  //当Post类型请求时
  if(defaults.type == 'post'){
    var requestHeader= defaults.requestHeader['Content-Type'];
    xhr.setRequestHeader('Content-Type', requestHeader);

    //判断发送至服务器信息的编码格式
    if(requestHeader == 'application/json'){
      xhr.send(JSON.stringify(defaults.date));
    }else{
      xhr.send(params);
    }
  }else{
    xhr.send();
  }

  //服务器响应
  xhr.onload = function() {
    //将服务器响应回来的string转换为JSON对象
    var resContenType = xhr.getResponseHeader('Content-Type');
    var resText = xhr.responseText;
    if(resContenType.includes('application/json')){
      resText = JSON.parse(resText);
    }

    if(xhr.status == 200 ){
      defaults.success(resText, xhr);
    }else{
      defaults.error(resText, xhr);
    }
  }
}

//调用function ajax()方法
ajax({
  type: 'post',
  url: 'http://localhost:800/package',
  // async: true,
  // requestHeader: {
  //   'Content-Type': 'application/json',
  // },
  date: {
    type: 'POST',
    name: 'XiaoMing',
    age: 18,
    sex: 'Man'
  },
  success: function(date) {
    // console.log(date);
  },
  error: function(date, xhr) {}
});