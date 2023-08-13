Claro! Aqui está um README detalhado que explica a instalação, forma de uso, linguagem utilizada e o problema que o código acima soluciona:

## Conversor Automatizado de Arquivos Excel para CSV e Vice-Versa

![Node.js](https://img.shields.io/badge/Node.js-14.x-green.svg)
![XLSX Library](https://img.shields.io/badge/xlsx-0.17.0-blue.svg)
![Chokidar Library](https://img.shields.io/badge/chokidar-3.5.2-blue.svg)

Este é um script Node.js que monitora uma pasta de entrada para novos arquivos Excel (XLSX) ou CSV e os converte automaticamente para o formato desejado. Os arquivos convertidos são movidos para pastas específicas de saída, mantendo o nome original.

### Problema Solucionado

Muitas vezes, é necessário lidar com arquivos em diferentes formatos, como Excel (XLSX) e CSV, e realizar conversões manuais pode ser demorado e propenso a erros. Esse script automatiza o processo de conversão, economizando tempo e evitando erros humanos.

### Pré-requisitos

- [Node.js](https://nodejs.org/) versão 14.x ou superior instalado.
- Biblioteca `xlsx` para manipulação de arquivos Excel. Você pode instalá-la com o seguinte comando:

  ```
  npm install xlsx
  ```

### Instalação

1. Faça o download ou clone este repositório para a sua máquina.

2. Abra o terminal e navegue até o diretório do projeto.

3. Execute o seguinte comando para instalar as dependências necessárias:

   ```
   npm install
   ```

### Uso

1. Abra o arquivo `automatizador.js` em um editor de texto.

2. Configure as variáveis `inputFolderPath` e `outputFolderPath` para definir as pastas de entrada e saída, respectivamente.

3. No terminal, dentro do diretório do projeto, execute o seguinte comando para iniciar o conversor:

   ```
   node automatizador.js
   ```

O script começará a monitorar a pasta de entrada para novos arquivos Excel (XLSX) e CSV. Quando um arquivo é adicionado à pasta de entrada, o script detecta automaticamente o tipo de arquivo e o converte para o formato correspondente. O arquivo convertido é então movido para a pasta de saída correspondente.

### Funcionalidades Adicionais

- O script lida com a situação em que um arquivo está ocupado ou bloqueado durante a movimentação, realizando até cinco tentativas em intervalos de 1 segundo.

### Tecnologias Utilizadas

- Node.js: Linguagem de programação utilizada para desenvolver o script.
- Biblioteca `xlsx`: Usada para ler e escrever arquivos Excel.
- Biblioteca `chokidar`: Utilizada para monitorar mudanças em pastas.

---

Agora você tem um conversor automatizado que monitora sua pasta de entrada e realiza a conversão de arquivos Excel para CSV e vice-versa de forma eficiente e livre de erros! 🚀
