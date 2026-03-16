import React, { useState } from 'react';
import Sidebar from './Sidebar';
import FleetDashboard from './Fleet';
import ExecutiveDashboard from './Executive';
import OperationsDashboard from './Operations';
import InventoryDashboard from './Inventory';
import FinanceDashboard from './Finance';

export default function App() {
  const [activeTab, setActiveTab] = useState('executive');

  const renderDashboard = () => {
    switch(activeTab) {
      case 'fleet':
        return <FleetDashboard />;

      case 'operations':
        return <OperationsDashboard />;
      case 'inventory':
        return <InventoryDashboard />;
      case 'finance':
        return <FinanceDashboard />;
      default:
        return <ExecutiveDashboard />;

    }
  };

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1">
        {renderDashboard()}
      </div>
    </div>
  );
}