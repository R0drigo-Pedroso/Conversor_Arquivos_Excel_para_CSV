# Conversor Automático de Arquivos Excel para CSV com Monitoramento

Este é um script em Node.js que automatiza a conversão de arquivos Excel para o formato CSV. Além disso, ele monitora uma pasta específica em busca de novos arquivos Excel ou CSV, efetua a conversão e movimenta os arquivos resultantes para uma pasta de saída.

## Requisitos

Antes de executar este script, certifique-se de ter os seguintes requisitos instalados no seu sistema:

- [Node.js](https://nodejs.org/): Certifique-se de ter o Node.js instalado. Você pode baixar a versão apropriada para o seu sistema operacional no site oficial.

## Instalação e Configuração

1. Clone este repositório para o seu sistema ou faça o download como arquivo ZIP e extraia-o.

2. Abra um terminal e navegue até o diretório do projeto.

3. Instale as dependências necessárias executando o seguinte comando:

```bash
npm install chokidar xlsx
```

## Configuração do Diretório

Abra o arquivo `index.js` e ajuste as seguintes variáveis de acordo com o seu ambiente:

- `inputFolderPath`: O caminho para a pasta onde os arquivos Excel ou CSV serão monitorados.
- `outputFolderPath`: O caminho para a pasta onde os arquivos CSV convertidos serão movidos.

## Uso

1. No terminal, navegue até o diretório do projeto.

2. Execute o seguinte comando para iniciar o monitoramento e conversão:

```bash
node index.js
```

3. O script agora está monitorando a pasta de entrada especificada. Quando novos arquivos Excel ou CSV forem adicionados, eles serão automaticamente convertidos e movidos para a pasta de saída.

## Funcionamento

- Quando um novo arquivo Excel (`.xlsx`) é detectado na pasta de entrada:

  - O script lê o arquivo Excel e converte seu conteúdo para o formato CSV.
  - O arquivo CSV resultante é salvo na pasta de saída com o mesmo nome do arquivo Excel.

- Quando um novo arquivo CSV (`.csv`) é detectado na pasta de entrada:
  - O script move o arquivo CSV para a pasta de saída.

## Notas

- O script utiliza a biblioteca `chokidar` para monitorar a pasta e a biblioteca `xlsx` para manipulação de arquivos Excel.

- O código inclui tratamento para casos em que os arquivos estão bloqueados ou ocupados durante a movimentação.

## Contribuições

Se você quiser contribuir com melhorias, correções ou novos recursos, fique à vontade para abrir um pull request neste repositório.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo `LICENSE` para obter mais detalhes.

---

Agora, o `README.md` foi atualizado para incluir informações mais detalhadas sobre a instalação, configuração e uso do script, bem como detalhes sobre as dependências e a licença. Certifique-se de personalizar ainda mais as informações para se adequarem ao seu projeto específico.
