

import React from 'react';
import { StartupProvider } from '@/context/StartupContext';

export default function TrendingStartupsLayout({ children }: { children: React.ReactNode }) {
  return <StartupProvider>{children}</StartupProvider>;
}
