const Router = require('express');
const multer  = require('multer')
const path   = require('path')
const fs = require('fs');
const TicketService = require('../services/TicketService');
const FileService = require('../services/FileService');
const router = Router();

// Функция проверки расширения файла
function fileFilter(req, file, cb) {
  if (path.extname(file.originalname).toLowerCase() === '.bmp') {
    // Принимаем файлы с расширением bmp
    cb(null, true);
  } else {
    // Отклоняем файлы с другими расширениями
    cb(new Error('Только файлы с расширением .bmp разрешены'));
  }
}

// Настройка хранилища для multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer(
    { 
      storage: storage,
      fileFilter: fileFilter,
      limits: { 
        fileSize: 200000, // 200 кб (в байтах)
      }
    }
  )

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('./file/index', { title: 'Форма бронирования отеля с файлом' });
});

router.post('/submit', upload.single('bmp_file'), (req, res, next) => {
  const alerts = {success: [], danger: []};
  try {
    let filedata = req.file;
    if (!filedata) {
      alerts.danger.push("Файл не был загружен");
    } else {
      alerts.success.push("Файл успешно загружен");
    }
  } catch (err) {
    // Обработка ошибки
    alerts.danger.push("Ошибка при загрузке файла: " + err.message);
  }
  
  res.render('./file/index', { 
    title: 'Форма бронирования отеля с файлом (результат)', 
    alert_success: alerts.success, 
    alert_danger: alerts.danger, 
  });
});

router.get('/txt', (req, res, next) => {
  res.render('./file/txt', { title: 'Форма бронирования отеля с текстом файлом' });
});

router.post('/txt/submit', upload.none(), (req, res, next) => {
  const result = TicketService.proccessRequest(req);
  console.log(result);
  if (!result) {
    res.redirect('back');
  }
  // Преобразование данных в формат JSON
  const jsonData = JSON.stringify(result);
  const filePath = path.join('uploads', 'formDataResult', 'formData.json');

  // Сохранение данных в файл
  fs.writeFile(filePath, jsonData, 'utf8', (err) => {
    if (err) {
      // Обработка ошибки сохранения файла
      res.status(500).send('Ошибка сохранения файла');
    } else {
      res.redirect('/files/txt/file/info');
    }
  });
});

router.get('/txt/file/info', (req, res, next) => {
  const alerts = {success: [], danger: []};
  const filePath = path.join('uploads', 'formDataResult', 'formData.json');
  const fileStats = FileService.getFileStats(filePath);
  let formattedLastAccessTime = '';
  if (fileStats) {
    const lastAccessTime = fileStats.atime; // Время последнего доступа к файлу
    formattedLastAccessTime = new Date(lastAccessTime).toLocaleString(); //
  }
  else {
    alerts.danger.push("Файл не был загружен");
  }

  res.render('./file/txtResult', { 
    title: 'Информация о файле', 
    alert_success: alerts.success, 
    alert_danger: alerts.danger, 
    lastAccessTime: formattedLastAccessTime, 
  });
});

router.post('/txt/file/info/download', (req, res, next) => {
  const filePath = path.join('uploads', 'formDataResult', 'formData.json');
  // Отправка файла пользователю для скачивания
  res.download(filePath, 'formData.json', (err) => {
    if (err) {
      // Обработка ошибки скачивания файла
      console.log('Ошибка скачивания файла');
    } else {
      // Вывод сообщения после завершения скачивания
      console.log('Файл успешно скачан');
    }
  });
});

router.get('/image/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const filePath = path.join('uploads', imageName);

  fs.realpath(filePath, (err, path) => {
    if (err) {
      return res.status(404).send('');
    }
    res.sendFile(path);
  })
});

module.exports = router;

