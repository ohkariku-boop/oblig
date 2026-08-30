import { describe, it, expect } from 'vitest';
import { QUESTIONNAIRE_QUESTIONS, type QuestionnaireContext } from '@/data/questionnaireQuestions';
import { itemKey } from '@/data/assessment';

const emptyCtx: QuestionnaireContext = { assessmentState: {}, policies: [], evidence: [], risks: [] };

describe('questionnaire auto-draft', () => {
  it('has exactly 50 questions', () => {
    expect(QUESTIONNAIRE_QUESTIONS.length).toBe(50);
  });

  it('every question has a unique id', () => {
    const ids = QUESTIONNAIRE_QUESTIONS.map(q => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('unmapped questions never claim a match, even with populated context', () => {
    const populated: QuestionnaireContext = {
      assessmentState: { 'anything': true },
      policies: [{ id: 'p1', title: 'Some Policy', type: 'x', status: 'draft', version: '1', updatedAt: '2026-01-01', owner: 'x', summary: '' }],
      evidence: [],
      risks: [],
    };
    const unmatched = QUESTIONNAIRE_QUESTIONS.filter(q => !q.answerFrom(emptyCtx).matched);
    unmatched.forEach(q => {
      expect(q.answerFrom(populated).matched).toBe(false);
    });
  });

  it('a checklist-mapped question reflects the real checked state', () => {
    const q = QUESTIONNAIRE_QUESTIONS.find(q => q.id === 'q19')!; // subcontractor item 0
    const before = q.answerFrom(emptyCtx);
    expect(before.matched).toBe(true);
    const checkedCtx: QuestionnaireContext = { ...emptyCtx, assessmentState: { [itemKey('subcontractor', 0)]: true } };
    const after = q.answerFrom(checkedCtx);
    expect(after.text).not.toBe(before.text);
    expect(after.text.startsWith('Yes.')).toBe(true);
  });

  it('a policy-mapped question only matches when a real policy title contains the keyword', () => {
    const q = QUESTIONNAIRE_QUESTIONS.find(q => q.id === 'q48')!; // AI governance policy
    expect(q.answerFrom(emptyCtx).matched).toBe(false);
    const withPolicy: QuestionnaireContext = {
      ...emptyCtx,
      policies: [{ id: 'p1', title: 'AI Governance & Model Risk Policy', type: 'x', status: 'draft', version: '0.4', updatedAt: '2026-01-01', owner: 'CTO', summary: '' }],
    };
    expect(q.answerFrom(withPolicy).matched).toBe(true);
  });

  it('framework coverage question always matches (real static data, not user-dependent)', () => {
    const q = QUESTIONNAIRE_QUESTIONS.find(q => q.id === 'q43')!;
    expect(q.answerFrom(emptyCtx).matched).toBe(true);
  });
});
