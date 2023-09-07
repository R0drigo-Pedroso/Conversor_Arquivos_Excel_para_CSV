const chokidar = require("chokidar");
const XLSX = require("xlsx");
const fs = require("fs").promises;
const path = require("path");

const inputFolderPath = "./entrada";
const outputFolderPath = "./saida";

async function processFile(filePath) {
  const extname = path.extname(filePath);

  if (extname === ".xlsx") {
    console.log(`Novo arquivo Excel detectado: ${filePath}`);
    await convertExcelToCSV(filePath);
  } else if (extname === ".csv") {
    console.log(`Novo arquivo CSV detectado: ${filePath}`);
    await convertCSVToExcel(filePath);
  }
}

async function convertExcelToCSV(filePath) {
  console.log(`Convertendo Excel para CSV: ${filePath}`);
  const xlsxFileName = path.basename(filePath);
  const csvFilePath = path.join(
    outputFolderPath,
    path.basename(filePath, ".xlsx") + ".csv"
  );

  const workbook = XLSX.readFile(filePath);
  const csvData = XLSX.utils.sheet_to_csv(
    workbook.Sheets[workbook.SheetNames[0]]
  );

  await fs.writeFile(csvFilePath, csvData);
  console.log(`Arquivo CSV criado: ${csvFilePath}`);
}

async function convertCSVToExcel(filePath) {
  console.log(`Convertendo CSV para Excel: ${filePath}`);
  const csvData = await fs.readFile(filePath, "utf-8");

  const csvLines = csvData.trim().split("\n");
  const csvRows = csvLines.map((line) => line.split(","));

  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet(csvRows);
  XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");

  const xlsxFileName = path.basename(filePath, ".csv") + ".xlsx";
  const xlsxFilePath = path.join(outputFolderPath, xlsxFileName);

  XLSX.writeFile(workbook, xlsxFilePath);
  console.log(`Arquivo Excel criado: ${xlsxFilePath}`);
}

async function startMonitoring() {
  const watcher = chokidar.watch(inputFolderPath, {
    ignored: /^\./,
    persistent: true,
  });

  console.log(
    `Monitorando a pasta ${inputFolderPath} para novos arquivos Excel ou CSV...`
  );

  watcher.on("add", async (filePath) => {
    try {
      await processFile(filePath);
    } catch (error) {
      console.error(`Erro ao processar arquivo: ${filePath}`);
      console.error(error);
    }
  });

  watcher.on("error", (error) => {
    console.error(`Erro durante a monitoração: ${error}`);
  });
}

startMonitoring();

console.log(
  `Aguardando novos arquivos Excel ou CSV na pasta ${inputFolderPath}...`
);
