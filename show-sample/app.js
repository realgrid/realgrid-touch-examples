const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// const fs = require("fs");
// const path = require("path");

// const htmlDir = path.join(__dirname, "public");
// const htmlFiles = [];

// fs.readdir(htmlDir, (err, files) => {
//     if (err) throw err;

//     // Filter files with .html extension
//     files.filter((file) => file.endsWith(".html")).forEach((file) => htmlFiles.push(file));

//     // Create HTML code
//     const htmlCode = `
//     <html>
//       <head>
//         <title>RealGrid-Touch v1.0 - Show</title>
//         <style>
//             html {
//                 margin: 5px 5px 5px 10px;
//             }
//             body {
//                 font-family: "Nanum Gothic", Verdana, "Apple SD Gothic Neo", "Malgun Gothic";
//                 margin: 0px 0px 0px 0px;
//             }
//             ul {
//                 list-style-type: disc;
//             }
//             li h3 {
//                 margin: 8px 0px;
//                 font-weight: 400;
//                 font-size: 17px;
//             }
//             .dl-body h2 {
//                 margin-block: 1.5em;
//             }
//         </style>
//       </head>
//       <body class="dl-root">
//         <h2>RealGrid-Touch Show</h2>
//         <ul>
//           ${htmlFiles.map((file) => `<li><h3><a href="${file}">${file}</a></h3></li>`).join("")}
//         </ul>
//       </body>
//     </html>
//   `;

//     // Write HTML code to index.html file
//     const indexPath = path.join(htmlDir, "index.html");
//     fs.writeFile(indexPath, htmlCode, (err) => {
//         if (err) throw err;
//         console.log(`Updated ${indexPath}`);
//     });
// });


app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/show/index.html");
});

app.listen(PORT, () => {
    console.log(`Listening : http://localhost:${PORT}`);
});
