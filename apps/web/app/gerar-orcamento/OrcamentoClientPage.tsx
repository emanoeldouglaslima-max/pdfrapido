'use client';

import { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import DownloadCard from '../../components/DownloadCard';

interface OrcamentoItem {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
}

export default function OrcamentoClientPage() {
  // Dados do Emissor
  const [issuerName, setIssuerName] = useState('');
  const [issuerCpfCnpj, setIssuerCpfCnpj] = useState('');
  const [issuerPhone, setIssuerPhone] = useState('');
  const [issuerEmail, setIssuerEmail] = useState('');
  const [issuerCityState, setIssuerCityState] = useState('');

  // Dados do Cliente
  const [clientName, setClientName] = useState('');
  const [clientCpfCnpj, setClientCpfCnpj] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [clientCityState, setClientCityState] = useState('');

  // Detalhes do Orçamento
  const [quoteNumber, setQuoteNumber] = useState(`ORC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [validityDays, setValidityDays] = useState('15');

  // Itens do Orçamento
  const [items, setItems] = useState<OrcamentoItem[]>([
    { id: '1', description: 'Desenvolvimento / Prestação de Serviço', qty: 1, unitPrice: 500 },
  ]);

  // Condições e Totais
  const [discount, setDiscount] = useState<number>(0);
  const [paymentTerms, setPaymentTerms] = useState('PIX, Boleto ou Sinal de 50% + Restante na Entrega');
  const [pixKey, setPixKey] = useState('');
  const [notes, setNotes] = useState('Orçamento válido pelo período informado. Garantia de 90 dias após a conclusão do serviço.');

  // Estados de PDF
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Manipulação de Itens
  const handleAddItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), description: '', qty: 1, unitPrice: 0 },
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length <= 1) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (id: string, field: keyof OrcamentoItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  // Cálculos financeiros
  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.unitPrice || 0), 0);
  const total = Math.max(0, subtotal - (discount || 0));

  // Geração do PDF com pdf-lib
  const handleGeneratePdf = async () => {
    try {
      setIsGenerating(true);
      setDownloadUrl(null);

      // Criar documento PDF A4
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.28, 841.89]); // A4 em pontos (72 dpi)
      const { width, height } = page.getSize();

      const fontNormal = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      let y = height - 50;

      // ── CABEÇALHO ──
      // Barra superior decorativa
      page.drawRectangle({
        x: 40,
        y: height - 40,
        width: width - 80,
        height: 6,
        color: rgb(0.14, 0.42, 0.94), // Brand Blue #2563eb
      });

      // Título do Documento
      page.drawText('ORÇAMENTO COMERCIAL', {
        x: 40,
        y: y - 20,
        size: 20,
        font: fontBold,
        color: rgb(0.09, 0.14, 0.24),
      });

      // Número e Data do Orçamento (Alinhado à Direita)
      page.drawText(`Nº: ${quoteNumber || 'ORC-001'}`, {
        x: width - 200,
        y: y - 15,
        size: 11,
        font: fontBold,
        color: rgb(0.14, 0.42, 0.94),
      });

      const formattedDate = issueDate ? issueDate.split('-').reverse().join('/') : new Date().toLocaleDateString('pt-BR');
      page.drawText(`Data: ${formattedDate}`, {
        x: width - 200,
        y: y - 30,
        size: 9,
        font: fontNormal,
        color: rgb(0.4, 0.4, 0.4),
      });

      page.drawText(`Validade: ${validityDays} dias`, {
        x: width - 200,
        y: y - 43,
        size: 9,
        font: fontNormal,
        color: rgb(0.4, 0.4, 0.4),
      });

      y -= 70;

      // Linha divisória
      page.drawLine({
        start: { x: 40, y },
        end: { x: width - 40, y },
        thickness: 1,
        color: rgb(0.88, 0.9, 0.94),
      });

      y -= 25;

      // ── BLOCOS DE PRESTADOR E CLIENTE ──
      // Coluna 1: Emissor / Prestador
      page.drawText('EMISSOR / PRESTADOR DE SERVIÇOS', {
        x: 40,
        y,
        size: 10,
        font: fontBold,
        color: rgb(0.14, 0.42, 0.94),
      });

      // Coluna 2: Cliente
      page.drawText('CLIENTE / DESTINATÁRIO', {
        x: 310,
        y,
        size: 10,
        font: fontBold,
        color: rgb(0.14, 0.42, 0.94),
      });

      y -= 15;

      // Detalhes Emissor
      page.drawText(issuerName || 'Seu Nome / Sua Empresa', { x: 40, y, size: 10, font: fontBold, color: rgb(0.1, 0.1, 0.1) });
      page.drawText(clientName || 'Nome do Cliente / Empresa', { x: 310, y, size: 10, font: fontBold, color: rgb(0.1, 0.1, 0.1) });

      y -= 14;
      if (issuerCpfCnpj) page.drawText(`CPF/CNPJ: ${issuerCpfCnpj}`, { x: 40, y, size: 9, font: fontNormal, color: rgb(0.3, 0.3, 0.3) });
      if (clientCpfCnpj) page.drawText(`CPF/CNPJ: ${clientCpfCnpj}`, { x: 310, y, size: 9, font: fontNormal, color: rgb(0.3, 0.3, 0.3) });

      y -= 13;
      if (issuerPhone) page.drawText(`Tel/WhatsApp: ${issuerPhone}`, { x: 40, y, size: 9, font: fontNormal, color: rgb(0.3, 0.3, 0.3) });
      if (clientContact) page.drawText(`Contato: ${clientContact}`, { x: 310, y, size: 9, font: fontNormal, color: rgb(0.3, 0.3, 0.3) });

      y -= 13;
      if (issuerEmail) page.drawText(`E-mail: ${issuerEmail}`, { x: 40, y, size: 9, font: fontNormal, color: rgb(0.3, 0.3, 0.3) });
      if (clientCityState) page.drawText(`Cidade/UF: ${clientCityState}`, { x: 310, y, size: 9, font: fontNormal, color: rgb(0.3, 0.3, 0.3) });

      y -= 13;
      if (issuerCityState) page.drawText(`Cidade/UF: ${issuerCityState}`, { x: 40, y, size: 9, font: fontNormal, color: rgb(0.3, 0.3, 0.3) });

      y -= 30;

      // ── TABELA DE ITENS / SERVIÇOS ──
      // Cabeçalho da Tabela
      page.drawRectangle({
        x: 40,
        y: y - 18,
        width: width - 80,
        height: 24,
        color: rgb(0.94, 0.96, 1.0), // Blue Tint
      });

      page.drawText('ITEM / DESCRIÇÃO DO SERVIÇO', { x: 50, y: y - 12, size: 9, font: fontBold, color: rgb(0.14, 0.42, 0.94) });
      page.drawText('QTD', { x: 350, y: y - 12, size: 9, font: fontBold, color: rgb(0.14, 0.42, 0.94) });
      page.drawText('VALOR UNIT.', { x: 410, y: y - 12, size: 9, font: fontBold, color: rgb(0.14, 0.42, 0.94) });
      page.drawText('TOTAL', { x: 500, y: y - 12, size: 9, font: fontBold, color: rgb(0.14, 0.42, 0.94) });

      y -= 25;

      // Linhas dos Itens
      items.forEach((item, index) => {
        const itemSubtotal = item.qty * item.unitPrice || 0;

        // Fundo zebrado
        if (index % 2 === 1) {
          page.drawRectangle({
            x: 40,
            y: y - 12,
            width: width - 80,
            height: 20,
            color: rgb(0.98, 0.98, 0.99),
          });
        }

        page.drawText(item.description || `Item #${index + 1}`, { x: 50, y: y - 8, size: 9, font: fontNormal, color: rgb(0.2, 0.2, 0.2) });
        page.drawText(String(item.qty || 1), { x: 355, y: y - 8, size: 9, font: fontNormal, color: rgb(0.2, 0.2, 0.2) });
        page.drawText(`R$ ${(item.unitPrice || 0).toFixed(2)}`, { x: 410, y: y - 8, size: 9, font: fontNormal, color: rgb(0.2, 0.2, 0.2) });
        page.drawText(`R$ ${itemSubtotal.toFixed(2)}`, { x: 500, y: y - 8, size: 9, font: fontBold, color: rgb(0.1, 0.1, 0.1) });

        y -= 22;
      });

      y -= 15;

      // ── QUADRO DE TOTAIS (LADO DIREITO) ──
      const totalsBoxX = width - 240;
      page.drawRectangle({
        x: totalsBoxX,
        y: y - 65,
        width: 200,
        height: 70,
        color: rgb(0.96, 0.97, 0.99),
        borderColor: rgb(0.88, 0.9, 0.94),
        borderWidth: 1,
      });

      page.drawText(`Subtotal: R$ ${subtotal.toFixed(2)}`, { x: totalsBoxX + 15, y: y - 20, size: 9, font: fontNormal, color: rgb(0.3, 0.3, 0.3) });
      if (discount > 0) {
        page.drawText(`Desconto: - R$ ${discount.toFixed(2)}`, { x: totalsBoxX + 15, y: y - 35, size: 9, font: fontNormal, color: rgb(0.8, 0.2, 0.2) });
      }
      page.drawText(`TOTAL FINAL: R$ ${total.toFixed(2)}`, { x: totalsBoxX + 15, y: y - 55, size: 12, font: fontBold, color: rgb(0.14, 0.42, 0.94) });

      y -= 85;

      // ── CONDIÇÕES DE PAGAMENTO E OBSERVAÇÕES ──
      page.drawText('CONDIÇÕES DE PAGAMENTO E OBSERVAÇÕES', { x: 40, y, size: 10, font: fontBold, color: rgb(0.14, 0.42, 0.94) });
      y -= 15;

      if (paymentTerms) {
        page.drawText(`Formas de Pagamento: ${paymentTerms}`, { x: 40, y, size: 9, font: fontNormal, color: rgb(0.3, 0.3, 0.3) });
        y -= 14;
      }

      if (pixKey) {
        page.drawText(`Chave PIX: ${pixKey}`, { x: 40, y, size: 9, font: fontBold, color: rgb(0.1, 0.5, 0.2) });
        y -= 14;
      }

      if (notes) {
        page.drawText(`Observações: ${notes}`, { x: 40, y, size: 8, font: fontNormal, color: rgb(0.4, 0.4, 0.4) });
        y -= 14;
      }

      // ── ASSINATURA / ACEITE DE ACORDO ──
      y -= 40;
      page.drawLine({ start: { x: 180, y }, end: { x: 415, y }, thickness: 1, color: rgb(0.7, 0.7, 0.7) });
      page.drawText('Assinatura do Prestador ou Aceite do Cliente', { x: 195, y: y - 12, size: 8, font: fontNormal, color: rgb(0.5, 0.5, 0.5) });

      // Rodapé da Página
      page.drawText('Orçamento gerado gratuitamente no PDFRápido.com.br — Documento 100% digital', {
        x: 100,
        y: 20,
        size: 7,
        font: fontNormal,
        color: rgb(0.6, 0.6, 0.6),
      });

      // Salvar em uint8array e gerar Blob URL
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error('Erro ao gerar PDF de orçamento:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
      {downloadUrl ? (
        <DownloadCard
          downloadUrl={downloadUrl}
          filename={`orcamento-${quoteNumber || 'pdfrapido'}.pdf`}
          onReset={() => setDownloadUrl(null)}
        />
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleGeneratePdf(); }} className="space-y-8">
          {/* SEÇÃO 1: SEUS DADOS / EMISSOR */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span>💼</span> Seus Dados (Emissor do Orçamento)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Nome / Empresa *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: João da Silva Serviços ou Tech Soluções"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  value={issuerName}
                  onChange={(e) => setIssuerName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">CPF ou CNPJ</label>
                <input
                  type="text"
                  placeholder="Ex: 00.000.000/0001-00"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  value={issuerCpfCnpj}
                  onChange={(e) => setIssuerCpfCnpj(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Telefone / WhatsApp</label>
                <input
                  type="text"
                  placeholder="Ex: (11) 99999-9999"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  value={issuerPhone}
                  onChange={(e) => setIssuerPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">E-mail de Contato</label>
                <input
                  type="email"
                  placeholder="Ex: contato@suaempresa.com.br"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  value={issuerEmail}
                  onChange={(e) => setIssuerEmail(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: DADOS DO CLIENTE */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span>👤</span> Dados do Cliente
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Nome do Cliente / Empresa *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Maria Oliveira ou Loja Exemplo"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">CPF ou CNPJ do Cliente</label>
                <input
                  type="text"
                  placeholder="Ex: 111.222.333-44"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  value={clientCpfCnpj}
                  onChange={(e) => setClientCpfCnpj(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Contato / WhatsApp</label>
                <input
                  type="text"
                  placeholder="Ex: (11) 98888-8888"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  value={clientContact}
                  onChange={(e) => setClientContact(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Cidade / UF</label>
                <input
                  type="text"
                  placeholder="Ex: São Paulo / SP"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  value={clientCityState}
                  onChange={(e) => setClientCityState(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* SEÇÃO 3: IDENTIFICAÇÃO DO ORÇAMENTO */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
              <span>📋</span> Detalhes do Orçamento
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Número do Orçamento</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  value={quoteNumber}
                  onChange={(e) => setQuoteNumber(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Data de Emissão</label>
                <input
                  type="date"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Validade (Dias)</label>
                <select
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  value={validityDays}
                  onChange={(e) => setValidityDays(e.target.value)}
                >
                  <option value="7">7 dias</option>
                  <option value="15">15 dias (Recomendado)</option>
                  <option value="30">30 dias</option>
                  <option value="60">60 dias</option>
                </select>
              </div>
            </div>
          </div>

          {/* SEÇÃO 4: ITENS / SERVIÇOS DO ORÇAMENTO */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>🛒</span> Itens e Serviços
              </h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs font-bold bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 px-3 py-1.5 rounded-xl border border-brand-200 dark:border-brand-800 hover:bg-brand-100 transition-colors"
              >
                + Adicionar Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={item.id} className="bg-gray-50 dark:bg-gray-800/60 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-6">
                    <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1">Descrição do Serviço / Produto #{idx + 1}</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Formatação de computador ou Pintura de parede"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-gray-100 focus:outline-none"
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1">Qtd</label>
                    <input
                      type="number"
                      min="1"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-gray-100 focus:outline-none"
                      value={item.qty}
                      onChange={(e) => handleItemChange(item.id, 'qty', parseInt(e.target.value) || 1)}
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-gray-500 dark:text-gray-400 mb-1">Valor Unit. (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-900 dark:text-gray-100 focus:outline-none"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    />
                  </div>

                  <div className="sm:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={items.length <= 1}
                      className="p-2 text-red-500 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Remover Item"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEÇÃO 5: TOTAL E CONDIÇÕES */}
          <div className="bg-gray-50 dark:bg-gray-800/80 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Desconto (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none"
                  value={discount || ''}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Chave PIX (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: CNPJ 00.000.000/0001-00 ou E-mail"
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Condições de Pagamento</label>
              <input
                type="text"
                placeholder="Ex: 50% de sinal no aceite e 50% na entrega final"
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Observações / Garantia</label>
              <textarea
                rows={2}
                placeholder="Ex: Prazo de entrega de 5 dias úteis após a aprovação."
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none resize-none"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* TOTAL FINAL CALCULADO */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-xs text-gray-500">
                Subtotal: R$ {subtotal.toFixed(2)} | Desconto: R$ {(discount || 0).toFixed(2)}
              </div>
              <div className="text-xl font-extrabold text-brand-600 dark:text-brand-400">
                VALOR TOTAL: R$ {total.toFixed(2)}
              </div>
            </div>
          </div>

          {/* BOTÃO GERAR PDF */}
          <button
            type="submit"
            disabled={isGenerating}
            className="btn-primary w-full py-4 text-base font-bold shadow-lg shadow-brand-500/20 disabled:opacity-60"
          >
            {isGenerating ? '⏳ Gerando seu Orçamento em PDF...' : '⚡ Gerar Orçamento em PDF Agora'}
          </button>
        </form>
      )}
    </div>
  );
}
