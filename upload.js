// 参考官网配置1. 上传文件所在目录 2. 更改文件名
const storage = multer.diskStorage({
  //磁盘存储引擎方法
  destination: (req, file, cb) => {
    //储存前端传来的文件
    cb(null, "upload/images");
  },
  filename: (req, file, cb) => {
    //更改文件名
    let fileFormat = file.originalname.split(".");
    let imgName = `${Date.now()}-${Math.floor(
      Math.random(0, 1) * 10000
    )}${"."}${fileFormat[fileFormat.length - 1]}`;
    cb(null, imgName);
  },
});

const upload = multer({ storage: storage });

module.exports = { upload };
