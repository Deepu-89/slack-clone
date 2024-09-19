import React from "react";
import ThemeProvider from "@/providers/theme-provider";
import MainContent from "@/components/ui/workspace/main-content";
import { ColorPrefrencesProvider } from "@/providers/color-preferences-provider";
function WorkSpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <body>
      <ThemeProvider>
        <ColorPrefrencesProvider>
          <MainContent>{children}</MainContent>
        </ColorPrefrencesProvider>
      </ThemeProvider>
    </body>
  );
}

export default WorkSpaceLayout;
