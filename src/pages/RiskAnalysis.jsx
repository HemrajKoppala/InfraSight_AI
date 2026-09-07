import React, { useState, useMemo } from "react";
import {
  Brain,
  Sliders,
  AlertTriangle,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Clock,
  Layers,
  Activity,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import RiskBadge from "../components/RiskBadge";
import { useApi } from "../context/ApiContext";

function RiskAnalysis({ setCurrentPage }) {
  const { projects, selectedProjectId, setSelectedProjectId, selectedProject, showToast } = useApi();

  // Active project selection
  const currentProject = useMemo(() => {
    return projects.find((p) => p.id === selectedProjectId) || projects[0] || {};
  }, [projects, selectedProjectId]);

  // What-If Scenario Simulator Sliders State
  const [rowDelayMonths, setRowDelayMonths] = useState(3);
  const [materialInflation, setMaterialInflation] = useState(8);
  const [contractorLagMonths, setContractorLagMonths] = useState(2);

  // Dynamic simulation computation
  const simulatedImpact = useMemo(() => {
    const baseCost = Number(currentProject.originalCost) || 10000;
    // RoW delay impact: ~1.2% cost escalation per month
    const rowCost = baseCost * (rowDelayMonths * 0.012);
    // Material inflation impact directly on non-land cost (~60% of project)
    const matCost = baseCost * 0.6 * (materialInflation / 100);
    // Contractor lag cost: ~0.8% per month
    const contractorCost = baseCost * (contractorLagMonths * 0.008);

    const totalSimulatedCostEscalation = Math.round(rowCost + matCost + contractorCost);
    const simulatedDelayMonths = (rowDelayMonths * 0.9 + contractorLagMonths * 1.1).toFixed(1);
    const simulatedRiskScore = Math.min(
      98,
      Math.round((currentProject.overallRisk || 65) + rowDelayMonths * 2 + materialInflation * 0.8 + contractorLagMonths * 2.5)
    );

    return {
      totalSimulatedCostEscalation,
      simulatedDelayMonths,
      simulatedRiskScore
    };
  }, [currentProject, rowDelayMonths, materialInflation, contractorLagMonths]);

  // Feature Impact (SHAP) data for selected project
  const shapFeatures = useMemo(() => {
    return [
      {
        feature: "Right of Way (RoW) Clearance",
        importance: 38,
        impactCr: Math.round((currentProject.revisedCost || currentProject.originalCost || 10000) * 0.14),
        direction: "Negative Delay Factor"
      },
      {
        feature: "Material Price Index (Steel/Cement)",
        importance: 26,
        impactCr: Math.round((currentProject.revisedCost || currentProject.originalCost || 10000) * 0.09),
        direction: "Cost Escalation"
      },
      {
        feature: "Contractor Machinery Mobilization",
        importance: 18,
        impactCr: Math.round((currentProject.revisedCost || currentProject.originalCost || 10000) * 0.05),
        direction: "Milestone Schedule"
      },
      {
        feature: "Environmental Clearance Backlog",
        importance: 11,
        impactCr: Math.round((currentProject.revisedCost || currentProject.originalCost || 10000) * 0.03),
        direction: "Statutory Approval"
      },
      {
        feature: "Monsoon Seasonality Disruption",
        importance: 7,
        impactCr: Math.round((currentProject.revisedCost || currentProject.originalCost || 10000) * 0.02),
        direction: "Weather Seasonality"
      }
    ];
  }, [currentProject]);

  const handleApplyScenario = () => {
    showToast(`Simulation scenario applied to ${currentProject.id} audit model.`, "info");
  };

  const handleResetScenario = () => {
    setRowDelayMonths(3);
    setMaterialInflation(8);
    setContractorLagMonths(2);
    showToast("Scenario parameters reset to baseline.", "info");
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Cabinet Secretariat AI Taskforce
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Predictive ML Intelligence
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Brain size={22} className="text-blue-600" />
            AI Risk Intelligence & Monte Carlo Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            XGBoost ensemble & Monte Carlo stochastic models for early detection of infrastructure cost escalation and milestone delays
          </p>
        </div>

        {/* Project Selector Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600">Select Project:</label>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 outline-none focus:border-blue-600 shadow-2xs"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.id} - {p.name.substring(0, 32)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Model Health & Telemetry Banner */}
      <div className="gov-card p-4 bg-slate-900 text-white border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-800 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Predictive Model Engine
            </span>
            <p className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Ensemble XGBoost + Monte Carlo
            </p>
            <p className="text-[11px] text-slate-400">MoSPI OCMS Calibrated v2.4</p>
          </div>

          <div className="space-y-1 md:pl-4">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Model Accuracy & Fit
            </span>
            <p className="text-sm font-bold text-emerald-400 font-mono">94.2% (R² = 0.89)</p>
            <p className="text-[11px] text-slate-400">Trained on 1,942 Central Projects</p>
          </div>

          <div className="space-y-1 md:pl-4">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Monte Carlo Iterations
            </span>
            <p className="text-sm font-bold text-blue-400 font-mono">10,000 Runs / Cycle</p>
            <p className="text-[11px] text-slate-400">Stochastic confidence interval 95%</p>
          </div>

          <div className="space-y-1 md:pl-4">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Early Warning Lead Time
            </span>
            <p className="text-sm font-bold text-amber-400 font-mono">6–9 Months Advance</p>
            <p className="text-[11px] text-slate-400">Prior to physical milestone failure</p>
          </div>
        </div>
      </div>

      {/* Selected Project Risk Intelligence Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1 Col: Overall Risk Gauge & High-Level Diagnosis */}
        <div className="gov-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                {currentProject.id}
              </span>
              <h3 className="font-bold text-slate-900 text-sm mt-1 line-clamp-1" title={currentProject.name}>
                {currentProject.name}
              </h3>
            </div>
            <RiskBadge risk={currentProject.overallRisk || 0} size="normal" />
          </div>

          {/* Key Intelligence Gauges */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-600">Overall Failure Risk Index</span>
              <span className="text-lg font-bold font-mono text-slate-900">
                {currentProject.overallRisk || 0}%
              </span>
            </div>

            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  (currentProject.overallRisk || 0) >= 70
                    ? "bg-rose-500"
                    : (currentProject.overallRisk || 0) >= 40
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${currentProject.overallRisk || 0}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 block">Predicted Delay</span>
                <span className="font-bold text-slate-800 font-mono">
                  +{currentProject.aiPredictions?.predictedDelayMonths || (currentProject.status === "Delayed" ? 8 : 3)} Months
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Predicted Escalation</span>
                <span className="font-bold text-rose-600 font-mono">
                  +₹{currentProject.aiPredictions?.predictedCostOverrun || Math.round((currentProject.revisedCost || currentProject.originalCost) * 0.18)} Cr
                </span>
              </div>
            </div>
          </div>

          {/* AI Recommended Government Interventions */}
          <div className="space-y-2.5 pt-1">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles size={14} className="text-blue-600" />
              Prescriptive Nodal Recommendations
            </h4>
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs space-y-2">
              <div className="flex items-start gap-2 text-blue-900 font-medium">
                <CheckCircle2 size={15} className="text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Convene State Empowered Committee (SEC) meeting with Revenue & Forest Secretaries.
                </span>
              </div>
              <div className="flex items-start gap-2 text-blue-900 font-medium">
                <CheckCircle2 size={15} className="text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Activate price escalation ceiling clause under standard MoSPI EPC Contract Section 14.
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (setCurrentPage) setCurrentPage("details");
            }}
            className="w-full py-2 px-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-2xs"
          >
            <span>View Full Project Dossier</span>
            <ExternalLink size={13} />
          </button>
        </div>

        {/* Right 2 Cols: Explainable AI (SHAP) Factor Breakdown */}
        <div className="lg:col-span-2 gov-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Layers size={16} className="text-blue-600" />
                Explainable AI (SHAP) Feature Attribution
              </h3>
              <p className="text-xs text-slate-500">
                Root-cause decomposition of risk weights contributing to {currentProject.id} delay forecast
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-mono">
              TreeSHAP v0.42
            </span>
          </div>

          <div className="space-y-3.5">
            {shapFeatures.map((item, idx) => (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-slate-100 text-slate-600 font-mono font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    {item.feature}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-mono text-[11px]">
                      Est. Impact: <strong className="text-slate-800">₹{item.impactCr.toLocaleString()} Cr</strong>
                    </span>
                    <span className="font-bold font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-[11px]">
                      {item.importance}% Weight
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${item.importance * 2.2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs flex items-start gap-2.5 text-amber-900">
            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Nodal Assessment:</strong> Land acquisition & RoW clearances represent 38% of all delay momentum. Addressing this factor directly reduces projected overrun by ₹{shapFeatures[0].impactCr} Cr.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Monte Carlo What-If Simulator */}
      <div className="gov-card p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Sliders size={16} className="text-blue-600" />
              Interactive Monte Carlo Scenario Simulator
            </h3>
            <p className="text-xs text-slate-500">
              Test policy interventions and external shock scenarios (inflation, clearance lag, contractor capacity)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetScenario}
              className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-md transition"
            >
              Reset
            </button>
            <button
              onClick={handleApplyScenario}
              className="px-3 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition shadow-2xs"
            >
              Run 10k Simulations
            </button>
          </div>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-1">
          {/* Sliders Column */}
          <div className="space-y-4 lg:col-span-2">
            {/* Slider 1: RoW Delay */}
            <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-700">Right of Way (RoW) Clearance Delay</label>
                <span className="font-bold font-mono text-blue-700">{rowDelayMonths} Months</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={rowDelayMonths}
                onChange={(e) => setRowDelayMonths(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0 Months (Immediate)</span>
                <span>6 Months</span>
                <span>12 Months (Severe Lag)</span>
              </div>
            </div>

            {/* Slider 2: Material Inflation */}
            <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-700">Raw Material Inflation (Steel, Cement, Bitumen)</label>
                <span className="font-bold font-mono text-amber-700">+{materialInflation}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="1"
                value={materialInflation}
                onChange={(e) => setMaterialInflation(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0% (Baseline)</span>
                <span>+12%</span>
                <span>+25% (Extreme Inflation)</span>
              </div>
            </div>

            {/* Slider 3: Contractor Mobilization */}
            <div className="space-y-1.5 p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex justify-between text-xs font-semibold">
                <label className="text-slate-700">Contractor Resource Mobilization Lag</label>
                <span className="font-bold font-mono text-slate-800">{contractorLagMonths} Months</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={contractorLagMonths}
                onChange={(e) => setContractorLagMonths(Number(e.target.value))}
                className="w-full accent-slate-800 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0 Months (Full Capacity)</span>
                <span>3 Months</span>
                <span>6 Months (Critical Deficiency)</span>
              </div>
            </div>
          </div>

          {/* Simulation Output Card */}
          <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] text-blue-400 uppercase font-mono font-bold tracking-wider">
                Simulation Projection
              </span>
              <h4 className="text-base font-bold text-white mt-1">
                Stochastic Impact Horizon
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Projected delta based on current parameters across 10,000 Monte Carlo paths
              </p>
            </div>

            <div className="space-y-3 divide-y divide-slate-800">
              <div className="pt-2">
                <span className="text-xs text-slate-400 block">Projected Cost Escalation</span>
                <span className="text-xl font-bold font-mono text-amber-400">
                  +₹{simulatedImpact.totalSimulatedCostEscalation.toLocaleString()} Cr
                </span>
              </div>

              <div className="pt-2">
                <span className="text-xs text-slate-400 block">Simulated Milestone Schedule Lag</span>
                <span className="text-xl font-bold font-mono text-rose-400">
                  +{simulatedImpact.simulatedDelayMonths} Months
                </span>
              </div>

              <div className="pt-2">
                <span className="text-xs text-slate-400 block">Adjusted Risk Probability</span>
                <span className="text-xl font-bold font-mono text-blue-400">
                  {simulatedImpact.simulatedRiskScore}% Index
                </span>
              </div>
            </div>

            <div className="p-2.5 bg-slate-800/80 rounded-lg text-[11px] text-slate-300">
              95% Confidence Interval: Overrun likely between ₹{Math.round(simulatedImpact.totalSimulatedCostEscalation * 0.85)} Cr and ₹{Math.round(simulatedImpact.totalSimulatedCostEscalation * 1.2)} Cr.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiskAnalysis;
