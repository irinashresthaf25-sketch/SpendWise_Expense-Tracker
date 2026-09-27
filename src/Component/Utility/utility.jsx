import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// CSV Export
export function exportToCSV(transactions, selectedCurrency, convertAmount) {
  if (!transactions || transactions.length === 0) {
    alert('No transactions available to export.');
    return;
  }

  const headers = ['Date', 'Description', 'Type', 'Category', `Amount (${selectedCurrency})`, 'Recurring'];

  const rows = transactions.map((tx) => [
    tx.date || '',
    `"${tx.description.replace(/"/g, '""')}"`,
    tx.type,
    tx.category,
    convertAmount(tx.amount || 0),
    tx.isRecurring ? `Yes (${tx.frequency})` : 'No',
  ]);

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute(
    'download',
    `expense_report_${new Date().toISOString().split('T')[0]}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// PDF Export
export function exportToPDF(transactions, selectedCurrency, convertAmount) {
  try {
    if (!transactions || transactions.length === 0) {
      alert('No transactions available to export.');
      return;
    }

    const doc = new jsPDF();

    // Document Title & Header
    doc.setFontSize(18);
    doc.text('Expense Tracker Statement', 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);

    // Table Columns & Rows
    const tableColumn = ['Date', 'Description', 'Type', 'Category', `Amount (${selectedCurrency})`];
    const tableRows = transactions.map((tx) => [
      tx.date || 'N/A',
      tx.description,
      tx.type ? tx.type.toUpperCase() : 'EXPENSE',
      tx.category || 'General',
      `${tx.type === 'expense' ? '-' : '+'}${selectedCurrency} ${convertAmount(tx.amount || 0)}`,
    ]);

    // Generate AutoTable using direct function call
    autoTable(doc, {
      startY: 34,
      head: [tableColumn],
      body: tableRows,
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229] },
    });

    // Save PDF File
    doc.save(`expense_statement_${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    alert('Could not download PDF. Error: ' + error.message);
  }
}
