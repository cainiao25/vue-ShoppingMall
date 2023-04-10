
// 接收file文件  转化 为base64
export function fileToBase64Async(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      console.log(reader);
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        console.log("转化成功",e.target.result);
        resolve(e.target.result);
      };
      reader.onerror = (e) => {
        console.log("转化成功",e);
        reject("图片转化失败");
      };
    });
  }