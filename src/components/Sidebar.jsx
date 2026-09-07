import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Brain,
  TriangleAlert,
  FileText
} from "lucide-react";

function Sidebar({ currentPage, setCurrentPage }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard
    },
    {
      id: "projects",
      label: "Projects",
      icon: FolderKanban
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3
    },
    {
      id: "ai",
      label: "AI Intelligence",
      icon: Brain
    },
    {
      id: "alerts",
      label: "Early Warnings",
      icon: TriangleAlert
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText
    }
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 fixed left-0 top-0">

      {/* Government Header */}
      <div className="px-5 py-5 border-b border-gray-200">
        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
            IN
          </div>

          <div>
            <h1 className="font-bold text-gray-800">
              InfraSight AI
            </h1>

            <p className="text-xs text-gray-500">
              Project Monitoring
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}

      <div className="px-3 py-5">

        <p className="text-xs font-semibold text-gray-400 uppercase px-3 mb-3">
          Main Menu
        </p>

        <nav className="space-y-1">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-sm transition ${
                  currentPage === item.id
                    ? "bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />

                <span>
                  {item.label}
                </span>

              </button>
            );
          })}

        </nav>

      </div>

      {/* AI Box */}

      <div className="absolute bottom-5 left-4 right-4">

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">

          <div className="flex items-center gap-2 mb-2">
            <Brain size={18} className="text-blue-600" />

            <span className="font-semibold text-sm text-blue-800">
              AI Monitoring
            </span>
          </div>

          <p className="text-xs text-gray-600 leading-5">
            Predict future cost and schedule risks before they become critical.
          </p>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;