const fs = require("fs");
const fastcsv = require("fast-csv");
const { validateRow } = require("../utils/validator");
const User = require("../models/UserInstances");

module.exports = async function (job) {
  const { filePath } = job.data;

  let totalRows = 0;
  let success = 0;
  let failed = 0;
  const errors = [];

  const rows = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(fastcsv.parse({ headers: true }))
      .on("data", (row) => {
        totalRows++;
        const { isValid, error } = validateRow(row);

        if (isValid) {
          rows.push(row);
        } else {
          failed++;
          errors.push({ row: totalRows, reason: error });
        }
      })
      .on("end", async () => {
        await User.bulkCreate(rows, {
          validate: true,
          ignoreDuplicates: false,
        });
        success = rows.length;
        resolve({ totalRows, success, failed, errors });
        // for (let row of rows) {
        // await db.query('INSERT INTO users (name, email, phone, age, city) VALUES (?, ?, ?, ?, ?)', [
        //   row.name, row.email, row.phone || null, row.age || null, row.city || null
        // ]);
        // success++;
        // }
      })
      .on("error", reject);
  });
};
