# PDFRápido — Descobertas Técnicas (Findings)

Resumo das descobertas, restrições do ambiente e decisões de engenharia.

## Restrições do Ambiente Windows Local

1. **Ausência de Binários do Poppler/LibreOffice/Ghostscript**:
   * O utilitário `pdftotext` (usado na conversão original de PDF para Word) não está presente por padrão no Windows.
   * O utilitário `pdf2pic` exige `graphicsmagick` e `ghostscript`, ambos indisponíveis.
   * A solução foi adotar `pdfjs-dist/legacy` com `canvas` para renderizar as páginas como imagens JPG de forma 100% nativa.
   * Para extrair texto em PDF para Word, reescrevemos o pipeline para usar o `pdfjs-dist` e obter os itens textuais de cada página diretamente, salvando o buffer em um arquivo `.docx`.

2. **Caminhos de Arquivos Temporários**:
   * O sistema utilizava `/tmp/` que falha em máquinas Windows sem camada de emulação.
   * O uso de `os.tmpdir()` resolve o problema dinamicamente (usa `AppData\Local\Temp` no Windows e `/tmp` no Linux).

3. **Configurações do Docker**:
   * O Docker Desktop estava instalado, mas inativo. Foi iniciado via script e o Redis foi configurado localmente na porta 6379 com limite de memória.
