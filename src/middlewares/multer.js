import multer from "multer";

// Fayl formatini va hajmini tekshirish uchun multer konfiguratsiyasi
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Fayl nomi
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Faqat .jpg yoki .png formatidagi fayllar ruxsat etiladi'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});


export default upload