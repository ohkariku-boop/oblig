import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/theme';
import { AuthProvider } from '@/lib/AuthContext';
import { ToastProvider } from '@/lib/ToastContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppLayout } from '@/components/AppLayout';
import { HomePage } from '@/pages/HomePage';
import { AuthPage } from '@/pages/AuthPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { AssessmentPage } from '@/pages/AssessmentPage';
import { CopilotPage } from '@/pages/CopilotPage';
import { PoliciesPage } from '@/pages/PoliciesPage';
import { RiskPage } from '@/pages/RiskPage';
import { RoadmapPage } from '@/pages/RoadmapPage';
import { CompliancePage } from '@/pages/CompliancePage';
import { EvidencePage } from '@/pages/EvidencePage';
import { ReportsPage } from '@/pages/ReportsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { PricingPage } from '@/pages/PricingPage';
import { TermsPage } from '@/pages/TermsPage';
import { PrivacyPage } from '@/pages/PrivacyPage';

export default function App() {
  return (
    <ErrorBoundary>
    <ThemeProvider>
      <AuthProvider>
      <ToastProvider>
      <BrowserRouter basename="/oblig">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/app" element={<AppLayout><DashboardPage /></AppLayout>} />
          <Route path="/app/assessment" element={<AppLayout><AssessmentPage /></AppLayout>} />
          <Route path="/app/copilot" element={<AppLayout><CopilotPage /></AppLayout>} />
          <Route path="/app/policies" element={<AppLayout><PoliciesPage /></AppLayout>} />
          <Route path="/app/risk" element={<AppLayout><RiskPage /></AppLayout>} />
          <Route path="/app/roadmap" element={<AppLayout><RoadmapPage /></AppLayout>} />
          <Route path="/app/compliance" element={<AppLayout><CompliancePage /></AppLayout>} />
          <Route path="/app/evidence" element={<AppLayout><EvidencePage /></AppLayout>} />
          <Route path="/app/reports" element={<AppLayout><ReportsPage /></AppLayout>} />
          <Route path="/app/settings" element={<AppLayout><SettingsPage /></AppLayout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
    </ErrorBoundary>
  );
}
