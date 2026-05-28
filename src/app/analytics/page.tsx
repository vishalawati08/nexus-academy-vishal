"use client";

import Navbar from "@/components/Navbar";

const teamMembers = [
  {
    name: "Vishal",
    readiness: 78,
    modules: 3,
    simulation: 83,
    status: "Active",
  },

  {
    name: "Rahul",
    readiness: 91,
    modules: 5,
    simulation: 88,
    status: "Certified",
  },

  {
    name: "Sneha",
    readiness: 64,
    modules: 2,
    simulation: 71,
    status: "Learning",
  },

  {
    name: "Arjun",
    readiness: 52,
    modules: 1,
    simulation: 60,
    status: "Needs Support",
  },
];

export default function AnalyticsPage() {

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto p-10">

        {/* Header */}
        <div className="mb-12">

          <p className="text-blue-500 font-semibold mb-4 uppercase tracking-wide">
            Manager Intelligence Dashboard
          </p>

          <h1 className="text-6xl font-bold mb-6">
            Team Analytics
          </h1>

          <p className="text-zinc-400 text-xl max-w-4xl leading-9">
            Monitor onboarding readiness, competency progression,
            simulation performance, and Product Specialist certification metrics.
          </p>

        </div>

        {/* Top Metrics */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

            <p className="text-zinc-400 mb-3">
              Team Readiness
            </p>

            <h2 className="text-6xl font-bold">
              71%
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

            <p className="text-zinc-400 mb-3">
              Avg Simulation Score
            </p>

            <h2 className="text-6xl font-bold">
              75%
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

            <p className="text-zinc-400 mb-3">
              Certification Rate
            </p>

            <h2 className="text-6xl font-bold">
              62%
            </h2>

          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-7">

            <p className="text-zinc-400 mb-3">
              Onboarding Reduction
            </p>

            <h2 className="text-4xl font-bold">
              -40%
            </h2>

          </div>

        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">

            {/* Team Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <div className="flex items-center justify-between mb-8">

                <div>

                  <h2 className="text-3xl font-bold">
                    Team Progress
                  </h2>

                  <p className="text-zinc-500 mt-2">
                    Product Specialist onboarding analytics
                  </p>

                </div>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b border-zinc-800 text-zinc-500 text-left">

                      <th className="pb-4 font-medium">
                        Employee
                      </th>

                      <th className="pb-4 font-medium">
                        Readiness
                      </th>

                      <th className="pb-4 font-medium">
                        Modules
                      </th>

                      <th className="pb-4 font-medium">
                        Simulation
                      </th>

                      <th className="pb-4 font-medium">
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {teamMembers.map((member, index) => (

                      <tr
                        key={index}
                        className="border-b border-zinc-800/50"
                      >

                        <td className="py-5 font-semibold">
                          {member.name}
                        </td>

                        <td className="py-5">

                          <div className="flex items-center gap-3">

                            <div className="w-28 h-3 bg-zinc-800 rounded-full overflow-hidden">

                              <div
                                className="bg-blue-600 h-full"
                                style={{
                                  width: `${member.readiness}%`,
                                }}
                              />

                            </div>

                            <span>
                              {member.readiness}%
                            </span>

                          </div>

                        </td>

                        <td className="py-5">
                          {member.modules}
                        </td>

                        <td className="py-5">
                          {member.simulation}%
                        </td>

                        <td className="py-5">

                          <span className="bg-zinc-800 px-4 py-2 rounded-full text-sm">
                            {member.status}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            {/* Weak Areas */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-8">
                Weak Skill Areas
              </h2>

              <div className="space-y-6">

                <div>

                  <div className="flex justify-between mb-3">

                    <span>
                      Connector Selection
                    </span>

                    <span className="text-zinc-400">
                      48%
                    </span>

                  </div>

                  <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden">

                    <div
                      className="bg-red-500 h-full"
                      style={{ width: "48%" }}
                    />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-3">

                    <span>
                      Product Family Understanding
                    </span>

                    <span className="text-zinc-400">
                      66%
                    </span>

                  </div>

                  <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden">

                    <div
                      className="bg-yellow-500 h-full"
                      style={{ width: "66%" }}
                    />

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-3">

                    <span>
                      Application Analysis
                    </span>

                    <span className="text-zinc-400">
                      81%
                    </span>

                  </div>

                  <div className="w-full bg-zinc-800 rounded-full h-4 overflow-hidden">

                    <div
                      className="bg-green-500 h-full"
                      style={{ width: "81%" }}
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Right */}
          <div className="space-y-6">

            {/* Insights */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-8">
                AI Insights
              </h2>

              <div className="space-y-5">

                <div className="bg-black border border-zinc-800 rounded-2xl p-5">

                  <h3 className="text-xl font-semibold mb-3">
                    Recommendation
                  </h3>

                  <p className="text-zinc-400 leading-8">
                    Focus additional coaching on Connector Selection and application-based evaluations.
                  </p>

                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-5">

                  <h3 className="text-xl font-semibold mb-3">
                    Team Observation
                  </h3>

                  <p className="text-zinc-400 leading-8">
                    Simulation-based learning improved engineering reasoning scores by 32%.
                  </p>

                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-5">

                  <h3 className="text-xl font-semibold mb-3">
                    Certification Trend
                  </h3>

                  <p className="text-zinc-400 leading-8">
                    Product Family module completion rate increased significantly after guided mentoring activation.
                  </p>

                </div>

              </div>

            </div>

            {/* Impact */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <h2 className="text-3xl font-bold mb-8">
                Business Impact
              </h2>

              <div className="space-y-5">

                <div className="bg-black border border-zinc-800 rounded-2xl p-5">

                  <p className="text-zinc-500 text-sm mb-2">
                    Reduced Onboarding Time
                  </p>

                  <h3 className="text-4xl font-bold">
                    40%
                  </h3>

                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-5">

                  <p className="text-zinc-500 text-sm mb-2">
                    Assessment Accuracy
                  </p>

                  <h3 className="text-4xl font-bold">
                    91%
                  </h3>

                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-5">

                  <p className="text-zinc-500 text-sm mb-2">
                    Engagement Rate
                  </p>

                  <h3 className="text-4xl font-bold">
                    88%
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}