import React, { useState } from "react";
import {
  Brain,
  Cpu,
  Activity,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Layers,
  FileCheck,
  RefreshCw,
  Info,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const SHAP_GLOBAL_FEATURES = [
  { feature: "RoW & Land Acquisition Handover Latency", impact: 38.4, category: "Statutory" },
  { feature: "Forest & Eco-Sensitive Zone Clearance Gap", impact: 26.2, category: "Regulatory" },
  { feature: "Contractor Working Capital & Equipment Capacity", impact: 16.8, category: "Execution" },
  { feature: "Material Inflation Index (Steel, Bitumen, Cement)", impact: 11.2, category: "Economic" },
  { feature: "Monsoon Downtime vs Baseline Historical Rainfall", impact: 7.4, category: "Environmental" },
];

export default function ModelPerformance() {
  return (
    <div className="space-y-4 font-sans text-slate-800">
      {/* Top Header */}
      <div className="bg-white border border-slate-300 rounded-xs p-3.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-0.5">
            <span>MoSPI Central Sector</span>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Decision Support Architecture</span>
          </div>
          <h2 className="text-base font-extrabold text-[#0b2240] flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-900" />
            <span>Predictive Machine Learning Engine & Model Explainability (SHAP)</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-slate-100 text-slate-700 border border-slate-300 px-2.5 py-1 rounded-xs font-mono font-medium">
            Production Pipeline v2.4 | XGBoost + LightGBM
          </span>
        </div>
      </div>

      {/* Model Cards / Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Cost Escalation Regressor (XGBoost) */}
        <div className="bg-white border border-slate-300 rounded-xs p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-900 rounded-xs uppercase">
                Model Card 1
              </span>
              <h3 className="text-xs font-bold text-slate-900 mt-1 uppercase">
                Cost Escalation Forecasting Model (XGBoost Regressor)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 border border-emerald-300 bg-emerald-50 px-2 py-0.5 rounded-xs">
              Calibrated
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            Predicts anticipated final project cost escalation (%) based on cumulative expenditure
            velocity, milestone variance, and contractor financial strain.
          </p>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-50 border border-slate-200 p-2 rounded-xs">
              <div className="text-[10px] text-slate-500">Mean Abs Error (MAE)</div>
              <div className="font-mono font-bold text-slate-900 text-sm">3.8%</div>
              <div className="text-[9px] text-emerald-700">Benchmark: &lt;5%</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-2 rounded-xs">
              <div className="text-[10px] text-slate-500">RMSE</div>
              <div className="font-mono font-bold text-slate-900 text-sm">5.2%</div>
              <div className="text-[9px] text-slate-500">Low Outlier Bias</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-2 rounded-xs">
              <div className="text-[10px] text-slate-500">R² Variance Score</div>
              <div className="font-mono font-bold text-blue-900 text-sm">0.89</div>
              <div className="text-[9px] text-emerald-700">High Reliability</div>
            </div>
          </div>
        </div>

        {/* Card 2: Schedule Slippage Classifier (LightGBM) */}
        <div className="bg-white border border-slate-300 rounded-xs p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-100 text-indigo-900 rounded-xs uppercase">
                Model Card 2
              </span>
              <h3 className="text-xs font-bold text-slate-900 mt-1 uppercase">
                Schedule Slippage Classifier (LightGBM Early Warning)
              </h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 border border-emerald-300 bg-emerald-50 px-2 py-0.5 rounded-xs">
              Calibrated
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            Classifies risk tier (Critical / High / Medium / Low) of milestone slippage exceeding 6
            months prior to formal inter-ministerial delay declaration.
          </p>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-50 border border-slate-200 p-2 rounded-xs">
              <div className="text-[10px] text-slate-500">ROC - AUC</div>
              <div className="font-mono font-bold text-blue-900 text-sm">0.932</div>
              <div className="text-[9px] text-emerald-700">Exceptional Discrim.</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-2 rounded-xs">
              <div className="text-[10px] text-slate-500">Recall (Sensitivity)</div>
              <div className="font-mono font-bold text-red-700 text-sm">94.6%</div>
              <div className="text-[9px] text-slate-500">Catches Overruns</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-2 rounded-xs">
              <div className="text-[10px] text-slate-500">F1 - Score</div>
              <div className="font-mono font-bold text-slate-900 text-sm">0.930</div>
              <div className="text-[9px] text-emerald-700">Balanced Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* SHAP Global Feature Importance */}
      <div className="bg-white border border-slate-300 rounded-xs p-4 shadow-2xs">
        <div className="border-b border-slate-200 pb-2 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-blue-900" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              SHAP Global Feature Importance (Root Cause Contribution %)
            </h3>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Trained on 14 Years of MoSPI Central Sector Records (2012 - 2026)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Table */}
          <div className="lg:col-span-6 overflow-x-auto border border-slate-300 rounded-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#0b2240] text-white text-[11px] font-semibold">
                <tr>
                  <th className="p-2 border-r border-slate-700">Risk Feature Factor</th>
                  <th className="p-2 border-r border-slate-700 w-28 text-center">Category</th>
                  <th className="p-2 text-right w-28">Mean |SHAP|</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {SHAP_GLOBAL_FEATURES.map((f, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                    <td className="p-2 font-medium text-slate-900 border-r border-slate-200">
                      {f.feature}
                    </td>
                    <td className="p-2 text-center text-slate-500 font-mono text-[10px] border-r border-slate-200">
                      {f.category}
                    </td>
                    <td className="p-2 text-right font-mono font-bold text-blue-950">
                      +{f.impact}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bar chart */}
          <div className="lg:col-span-6 border border-slate-200 rounded-xs p-3 bg-slate-50/50">
            <div className="text-xs font-bold text-slate-800 mb-2">
              Relative Feature Attribution Impact (%)
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={SHAP_GLOBAL_FEATURES}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 10, fill: "#475569" }} unit="%" />
                  <YAxis
                    type="category"
                    dataKey="category"
                    tick={{ fontSize: 10, fill: "#475569" }}
                    width={80}
                  />
                  <RechartsTooltip
                    formatter={(val) => [`+${val}% Impact`, "SHAP Weight"]}
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderColor: "#94a3b8",
                      fontSize: "11px",
                    }}
                  />
                  <Bar dataKey="impact" name="Attribution Impact" fill="#0b2240" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Model Governance & Drift Monitoring */}
      <div className="bg-white border border-slate-300 rounded-xs p-4 shadow-2xs">
        <div className="border-b border-slate-200 pb-2 mb-2 flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Model Governance, Calibration & Retraining Protocol
          </h4>
          <span className="text-[11px] text-slate-500 font-mono">Status: PASS (No Drift)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div className="border border-slate-200 rounded-xs p-2.5 bg-slate-50">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">
              Population Stability Index (PSI)
            </div>
            <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">0.042</div>
            <p className="text-[10px] text-slate-600 mt-1">
              PSI &lt; 0.1 indicates zero significant feature drift across reporting cycles.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xs p-2.5 bg-slate-50">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">
              Automated Re-training Trigger
            </div>
            <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
              Monthly Batch Synchronized
            </div>
            <p className="text-[10px] text-slate-600 mt-1">
              Triggered upon MoSPI IPMIS Flash Report final closure on the 5th of each month.
            </p>
          </div>

          <div className="border border-slate-200 rounded-xs p-2.5 bg-slate-50">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">
              Explainability Standard
            </div>
            <div className="font-mono font-bold text-slate-900 text-sm mt-0.5">
              TreeSHAP Exact Formulation
            </div>
            <p className="text-[10px] text-slate-600 mt-1">
              Guarantees efficiency and additivity for Cabinet Secretariat audit requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
