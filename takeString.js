const fs = require("fs");
const path = require("path");
const takeString = function () {
  const str1 = fs
    .readFileSync(path.resolve(__dirname, "parse_files/" + "text-1.txt"))
    .toString();
  console.log(str1.slice(173, 183));

  const data = {};
  data.case_number = str1.slice(79, 96);
  data.case_date = str1.slice(173, 183);
  data.case_time = 0;
};

takeString();
