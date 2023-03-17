// import { expect } from "chai";

// it("parses the CSV line with quotes", () => {
//   const lines = [
//     { csv: 'a b, two,c', fields: ["a b", " two", "c"] },
//     { csv: '"a, b", two,c', fields: ["a, b", " two", "c"] },
//     { csv: '"a, "b, two,c', fields: ['a, b', " two", "c"] },
//     { csv: '"a, ""b", two,c', fields: ['a, "b', " two", "c"] },
//   ];

//   for (const entry of lines) {
//     const parsedFields = parseCSVLine(entry.csv);

//     entry.fields.forEach((field, i) => {
//       expect(field).to.equal(parsedFields[i]);
//     });
//   }
// });