import { useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/hero/Hero";
import { PresetExplorer } from "./components/presets/PresetExplorer";
import { CommandBuilder } from "./components/generator/CommandBuilder";
import { LearnExplainer } from "./components/features/LearnExplainer";
import { CapabilityMatrixViewer } from "./components/features/CapabilityMatrixViewer";
import { ArchitectureShowcase } from "./components/features/ArchitectureShowcase";
import { AgentsMdExplainer } from "./components/features/AgentsMdExplainer";
import { DocViewer } from "./components/docs/DocViewer";
import { Footer } from "./components/layout/Footer";
import type { PresetDefinition } from "./types/preset";
import "./App.css";

export default function App() {
  const [selectedPresetForBuilder, setSelectedPresetForBuilder] =
    useState<PresetDefinition | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectPresetForBuilder = (preset: PresetDefinition) => {
    setSelectedPresetForBuilder(preset);
    scrollToSection("generator");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090a0f] text-zinc-100 selection:bg-emerald-950 selection:text-emerald-300">
      <Navbar onNavigate={scrollToSection} />
      <main className="flex-1">
        <Hero onScrollTo={scrollToSection} />
        <PresetExplorer onSelectPresetForBuilder={handleSelectPresetForBuilder} />
        <CommandBuilder
          key={selectedPresetForBuilder?.name || "default-builder"}
          initialPreset={selectedPresetForBuilder}
        />
        <LearnExplainer />
        <CapabilityMatrixViewer />
        <ArchitectureShowcase />
        <AgentsMdExplainer />
        <DocViewer />
      </main>
      <Footer />
    </div>
  );
}
