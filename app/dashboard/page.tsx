"use client";

import React from 'react';
import MeetingRadarChart from '../components/MeetingRadarChart';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Meeting Radar Chart Section */}
      <div className="w-full">
        <MeetingRadarChart />
      </div>
      
      {/* Additional dashboard content can be added here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Meeting Analytics</h3>
          <p className="text-gray-300">Advanced insights into meeting participation patterns and speaking time distribution.</p>
        </div>
        
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-xl font-bold text-purple-400 mb-4">Participant Insights</h3>
          <p className="text-gray-300">Detailed analysis of individual participant engagement and contribution levels.</p>
        </div>
        
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-pink-500/30">
          <h3 className="text-xl font-bold text-pink-400 mb-4">Time Management</h3>
          <p className="text-gray-300">Optimize meeting efficiency with speaking time breakdowns and participation metrics.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
