import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useMapStore } from "../stores/mapStore";

export function HomePage() {
  const industries = useMapStore((s) => s.industries);

  const words = "Explore the terrain of tech work".split(" ");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-canvas)",
        padding: "80px 24px",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "Outfit",
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.1,
          }}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{ display: "inline-block", marginRight: "0.3em" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            color: "var(--text-secondary)",
            fontSize: 18,
            margin: "24px 0 40px",
            fontFamily: "Inter",
          }}
        >
          See how industries, roles, and tech stacks connect - with all the
          trade-offs laid bare.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          style={{ display: "flex", gap: 16, justifyContent: "center" }}
        >
          <Link to="/map">
            <button
              style={{
                padding: "12px 28px",
                background: "var(--accent-primary)",
                color: "white",
                border: "none",
                borderRadius: 99,
                fontFamily: "Outfit",
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              View Map -&gt;
            </button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          justifyContent: "center",
          maxWidth: 800,
          margin: "80px auto 0",
        }}
      >
        {industries.map((industry, i) => (
          <motion.div
            key={industry.slug}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5 + i * 0.08, type: "spring" }}
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/map" style={{ textDecoration: "none" }}>
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: industry.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontFamily: "Outfit",
                    fontSize: 13,
                    fontWeight: 600,
                    textAlign: "center",
                    padding: "0 12px",
                  }}
                >
                  {industry.name}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
