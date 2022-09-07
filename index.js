import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
import Downloader from 'nodejs-file-downloader';

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);

const body = await response.text();
const root = parse(body);

const allImages = root.querySelectorAll('img');

// Functions

function reduceSrcToPlainURL(str) {
  str = str.slice(17);
  str = str.replace('"', '');
  return str;
}

function getImageURLs(imagesArrayOfObjects) {
  const urlArray = [];

  // push scr Attribute from input to urlArray
  for (let i = 0; i < 10; i++) {
    urlArray.push(imagesArrayOfObjects[i].rawAttrs);
    urlArray[i] = reduceSrcToPlainURL(urlArray[i]);
  }
  // remove src="" from the array elements, leaving the plain url

  return urlArray;
}

const urls = getImageURLs(allImages);

// request and save the images

for (let i = 0; i < 10; i++) {
  const downloader = new Downloader({
    url: urls[i],
    directory: './memes', // This folder will be created, if it doesn't exist.,
    fileName: `0${i + 1}.jpeg`,
  });
  try {
    const { filePath, downloadStatus } = await downloader.download();

    console.log(`0${i + 1} is done`);
  } catch (error) {
    //console.log('Download failed', error);
  }
}
