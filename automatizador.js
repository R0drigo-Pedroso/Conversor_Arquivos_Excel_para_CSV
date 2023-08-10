const chokidar = require("chokidar");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

const inputFolderPath = "./entrada"; // Pasta onde serão adicionados os arquivos Excel ou CSV
const outputFolderPath = "./saida"; // Pasta onde serão salvos os arquivos CSV

function convertExcelToCSV(filePath) {
  if (path.extname(filePath) === ".xlsx") {
    console.log(`Novo arquivo Excel detectado: ${filePath}`);

    // Ler o arquivo Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Converter para CSV
    const csvData = XLSX.utils.sheet_to_csv(sheet);

    // Criar o nome do arquivo CSV de acordo com o arquivo Excel
    const csvFileName = path.basename(filePath, ".xlsx") + ".csv";
    const csvFilePath = path.join(outputFolderPath, csvFileName);

    // Salvar o arquivo CSV
    fs.writeFileSync(csvFilePath, csvData);

    console.log(`Arquivo CSV criado: ${csvFilePath}`);
  }
}

function moveCSVFile(filePath) {
  if (path.extname(filePath) === ".csv") {
    console.log(`Novo arquivo CSV detectado: ${filePath}`);

    // Criar o caminho de destino para o arquivo CSV
    const csvFileName = path.basename(filePath);
    const csvFilePath = path.join(outputFolderPath, csvFileName);

    // Tentar mover o arquivo CSV para a pasta de saída, com tratamento de erro
    try {
      fs.renameSync(filePath, csvFilePath);
      console.log(`Arquivo CSV movido para: ${csvFilePath}`);
    } catch (error) {
      if (error.code === "EBUSY") {
        console.log(
          `O arquivo está ocupado ou bloqueado. Tentando novamente em 1 segundo...`
        );
        setTimeout(() => {
          moveCSVFile(filePath); // Tentar mover novamente após um segundo
        }, 1000);
      } else {
        console.error(`Erro durante a movimentação do arquivo CSV: ${error}`);
      }
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
    convertExcelToCSV(filePath);
    moveCSVFile(filePath);
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
