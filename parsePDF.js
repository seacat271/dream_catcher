const PdfExtractor = require("pdf-extractor").PdfExtractor;
const fs = require("fs");
const path = require("path");
// const parseFunction = require("./parseFunction");
function parsePDF() {
  fs.mkdirSync(__dirname + "/" + "parse_files", { recursive: true });
  let outputDir = __dirname + "/" + "parse_files",
    pdfExtractor = new PdfExtractor(outputDir, {
      viewportScale: (width, height) => {
        //dynamic zoom based on rendering a page to a fixed page size
        if (width > height) {
          //landscape: 1100px wide
          return 1100 / width;
        }
        //portrait: 800px wide
        return 800 / width;
      },
      pageRange: [1, 5],
    });

  pdfExtractor
    .parse(__dirname + "/" + "витяг.pdf")
    .then((data) => console.log(data))
    .catch(function (err) {
      console.error("Error: " + err);
    });
  return {};
}

module.exports = parsePDF;
