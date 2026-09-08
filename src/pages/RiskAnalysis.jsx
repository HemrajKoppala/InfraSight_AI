import React from "react";
import {
  Brain,
  Layers,
  ArrowRight,
  Sparkles,
  Info,
  ShieldAlert,
  ArrowUpRight,
  Database
} from "lucide-react";
import { useApi } from "../context/ApiContext";

function RiskAnalysis({ setCurrentPage }) {
  const { projects, selectedProjectId, setSelectedProjectId, selectedProject } = useApi();

  const currentProject = selectedProject || projects[0] || null;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Predictive Intelligence Layer
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              MoSPI OCMS Framework
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Brain size={22} className="text-blue-600" />
            Machine Learning Risk Diagnosis
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Predictive infrastructure delay and cost overrun risk assessment powered by ML models
          </p>
        </div>

        {projects.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Active Project:</span>
            <select
              value={selectedProjectId || currentProject?.id}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-800"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.id} - {p.name.substring(0, 28)}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Status Container: Risk Intelligence Unavailable Notice */}
      <div className="gov-card p-10 text-center space-y-4 max-w-3xl mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center mx-auto">
          <Brain size={32} />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-900">
            Risk intelligence unavailable
          </h2>
          <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
            Predictive machine learning models and SHAP explainability drivers are currently being finalized by the data science team. To preserve government audit integrity, frontend risk estimations are not synthesized.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-left text-xs space-y-3 max-w-xl mx-auto">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Database size={15} className="text-slate-600" />
            <span>FastAPI ML Contract Specification</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-normal">
            The frontend API layer is prepared to consume the upcoming ML endpoints once exposed:
          </p>
          <div className="font-mono text-[11px] bg-white p-3 rounded border border-slate-200 text-slate-700 space-y-1">
            <div><span className="text-blue-600 font-bold">GET</span> /api/projects/{`{project_id}`}/risk</div>
            <div className="text-slate-400 pl-4">↳ risk_score (0–100)</div>
            <div className="text-slate-400 pl-4">↳ risk_level (&quot;Low&quot; | &quot;Moderate&quot; | &quot;High&quot; | &quot;Critical&quot;)</div>
            <div className="text-slate-400 pl-4">↳ cost_overrun_probability (float)</div>
            <div className="text-slate-400 pl-4">↳ schedule_overrun_probability (float)</div>
            <div className="text-slate-400 pl-4">↳ confidence (float)</div>
            <div className="text-slate-400 pl-4">↳ explanations (SHAP feature attribution array)</div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => setCurrentPage("projects")}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition"
          >
            Return to Projects Repository
          </button>
        </div>
      </div>
    </div>
  );
}

export default RiskAnalysis;
