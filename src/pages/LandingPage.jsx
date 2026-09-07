import {
    ArrowRight,
    Brain,
    ChartNoAxesCombined,
    CircleAlert,
    ShieldCheck,
    TrendingUp,
    Clock3,
    IndianRupee,
    Activity
} from "lucide-react";

function LandingPage({ onEnter }) {
    return (
        <div className="min-h-screen bg-white text-gray-800">

            {/* ================= HEADER ================= */}

            <header className="border-b border-gray-200 bg-white">

                <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

                    {/* Logo */}

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                            IN
                        </div>

                        <div>
                            <h1 className="font-bold text-lg">
                                InfraSight AI
                            </h1>

                            <p className="text-xs text-gray-500">
                                Infrastructure Project Intelligence
                            </p>
                        </div>

                    </div>


                    {/* Navigation */}

                    <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">

                        <a href="#about" className="hover:text-blue-700">
                            About
                        </a>

                        <a href="#features" className="hover:text-blue-700">
                            Features
                        </a>

                        <a href="#how" className="hover:text-blue-700">
                            How It Works
                        </a>

                        <a href="#intelligence" className="hover:text-blue-700">
                            AI Intelligence
                        </a>

                    </nav>


                    {/* Login */}

                    <button
                        onClick={onEnter}
                        className="border border-blue-600 text-blue-700 px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-50"
                    >
                        Login
                    </button>

                </div>

            </header>


            {/* ================= HERO ================= */}

            <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">

                <div className="max-w-7xl mx-auto px-8 py-20">

                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        {/* Hero Text */}

                        <div>

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-6">

                                <Activity size={14} />

                                SMART INFRASTRUCTURE MONITORING

                            </div>


                            <h2 className="text-5xl font-bold leading-tight text-gray-900">

                                Predict project risks
                                <span className="text-blue-700">
                                    {" "}before they become problems.
                                </span>

                            </h2>


                            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-xl">

                                InfraSight AI adds predictive intelligence to infrastructure
                                project monitoring — helping decision makers identify
                                potential cost overruns, schedule delays and implementation
                                risks early.

                            </p>


                            {/* Buttons */}

                            <div className="flex items-center gap-4 mt-8">

                                <button
                                    onClick={onEnter}
                                    className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800"
                                >

                                    Explore Dashboard

                                    <ArrowRight size={18} />

                                </button>


                                <a
                                    href="#how"
                                    className="px-6 py-3 border border-gray-300 rounded-md font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Learn More
                                </a>

                            </div>


                            {/* Trust text */}

                            <div className="mt-8 flex items-center gap-3 text-sm text-gray-500">

                                <ShieldCheck
                                    size={19}
                                    className="text-green-600"
                                />

                                <span>
                                    Designed for data-driven infrastructure governance
                                </span>

                            </div>

                        </div>


                        {/* ================= AI CARD ================= */}

                        <div className="relative">

                            {/* Background decoration */}

                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60" />

                            <div className="relative bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">

                                {/* Card Header */}

                                <div className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">

                                    <div className="flex items-center gap-2">

                                        <Brain size={19} />

                                        <span className="font-semibold">
                                            AI Risk Intelligence
                                        </span>

                                    </div>

                                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                                        LIVE ANALYSIS
                                    </span>

                                </div>


                                {/* Project */}

                                <div className="p-6">

                                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                                        Project
                                    </p>

                                    <h3 className="font-bold text-lg mt-1">
                                        Urban Metro Expansion Phase II
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Tamil Nadu • Urban Transport
                                    </p>


                                    {/* Risk */}

                                    <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg">

                                        <div className="flex justify-between items-center">

                                            <div className="flex items-center gap-2">

                                                <CircleAlert
                                                    size={20}
                                                    className="text-red-600"
                                                />

                                                <span className="font-semibold text-red-700">
                                                    High Risk
                                                </span>

                                            </div>

                                            <span className="text-2xl font-bold text-red-700">
                                                90%
                                            </span>

                                        </div>

                                        <p className="text-xs text-gray-600 mt-2">
                                            AI prediction indicates significant implementation
                                            risk.
                                        </p>

                                    </div>


                                    {/* Predictions */}

                                    <div className="grid grid-cols-2 gap-4 mt-5">

                                        <div className="border border-gray-200 rounded-lg p-4">

                                            <div className="flex items-center gap-2 text-gray-500 text-xs">

                                                <IndianRupee size={15} />

                                                COST RISK

                                            </div>

                                            <p className="text-xl font-bold mt-2">
                                                89%
                                            </p>

                                            <p className="text-xs text-red-600 mt-1">
                                                Potential escalation
                                            </p>

                                        </div>


                                        <div className="border border-gray-200 rounded-lg p-4">

                                            <div className="flex items-center gap-2 text-gray-500 text-xs">

                                                <Clock3 size={15} />

                                                DELAY RISK

                                            </div>

                                            <p className="text-xl font-bold mt-2">
                                                91%
                                            </p>

                                            <p className="text-xs text-red-600 mt-1">
                                                Potential delay
                                            </p>

                                        </div>

                                    </div>


                                    {/* Risk Factors */}

                                    <div className="mt-5">

                                        <p className="text-xs font-semibold text-gray-500 uppercase">
                                            Top Risk Factors
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-3">

                                            <span className="text-xs px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full">
                                                Land acquisition
                                            </span>

                                            <span className="text-xs px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full">
                                                Cost escalation
                                            </span>

                                            <span className="text-xs px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full">
                                                Milestone slippage
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= STATS ================= */}

            <section className="border-y border-gray-200 bg-white">

                <div className="max-w-7xl mx-auto px-8 py-8">

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

                        <div className="text-center">

                            <p className="text-3xl font-bold text-gray-900">
                                1,900+
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                Projects Monitored*
                            </p>

                        </div>


                        <div className="text-center border-l border-gray-200">

                            <p className="text-3xl font-bold text-gray-900">
                                20+
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                Infrastructure Sectors
                            </p>

                        </div>


                        <div className="text-center border-l border-gray-200">

                            <p className="text-3xl font-bold text-gray-900">
                                AI
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                Predictive Intelligence
                            </p>

                        </div>


                        <div className="text-center border-l border-gray-200">

                            <p className="text-3xl font-bold text-gray-900">
                                24/7
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                Risk Visibility
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= HOW IT WORKS ================= */}

            <section
                id="how"
                className="py-20 bg-gray-50"
            >

                <div className="max-w-7xl mx-auto px-8">

                    <div className="text-center max-w-2xl mx-auto">

                        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                            How It Works
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-3">
                            From monitoring to proactive action
                        </h2>

                        <p className="text-gray-500 mt-4">
                            InfraSight AI transforms project monitoring data into
                            actionable predictive intelligence.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-4 gap-6 mt-12">

                        {/* 01 */}

                        <div className="bg-white border border-gray-200 rounded-lg p-6">

                            <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold">
                                01
                            </div>

                            <h3 className="font-bold text-lg mt-5">
                                Monitor
                            </h3>

                            <p className="text-sm text-gray-500 leading-6 mt-2">
                                Track project cost, expenditure, physical progress,
                                milestones and timelines.
                            </p>

                        </div>


                        {/* 02 */}

                        <div className="bg-white border border-gray-200 rounded-lg p-6">

                            <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold">
                                02
                            </div>

                            <h3 className="font-bold text-lg mt-5">
                                Predict
                            </h3>

                            <p className="text-sm text-gray-500 leading-6 mt-2">
                                Machine learning models estimate future cost and
                                schedule overrun risks.
                            </p>

                        </div>


                        {/* 03 */}

                        <div className="bg-white border border-gray-200 rounded-lg p-6">

                            <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold">
                                03
                            </div>

                            <h3 className="font-bold text-lg mt-5">
                                Explain
                            </h3>

                            <p className="text-sm text-gray-500 leading-6 mt-2">
                                Understand why a project is at risk using explainable
                                AI and key risk factors.
                            </p>

                        </div>


                        {/* 04 */}

                        <div className="bg-white border border-gray-200 rounded-lg p-6">

                            <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold">
                                04
                            </div>

                            <h3 className="font-bold text-lg mt-5">
                                Act
                            </h3>

                            <p className="text-sm text-gray-500 leading-6 mt-2">
                                Generate early warnings so responsible teams can
                                prioritize intervention.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= FEATURES ================= */}

            <section
                id="features"
                className="py-20 bg-white"
            >

                <div className="max-w-7xl mx-auto px-8">

                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        <div>

                            <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                                Predictive Intelligence
                            </p>

                            <h2 className="text-3xl font-bold text-gray-900 mt-3">
                                Go beyond monitoring.
                                <br />
                                Understand what comes next.
                            </h2>

                            <p className="text-gray-500 leading-7 mt-5">
                                Traditional monitoring tells you what is happening.
                                InfraSight AI adds a predictive layer that helps identify
                                what could happen next.
                            </p>


                            <div className="space-y-5 mt-8">

                                <div className="flex gap-4">

                                    <div className="w-10 h-10 shrink-0 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center">
                                        <TrendingUp size={19} />
                                    </div>

                                    <div>

                                        <h3 className="font-semibold">
                                            Cost Overrun Prediction
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Estimate the likelihood and magnitude of future
                                            project cost escalation.
                                        </p>

                                    </div>

                                </div>


                                <div className="flex gap-4">

                                    <div className="w-10 h-10 shrink-0 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center">
                                        <Clock3 size={19} />
                                    </div>

                                    <div>

                                        <h3 className="font-semibold">
                                            Schedule Delay Prediction
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Identify projects showing patterns associated
                                            with future completion delays.
                                        </p>

                                    </div>

                                </div>


                                <div className="flex gap-4">

                                    <div className="w-10 h-10 shrink-0 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center">
                                        <ChartNoAxesCombined size={19} />
                                    </div>

                                    <div>

                                        <h3 className="font-semibold">
                                            Portfolio Risk Analytics
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Compare project risks across sectors, ministries
                                            and states.
                                        </p>

                                    </div>

                                </div>


                                <div className="flex gap-4">

                                    <div className="w-10 h-10 shrink-0 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center">
                                        <CircleAlert size={19} />
                                    </div>

                                    <div>

                                        <h3 className="font-semibold">
                                            Early Warning System
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Prioritize projects that require timely attention.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Intelligence Visualization */}

                        <div
                            id="intelligence"
                            className="bg-gray-900 rounded-xl p-8 text-white"
                        >

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <Brain size={20} />
                                </div>

                                <div>

                                    <p className="font-semibold">
                                        Project Intelligence
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Predictive analysis
                                    </p>

                                </div>

                            </div>


                            <div className="mt-8">

                                <div className="flex justify-between text-sm">

                                    <span className="text-gray-400">
                                        Overall Risk
                                    </span>

                                    <span className="font-bold">
                                        82%
                                    </span>

                                </div>

                                <div className="h-3 bg-gray-700 rounded-full mt-3">

                                    <div
                                        className="h-3 bg-red-500 rounded-full"
                                        style={{ width: "82%" }}
                                    />

                                </div>

                            </div>


                            <div className="grid grid-cols-2 gap-4 mt-8">

                                <div className="bg-white/5 border border-white/10 rounded-lg p-5">

                                    <IndianRupee
                                        size={20}
                                        className="text-orange-400"
                                    />

                                    <p className="text-gray-400 text-xs mt-3">
                                        COST RISK
                                    </p>

                                    <p className="text-2xl font-bold mt-1">
                                        82%
                                    </p>

                                </div>


                                <div className="bg-white/5 border border-white/10 rounded-lg p-5">

                                    <Clock3
                                        size={20}
                                        className="text-yellow-400"
                                    />

                                    <p className="text-gray-400 text-xs mt-3">
                                        DELAY RISK
                                    </p>

                                    <p className="text-2xl font-bold mt-1">
                                        76%
                                    </p>

                                </div>

                            </div>


                            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">

                                <p className="text-xs text-red-300 uppercase">
                                    AI Early Warning
                                </p>

                                <p className="text-sm mt-2">
                                    Project shows increasing cost and milestone slippage
                                    patterns.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}

            <section className="bg-blue-700 py-16">

                <div className="max-w-5xl mx-auto px-8 text-center text-white">

                    <Brain className="mx-auto mb-5" size={34} />

                    <h2 className="text-3xl font-bold">
                        Make infrastructure monitoring proactive.
                    </h2>

                    <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
                        Identify emerging risks, understand their causes and
                        prioritize projects before problems become critical.
                    </p>

                    <button
                        onClick={onEnter}
                        className="mt-7 bg-white text-blue-700 px-7 py-3 rounded-md font-semibold hover:bg-blue-50 inline-flex items-center gap-2"
                    >

                        Enter Project Dashboard

                        <ArrowRight size={18} />

                    </button>

                </div>

            </section>


            {/* ================= FOOTER ================= */}

            <footer className="bg-gray-950 text-gray-400">

                <div className="max-w-7xl mx-auto px-8 py-10">

                    <div className="flex flex-col md:flex-row justify-between gap-8">

                        <div>

                            <div className="flex items-center gap-3">

                                <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
                                    IN
                                </div>

                                <span className="text-white font-semibold">
                                    InfraSight AI
                                </span>

                            </div>

                            <p className="text-sm mt-4 max-w-md">
                                Predictive infrastructure project monitoring and
                                early warning intelligence.
                            </p>

                        </div>


                        <div className="text-sm">

                            <p className="text-gray-300 font-semibold">
                                Platform
                            </p>

                            <p className="mt-3">
                                Project Monitoring
                            </p>

                            <p className="mt-2">
                                AI Risk Intelligence
                            </p>

                            <p className="mt-2">
                                Early Warnings
                            </p>

                        </div>


                        <div className="text-sm">

                            <p className="text-gray-300 font-semibold">
                                Information
                            </p>

                            <p className="mt-3">
                                About the Platform
                            </p>

                            <p className="mt-2">
                                Documentation
                            </p>

                            <p className="mt-2">
                                Contact
                            </p>

                        </div>

                    </div>


                    <div className="border-t border-gray-800 mt-8 pt-6 text-xs flex justify-between">

                        <span>
                            © 2026 InfraSight AI — Prototype
                        </span>

                        <span>
                            SIH 2026
                        </span>

                    </div>

                </div>

            </footer>


            {/* Prototype disclaimer */}

            <div className="bg-gray-950 text-center text-[11px] text-gray-500 pb-5">
                This is a prototype developed for demonstration purposes.
                It is not an official Government of India application.
            </div>

        </div>
    );
}

export default LandingPage;