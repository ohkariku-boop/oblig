import { jsPDF } from 'jspdf';
import {
  DATA, TOTAL_ITEMS, itemKey, bandFor, sectionScores, overallPct,
  type ChecklistState, type Milestone,
} from '@/data/assessment';
import { MILESTONE_NOTES } from '@/data/checklist';

/** Branded scorecard PDF — matches the original Oblig export. */
export function exportScorecardPdf(state: ChecklistState, milestone: Milestone | 'none') {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 48;
  let y = margin;

  // Header band — navy
  doc.setFillColor(27, 42, 74);
  doc.rect(0, 0, pageW, 64, 'F');
  doc.setTextColor(250, 247, 240);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Oblig', margin, 28);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('IT Governance Scorecard', margin, 46);
  doc.setFontSize(9);
  doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), pageW - margin, 28, { align: 'right' });

  y = 92;
  const count = Object.values(state).filter(Boolean).length;
  const band = bandFor(count);
  const pct = overallPct(state);

  // Score block
  doc.setDrawColor(230, 221, 202);
  doc.setFillColor(245, 239, 228);
  doc.roundedRect(margin, y, pageW - margin * 2, 76, 4, 4, 'FD');
  doc.setTextColor(196, 57, 46);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`${count}/${TOTAL_ITEMS}  ·  ${band.label.toUpperCase()}`, margin + 16, y + 22);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(106, 121, 147);
  doc.text(band.desc, margin + 16, y + 40, { maxWidth: pageW - margin * 2 - 32 });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(27, 42, 74);
  doc.text(`${pct}%`, pageW - margin - 16, y + 38, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(106, 121, 147);
  doc.text(`Maturity: ${band.levelLabel}`, pageW - margin - 16, y + 56, { align: 'right' });
  y += 96;

  if (milestone !== 'none') {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(27, 42, 74);
    doc.text('Focus stage', margin, y);
    y += 16;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(106, 121, 147);
    const noteLines = doc.splitTextToSize(MILESTONE_NOTES[milestone], pageW - margin * 2);
    doc.text(noteLines, margin, y);
    y += noteLines.length * 12 + 12;
  }

  // Section breakdown
  const scores = sectionScores(state);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(27, 42, 74);
  doc.text('Section breakdown', margin, y);
  y += 16;
  doc.setFontSize(10);
  for (const s of scores) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(196, 57, 46);
    doc.text(`${String(scores.indexOf(s) + 1).padStart(2, '0')}`, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(27, 42, 74);
    doc.text(s.name, margin + 22, y);
    doc.setTextColor(106, 121, 147);
    doc.text(`${s.checked}/${s.total}`, pageW - margin, y, { align: 'right' });
    doc.setDrawColor(230, 221, 202);
    doc.setFillColor(230, 221, 202);
    doc.roundedRect(margin, y + 5, pageW - margin * 2, 3, 1.5, 1.5, 'F');
    doc.setFillColor(27, 42, 74);
    doc.roundedRect(margin, y + 5, (pageW - margin * 2) * (s.pct / 100), 3, 1.5, 1.5, 'F');
    y += 22;
  }

  // Footer
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(138, 157, 199);
    doc.text(`Oblig · IT Governance Scorecard · Page ${i} of ${pages}`, pageW / 2, doc.internal.pageSize.getHeight() - 24, { align: 'center' });
  }
  doc.save('oblig-governance-scorecard.pdf');
}

/** Richer governance report PDF (used by dashboard/reports modules). */
export function exportGovernancePdf(data: {
  title: string;
  subtitle?: string;
  overall?: number;
  levelLabel?: string;
  perCategory?: { categoryName: string; score: number }[];
  recommendations?: { category: string; text: string; impact: string }[];
  bodyLines?: string[];
}) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 48;
  let y = margin;

  doc.setFillColor(27, 42, 74);
  doc.rect(0, 0, pageW, 64, 'F');
  doc.setTextColor(250, 247, 240);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Oblig', margin, 28);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('AI Governance Copilot', margin, 46);
  doc.setFontSize(9);
  doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), pageW - margin, 28, { align: 'right' });

  y = 92;
  doc.setTextColor(27, 42, 74);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(data.title, margin, y);
  y += 20;

  if (data.subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(106, 121, 147);
    doc.text(data.subtitle, margin, y, { maxWidth: pageW - margin * 2 });
    y += 16;
  }

  if (data.overall !== undefined) {
    doc.setDrawColor(230, 221, 202);
    doc.setFillColor(245, 239, 228);
    doc.roundedRect(margin, y, pageW - margin * 2, 70, 4, 4, 'FD');
    doc.setTextColor(106, 121, 147);
    doc.setFontSize(9);
    doc.text('OVERALL GOVERNANCE SCORE', margin + 16, y + 22);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(28);
    doc.setTextColor(27, 42, 74);
    doc.text(`${data.overall}/100`, margin + 16, y + 52);
    if (data.levelLabel) {
      doc.setFontSize(11);
      doc.setTextColor(196, 57, 46);
      doc.text(`Maturity: ${data.levelLabel}`, pageW - margin - 16, y + 52, { align: 'right' });
    }
    y += 90;
  }

  if (data.perCategory && data.perCategory.length) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(27, 42, 74);
    doc.text('Category Scores', margin, y);
    y += 18;
    doc.setFontSize(10);
    for (const c of data.perCategory) {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      doc.text(c.categoryName, margin, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(27, 42, 74);
      doc.text(`${c.score}%`, pageW - margin, y, { align: 'right' });
      doc.setDrawColor(230, 221, 202);
      doc.setFillColor(230, 221, 202);
      doc.roundedRect(margin, y + 6, pageW - margin * 2, 4, 2, 2, 'F');
      doc.setFillColor(27, 42, 74);
      doc.roundedRect(margin, y + 6, (pageW - margin * 2) * (c.score / 100), 4, 2, 2, 'F');
      y += 26;
    }
    y += 10;
  }

  if (data.recommendations && data.recommendations.length) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(27, 42, 74);
    doc.text('Recommendations', margin, y);
    y += 18;
    doc.setFontSize(10);
    for (const r of data.recommendations) {
      const lines = doc.splitTextToSize(`[${r.impact.toUpperCase()}] ${r.category} — ${r.text}`, pageW - margin * 2);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      doc.text(lines, margin, y);
      y += lines.length * 14 + 4;
    }
  }

  if (data.bodyLines && data.bodyLines.length) {
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(27, 42, 74);
    doc.text('Executive Summary', margin, y);
    y += 18;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    for (const line of data.bodyLines) {
      const lines = doc.splitTextToSize(line, pageW - margin * 2);
      if (y + lines.length * 14 > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(lines, margin, y);
      y += lines.length * 14 + 4;
    }
  }

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(138, 157, 199);
    doc.text(`Oblig Governance Report — Page ${i} of ${pages}`, pageW / 2, doc.internal.pageSize.getHeight() - 24, { align: 'center' });
  }
  doc.save(`${data.title.replace(/\s+/g, '-').toLowerCase()}-report.pdf`);
}
