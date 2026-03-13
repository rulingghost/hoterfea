import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const ModuleGrid = ({ modules, onSelectModule }) => {
  return (
    <section className="hub-content">
      <div className="hub-welcome">
        <h1>Hoş Geldiniz, Gökhan Bey</h1>
        <p>Bugün yapılması gereken 14 bekleyen işleminiz var.</p>
      </div>

      <div className="module-grid">
        {modules.map((module, index) => (
          <motion.div 
            key={module.id}
            className="module-card"
            onClick={() => onSelectModule(module.id)}
            whileHover={{ scale: 1.02, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.01 }}
          >
            <div className="module-icon" style={{ backgroundColor: `${module.color}15`, color: module.color }}>
              {module.icon}
              {module.count > 0 && <span className="module-badge" style={{ backgroundColor: module.color }}>{module.count}</span>}
            </div>
            <div className="module-info">
              <h3>{module.name}</h3>
              <span className="sub">Operasyonel takip</span>
            </div>
            <ChevronRight className="arrow" size={16}/>
          </motion.div>
        ))}
      </div>

      <style>{`
        .hub-content { padding: 40px; }
        .hub-welcome { margin-bottom: 40px; }
        .hub-welcome h1 { font-size: 28px; font-weight: 800; color: #1e293b; margin-bottom: 8px; }
        .hub-welcome p { color: #64748b; font-size: 15px; font-weight: 500; }

        .module-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .module-card {
           background: white; padding: 25px; border-radius: 20px; border: 1px solid #e2e8f0; display: flex; align-items: center; gap: 20px; cursor: pointer; transition: all 0.3s; position: relative;
        }
        .module-card:hover { border-color: #3b82f6; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); }

        .module-icon {
           width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; position: relative;
        }
        .module-badge {
           position: absolute; top: -5px; right: -5px; padding: 2px 8px; border-radius: 10px; color: white; font-size: 10px; font-weight: 800; border: 2px solid white;
        }

        .module-info h3 { font-size: 15px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
        .module-info .sub { font-size: 12px; color: #94a3b8; font-weight: 500; }

        .arrow { margin-left: auto; color: #cbd5e1; transition: 0.3s; }
        .module-card:hover .arrow { transform: translateX(5px); color: #3b82f6; }

        @media (max-width: 600px) {
           .module-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default ModuleGrid;
