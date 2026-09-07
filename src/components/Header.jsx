import { Search, Bell, UserCircle } from "lucide-react";

function Header() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8">

      {/* Left */}

      <div>
        <p className="text-xs text-gray-500">
          Government of India
        </p>

        <h2 className="text-xl font-bold text-gray-800">
          Infrastructure & Project Monitoring
        </h2>
      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-2.5 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search projects..."
            className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
          />

        </div>

        <button className="relative">
          <Bell size={21} className="text-gray-600" />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <UserCircle
          size={30}
          className="text-gray-500"
        />

      </div>

    </header>
  );
}

export default Header;