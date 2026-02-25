import { motion, AnimatePresence } from "framer-motion";
import { useMapStore } from "../../stores/mapStore";
import { X } from "lucide-react";
import { seedData } from "../../data/seedData";
import { NearThisPanel } from './NearThisPanel';
import { createPin } from '../../lib/api';

export function InspectorPanel() {
  const { inspectorOpen, selectedRoleSlug, selectRole } = useMapStore();
  const role = seedData.roles.find((r) => r.slug === selectedRoleSlug);
  const handlePin = async () => {
  await createPin({ targetType: 'role', targetId: role._id });
  // Optionally show a toast: "Saved to your pins ⭐"
};

  const close = () => useMapStore.setState({ inspectorOpen: false });

  return (
    <AnimatePresence>
      {inspectorOpen && role && (
        <motion.div
          initial={{ x: "100%" }} // starts off-screen to the right
          animate={{ x: 0 }} // slides to its natural position
          exit={{ x: "100%" }} // slides back out when closing
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 380,
            background: "var(--bg-surface)",
            borderLeft: "1px solid var(--border-subtle)",
            padding: 24,
            overflowY: "auto",
          }}
        >
          <button
            onClick={close}
            style={{ position: "absolute", top: 16, right: 16 }}
          >
            <X size={20} />
          </button>
          <h2 style={{ fontFamily: "Outfit" }}>{role.name}</h2>
          <p style={{ color: "var(--text-secondary)" }}>{role.description}</p>
          <h3>Trade-offs</h3>
          {role.tradeoffs.map((t) => (
            <div key={t}>• {t}</div>
          ))}
          <NearThisPanel currentRoleSlug={role.slug} industrySlug={role.industrySlug} />
          <button onClick={handlePin}>⭐ Pin this role</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
