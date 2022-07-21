const path = require('path');
const fs = require('fs-extra');

module.exports = {
  image: async (file) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
      const newFilename = `${Date.now()}_${file.originalFilename}`;
      const uploadPath = path.resolve('./uploads') + `/image/${newFilename}`;
      fs.moveSync(file.filepath, uploadPath);
      return { status: true, data: newFilename };
    } else {
      return { status: false, data: 'รองรับไฟล์ .JPG .JPEG .PNG' };
    }
  },
  document: async (file) => {
    if (file.mimetype == 'application/pdf') {
      const newFilename = `${Date.now()}_${file.originalFilename}`;
      const uploadPath = path.resolve('./uploads') + `/document/${newFilename}`;
      fs.moveSync(file.filepath, uploadPath);
      return { status: true, data: newFilename };
    } 
    return { status: false, data: 'รองรับไฟล์ .PDF'};
  },
};
