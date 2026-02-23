import React from "react";

const Journey = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-10">
      
      {/* === DESKTOP TIMELINE === */}
      <div className="hidden md:block relative">
        
        {/* Center Line - Only on desktop */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-white/40 -translate-x-1/2"></div>

        {/* Checkpoints - Only on desktop */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-purple-900"></div>
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-purple-900"></div>
        <div className="absolute left-1/2 top-2/4 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-purple-900"></div>
        <div className="absolute left-1/2 top-3/4 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-purple-900"></div>

        {/* === DESKTOP CARDS WITH ALTERNATING LAYOUT === */}
        
        {/* CARD 1 - LEFT */}
        <div className="grid grid-cols-2 gap-8 mb-20">
          <div className="flex justify-end pr-8">
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-md border border-white/10 max-w-md">
              <p className="text-white font-bold text-xl">Mobile apps in action</p>
              <p className="text-purple-300 font-medium mt-2">Built cross-platform applications using Flutter, integrating complex features like GPS tracking, camera, microphone access, and real-time data syncing with APIs.</p>
              <div className="mt-4">
                <p className="text-white font-bold">Key highlights:</p>
                <ul className="text-purple-300 font-medium space-y-2 list-disc pl-5 mt-2">
                  <li>End-to-end development from UI to backend integration</li>
                  <li>Experience with FastAPI/MySQL for data management</li>
                  <li>Optimized for resource efficiency and responsiveness</li>
                </ul>
              </div>
            </div>
          </div>
          <div></div> {/* Empty column for right side */}
        </div>

        {/* CARD 2 - RIGHT */}
        <div className="grid grid-cols-2 gap-8 mb-20">
          <div></div> {/* Empty column for left side */}
          <div className="flex justify-start pl-8">
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-md border border-white/10 max-w-md">
              <p className="text-white font-bold text-xl">Secure Systems for the Internet of Things</p>
              <p className="text-purple-300 font-medium mt-2">Implemented multi-authentication mechanisms using Mutually Orthogonal Latin Squares (MOLS) to enhance IoT security.</p>
              <div className="mt-4">
                <p className="text-white font-bold">Key highlights:</p>
                <ul className="text-purple-300 font-medium space-y-2 list-disc pl-5 mt-2">
                  <li>Developed authentication protocols for IoT devices</li>
                  <li>Conducted security analysis and performance evaluations</li>
                  <li>Applied combinatorial mathematics to practical engineering problems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3 - LEFT */}
        <div className="grid grid-cols-2 gap-8 mb-20">
          <div className="flex justify-end pr-8">
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-md border border-white/10 max-w-md">
              <p className="text-white font-bold text-xl">Web & Backend Integration</p>
              <p className="text-purple-300 font-medium mt-2">Designed and deployed dynamic web applications with seamless backend integration. Skilled in managing databases, APIs, and user authentication flows.</p>
              <div className="mt-4">
                <p className="text-white font-bold">Key highlights:</p>
                <ul className="text-purple-300 font-medium space-y-2 list-disc pl-5 mt-2">
                  <li>FastAPI and MySQL for server-side logic and data storage</li>
                  <li>API creation and consumption for mobile/web interoperability</li>
                  <li>Focus on clean, maintainable code and rapid prototyping</li>
                </ul>
              </div>
            </div>
          </div>
          <div></div>
        </div>

        {/* CARD 4 - RIGHT */}
        <div className="grid grid-cols-2 gap-8">
          <div></div>
          <div className="flex justify-start pl-8">
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-md border border-white/10 max-w-md">
              <p className="text-white font-bold text-xl">Innovating for Real-World Challenges</p>
              <p className="text-purple-300 font-medium mt-2">Developed solutions that bridge gaps between user needs and technology, such as language preservation tools and interactive dashboards.</p>
              <div className="mt-4">
                <p className="text-white font-bold">Key highlights:</p>
                <ul className="text-purple-300 font-medium space-y-2 list-disc pl-5 mt-2">
                  <li>UX-focused development for diverse user groups</li>
                  <li>Data handling for multimedia inputs (photos, audio, GPS)</li>
                  <li>Rapid experimentation to validate ideas and improve outcomes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* === MOBILE LAYOUT (simplified) === */}
      <div className="md:hidden space-y-8">
        
        {/* MOBILE CARD 1 */}
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-md border border-white/10">
          <p className="text-white font-bold text-xl">Mobile apps in action</p>
          <p className="text-purple-300 font-medium mt-2">Built cross-platform applications using Flutter, integrating complex features like GPS tracking, camera, microphone access, and real-time data syncing with APIs.</p>
          <div className="mt-4">
            <p className="text-white font-bold">Key highlights:</p>
            <ul className="text-purple-300 font-medium space-y-2 list-disc pl-5 mt-2">
              <li>End-to-end development from UI to backend integration</li>
              <li>Experience with FastAPI/MySQL for data management</li>
              <li>Optimized for resource efficiency and responsiveness</li>
            </ul>
          </div>
        </div>

        {/* MOBILE CARD 2 */}
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-md border border-white/10">
          <p className="text-white font-bold text-xl">Secure Systems for the Internet of Things</p>
          <p className="text-purple-300 font-medium mt-2">Implemented multi-authentication mechanisms using Mutually Orthogonal Latin Squares (MOLS) to enhance IoT security.</p>
          <div className="mt-4">
            <p className="text-white font-bold">Key highlights:</p>
            <ul className="text-purple-300 font-medium space-y-2 list-disc pl-5 mt-2">
              <li>Developed authentication protocols for IoT devices</li>
              <li>Conducted security analysis and performance evaluations</li>
              <li>Applied combinatorial mathematics to practical engineering problems</li>
            </ul>
          </div>
        </div>

        {/* MOBILE CARD 3 */}
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-md border border-white/10">
          <p className="text-white font-bold text-xl">Web & Backend Integration</p>
          <p className="text-purple-300 font-medium mt-2">Designed and deployed dynamic web applications with seamless backend integration. Skilled in managing databases, APIs, and user authentication flows.</p>
          <div className="mt-4">
            <p className="text-white font-bold">Key highlights:</p>
            <ul className="text-purple-300 font-medium space-y-2 list-disc pl-5 mt-2">
              <li>FastAPI and MySQL for server-side logic and data storage</li>
              <li>API creation and consumption for mobile/web interoperability</li>
              <li>Focus on clean, maintainable code and rapid prototyping</li>
            </ul>
          </div>
        </div>

        {/* MOBILE CARD 4 */}
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-md border border-white/10">
          <p className="text-white font-bold text-xl">Innovating for Real-World Challenges</p>
          <p className="text-purple-300 font-medium mt-2">Developed solutions that bridge gaps between user needs and technology, such as language preservation tools and interactive dashboards.</p>
          <div className="mt-4">
            <p className="text-white font-bold">Key highlights:</p>
            <ul className="text-purple-300 font-medium space-y-2 list-disc pl-5 mt-2">
              <li>UX-focused development for diverse user groups</li>
              <li>Data handling for multimedia inputs (photos, audio, GPS)</li>
              <li>Rapid experimentation to validate ideas and improve outcomes</li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Journey;