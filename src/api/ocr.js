const { createWorker } = require("tesseract.js");

async function getOCR(imagePath) {
  try {
    const worker = await createWorker("por");
    const ret = await worker.recognize(imagePath);
    await worker.terminate();

    return ret.data.text.replace(/(\r\n|\n|\r)/gm, "").trim();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getOCR,
};
