console.log("123");
// PizZip is required because docx/pptx/xlsx files are all zipped files, and
// the PizZip library allows us to load the file in memory
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
data = {
  first_name: "John",
  last_name: "Doe",
  phone: "0652455478",
  description: "New Website",
  case_story:
    "фізична особа – підприємець Бурков О.В. (РНОКПП 2769008818) в період 2022-2023 років перебуваючи на території Київської області, маючи у власності майно, а саме земельні ділянки загальною площею 10,34 га, отримав від уповноваженого органу податкові повідомлення-рішення про обов’язок Буркова О.В. сплатити до 06.02.2023 земельний податок з фізичних осіб на загальну суму 4 652,3 тис.гривень та не сплатив його, таким чином ухилився від сплати податків у значних розмірах, що підтверджується аналітичним продуктом від 27.10.2023 №2/59-23-АП",
  case_number: "72023110200000017",
};

const fs = require("fs");
const path = require("path");

// Load the docx file as binary content
const content = fs.readFileSync(
  path.resolve(__dirname, "templates/" + "report.docx"),
  "binary"
);
fs.mkdirSync(__dirname + "/" + data.case_number, { recursive: true });

// Unzip the content of the file
const zip = new PizZip(content);

// This will parse the template, and will throw an error if the template is
// invalid, for example, if the template is "{user" (no closing tag)
const doc = new Docxtemplater(zip, {
  paragraphLoop: true,
  linebreaks: true,
});
// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
doc.render(data);

// Get the zip document and generate it as a nodebuffer
const buf = doc.getZip().generate({
  type: "nodebuffer",
  // compression: DEFLATE adds a compression step.
  // For a 50MB output document, expect 500ms additional CPU time
  compression: "DEFLATE",
});

// buf is a nodejs Buffer, you can either write it to a
// file or res.send it with express for example.
fs.writeFileSync(
  path.resolve(__dirname, data.case_number + "/" + "report.docx"),
  buf
);
console.log(__dirname);
console.log("end");
