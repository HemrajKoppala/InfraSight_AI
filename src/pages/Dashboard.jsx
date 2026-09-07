import {
  IndianRupee,
  FolderKanban,
  TrendingUp,
  AlertTriangle,
  Brain,
  ArrowRight
} from "lucide-react";

import StatCard from "../components/StatCard";
import RiskBadge from "../components/RiskBadge";
import { projects } from "../data/projects";

function Dashboard({ setCurrentPage }) {

  const totalOriginal = projects.reduce(
    (sum, p) => sum + p.originalCost,
    0
  );

  const totalRevised = projects.reduce(
    (sum, p) => sum + p.revisedCost,
    0
  );

  const totalExpenditure = projects.reduce(
    (sum, p) => sum + p.expenditure,
    0
  );

  const highRiskProjects = projects.filter(
    p => p.overallRisk >= 70
  );

  return (
    <div className="p-8">

      {/* Page Title */}

      <div className="mb-6">

        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Overview of infrastructure project implementation and AI-based risk intelligence
        </p>

      </div>


      {/* Filters */}

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">

        <div className="flex items-center justify-between mb-4">

          <h3 className="font-semibold text-gray-700">
            Project Filters
          </h3>

          <button className="text-sm text-blue-600 hover:underline">
            Reset Filters
          </button>

        </div>

        <div className="grid grid-cols-4 gap-4">

          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Sectors</option>
            <option>Road Transport</option>
            <option>Railways</option>
            <option>Energy</option>
            <option>Water Resources</option>
            <option>Urban Transport</option>
          </select>

          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Ministries</option>
            <option>Ministry of Railways</option>
            <option>Ministry of Power</option>
            <option>Ministry of Jal Shakti</option>
          </select>

          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All States / UTs</option>
            <option>Karnataka</option>
            <option>Tamil Nadu</option>
            <option>Rajasthan</option>
            <option>Uttar Pradesh</option>
            <option>Telangana</option>
          </select>

          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
            <option>All Project Costs</option>
            <option>Below ₹500 Cr</option>
            <option>₹500–1000 Cr</option>
            <option>Above ₹1000 Cr</option>
          </select>

        </div>

      </div>


      {/* KPI Cards */}

      <div className="grid grid-cols-4 gap-5 mb-6">

        <StatCard
          title="Project Count"
          value={projects.length}
          subtitle="Projects being monitored"
          icon={<FolderKanban size={22} />}
        />

        <StatCard
          title="Original Approved Cost"
          value={`₹${totalOriginal.toLocaleString()} Cr`}
          subtitle="Total original project cost"
          icon={<IndianRupee size={22} />}
        />

        <StatCard
          title="Latest Revised Cost"
          value={`₹${totalRevised.toLocaleString()} Cr`}
          subtitle="Current estimated cost"
          type="warning"
          icon={<TrendingUp size={22} />}
        />

        <StatCard
          title="Cumulative Expenditure"
          value={`₹${totalExpenditure.toLocaleString()} Cr`}
          subtitle="Total expenditure"
          icon={<IndianRupee size={22} />}
        />

      </div>


      {/* Main Grid */}

      <div className="grid grid-cols-3 gap-6 mb-6">

        {/* Sector Distribution */}

        <div className="col-span-2 bg-white border border-gray-200 rounded-lg p-5">

          <div className="flex justify-between items-center mb-5">

            <div>
              <h3 className="font-semibold text-gray-800">
                Sector-wise Distribution
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Projects by infrastructure sector
              </p>
            </div>

          </div>

          <div className="space-y-5">

            {projects.map((project) => (

              <div key={project.id}>

                <div className="flex justify-between text-sm mb-1">

                  <span className="text-gray-600">
                    {project.sector}
                  </span>

                  <span className="font-semibold">
                    1 project
                  </span>

                </div>

                <div className="w-full bg-gray-100 h-2 rounded-full">

                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${Math.max(
                        20,
                        project.physicalProgress
                      )}%`
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* AI Summary */}

        <div className="bg-white border border-gray-200 rounded-lg p-5">

          <div className="flex items-center gap-2 mb-5">

            <Brain
              size={21}
              className="text-blue-600"
            />

            <h3 className="font-semibold text-gray-800">
              AI Risk Intelligence
            </h3>

          </div>


          <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">

            <div className="flex items-center gap-2">

              <AlertTriangle
                size={19}
                className="text-red-600"
              />

              <span className="font-semibold text-red-700">
                {highRiskProjects.length} High Risk Projects
              </span>

            </div>

            <p className="text-xs text-gray-600 mt-2">
              Projects predicted to have significant cost or schedule risk.
            </p>

          </div>


          <div className="space-y-3">

            <div className="flex justify-between text-sm">
              <span>Cost Risk</span>
              <span className="font-semibold">
                82%
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Schedule Risk</span>
              <span className="font-semibold">
                76%
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Projects requiring attention</span>
              <span className="font-semibold">
                {highRiskProjects.length}
              </span>
            </div>

          </div>


          <button
            onClick={() => setCurrentPage("ai")}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-md text-sm font-medium hover:bg-blue-700"
          >
            View AI Analysis

            <ArrowRight size={16} />

          </button>

        </div>

      </div>


      {/* Project Table */}

      <div className="bg-white border border-gray-200 rounded-lg">

        <div className="p-5 border-b border-gray-200 flex justify-between">

          <div>

            <h3 className="font-semibold text-gray-800">
              Project Monitoring
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Current implementation status
            </p>

          </div>

          <button
            onClick={() => setCurrentPage("projects")}
            className="text-sm text-blue-600 flex items-center gap-1"
          >
            View All
            <ArrowRight size={15} />
          </button>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 text-gray-600">

              <tr>

                <th className="text-left px-5 py-3 font-semibold">
                  Sector
                </th>

                <th className="text-left px-5 py-3 font-semibold">
                  Ministry
                </th>

                <th className="text-left px-5 py-3 font-semibold">
                  Project
                </th>

                <th className="text-right px-5 py-3 font-semibold">
                  Original Cost
                </th>

                <th className="text-right px-5 py-3 font-semibold">
                  Revised Cost
                </th>

                <th className="text-center px-5 py-3 font-semibold">
                  Progress
                </th>

                <th className="text-center px-5 py-3 font-semibold">
                  AI Risk
                </th>

              </tr>

            </thead>


            <tbody>

              {projects.map((project) => (

                <tr
                  key={project.id}
                  className="border-t border-gray-100 hover:bg-gray-50"
                >

                  <td className="px-5 py-4">
                    {project.sector}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {project.ministry}
                  </td>

                  <td className="px-5 py-4">

                    <div className="font-medium text-gray-800">
                      {project.name}
                    </div>

                    <div className="text-xs text-gray-400 mt-1">
                      {project.id}
                    </div>

                  </td>

                  <td className="px-5 py-4 text-right">
                    ₹{project.originalCost.toLocaleString()} Cr
                  </td>

                  <td className="px-5 py-4 text-right">
                    ₹{project.revisedCost.toLocaleString()} Cr
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      <div className="w-20 bg-gray-100 rounded-full h-2">

                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${project.physicalProgress}%`
                          }}
                        />

                      </div>

                      <span className="text-xs">
                        {project.physicalProgress}%
                      </span>

                    </div>

                  </td>

                  <td className="px-5 py-4 text-center">
                    <RiskBadge risk={project.overallRisk} />
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {/* Prototype Notice */}

      <div className="mt-5 text-xs text-gray-400">
        * Prototype interface inspired by the public infrastructure project
        monitoring workflow. Project records shown here are synthetic demo data.
      </div>

    </div>
  );
}

export default Dashboard;