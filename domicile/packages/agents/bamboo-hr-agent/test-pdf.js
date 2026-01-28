/* eslint-disable */
const pdf = require('pdf-parse');
const fs = require('fs');
const dataBuffer = fs.readFileSync('Agents/Incoming/PDFs/sample-timesheet.pdf');
pdf(dataBuffer)
  .then((data) => {
    console.log('Text:', data.text);
  })
  .catch((err) => {
    console.error('Error:', err);
  });
