const chokidar = require("chokidar");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const inputFolderPath = "./entrada"; // Pasta onde serão adicionados os arquivos Excel ou CSV
const outputFolderPath = "./saida"; // Pasta onde serão salvos os arquivos CSV e XLSX

function processFile(filePath) {
  if (path.extname(filePath) === ".xlsx") {
    console.log(`Novo arquivo Excel detectado: ${filePath}`);
    convertExcelToCSV(filePath);
  } else if (path.extname(filePath) === ".csv") {
    console.log(`Novo arquivo CSV detectado: ${filePath}`);
    convertCSVToExcel(filePath);
    moveFile(
      filePath,
      path.join(outputFolderPath, path.basename(filePath, ".csv") + ".xlsx")
    );
  }
}

function convertExcelToCSV(filePath) {
  // Código existente para a conversão de Excel para CSV
  // ...
}

function convertCSVToExcel(filePath) {
  if (path.extname(filePath) === ".csv") {
    console.log(`Convertendo CSV para Excel: ${filePath}`);

    const csvData = fs.readFileSync(filePath, "utf-8");

    // Converter CSV para matriz de linhas
    const csvLines = csvData.trim().split("\n");
    const csvRows = csvLines.map((line) => line.split(","));

    // Criar um novo workbook e adicionar a planilha
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.aoa_to_sheet(csvRows);
    XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");

    // Criar o nome do arquivo Excel
    const xlsxFileName = path.basename(filePath, ".csv") + ".xlsx";
    const xlsxFilePath = path.join(outputFolderPath, xlsxFileName);

    // Salvar o arquivo Excel
    XLSX.writeFile(workbook, xlsxFilePath);

    console.log(`Arquivo Excel criado: ${xlsxFilePath}`);
  }
}

function moveFile(filePath, destFilePath, attempt = 1) {
  try {
    fs.renameSync(filePath, destFilePath);
    console.log(`Arquivo movido para: ${destFilePath}`);
  } catch (error) {
    if (error.code === "EBUSY" && attempt < 5) {
      console.log(
        `O arquivo está ocupado ou bloqueado. Tentando novamente em 1 segundo...`
      );
      setTimeout(() => {
        moveFile(filePath, destFilePath, attempt + 1);
      }, 1000);
    } else {
      console.error(`Erro durante a movimentação do arquivo: ${error}`);
    }
  }
}

function startMonitoring() {
  // Monitorar a pasta de entrada para novos arquivos Excel ou CSV
  const watcher = chokidar.watch(inputFolderPath, {
    ignored: /^\./, // Ignorar arquivos ocultos
    persistent: true,
  });

  console.log(
    `Monitorando a pasta ${inputFolderPath} para novos arquivos Excel ou CSV...`
  );

  watcher.on("add", (filePath) => {
    try {
      processFile(filePath);
    } catch (error) {
      console.error(`Erro ao processar arquivo: ${filePath}`);
      console.error(error);
    }
  });

  // Lidar com erros
  watcher.on("error", (error) => {
    console.error(`Erro durante a monitoração: ${error}`);
  });
}

startMonitoring(); // Iniciar o monitoramento

console.log(
  `Aguardando novos arquivos Excel ou CSV na pasta ${inputFolderPath}...`
);
