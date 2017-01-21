export default function () {
  function WebViewBridgeReady(cb) {
    if (window.WebViewBridge) {
      cb(window.WebViewBridge);
      return;
    }
    function handler() {
      document.removeEventListener('WebViewBridge', handler, false);
      cb(window.WebViewBridge);
    }

    document.addEventListener('WebViewBridge', handler, false);
  }

  WebViewBridgeReady(function (WebViewBridge) {
    WebViewBridge.onMessage = function (message) {
      const include = (str)=>message.indexOf(str) > -1;
      const getParam = (str, index = 1)=>str.split('|')[index];
      const getJsonParam = (str)=>JSON.parse(getParam(str));
      if (include('initEditor')) {

      }
    };
  });
}