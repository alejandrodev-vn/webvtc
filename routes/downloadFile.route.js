// const graphql = require('./graphql/server')
// const generateZipForPath = require('../lib/generateZipForPath');
const fs = require('fs')
const JSZip = require('jszip')
const express = require('express');
const router = express.Router();

const controllerdistricts = require('../controllers/districts.controller')

router.get("/public/uploads/fileHoSo/:name", async (req, res) => {
  const zip = new JSZip();

  zip.file(
    req.params.name,  
    "I will exist inside of the zip archive, but I'm not a real file here on the server."
  );  
  const directoryPath = '/uploads/fileHoSo'
  const zipDownload = addFilesFromDirectoryToZip(directoryPath, zip);
  const zipAsBase64 = await zipDownload.generateAsync({ type: "base64" });

  res.send(zipAsBase64);
});
//readFile
const addFilesFromDirectoryToZip = (directoryPath = "", zip) => {
  const directoryContents = fs.readdirSync(directoryPath, {
    withFileTypes: true,
  });
 
  directoryContents.forEach(({ name }) => {
    const path = `${directoryPath}/${name}`;

    if (fs.statSync(path).isFile()) {
      zip.file(path, fs.readFileSync(path, "utf-8"));
    }

    if (fs.statSync(path).isDirectory()) {
      addFilesFromDirectoryToZip(path, zip);
    }
  });
};
module.exports = router;