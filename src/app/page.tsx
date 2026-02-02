import TaskClient from "./client/TaskClient";

export default function Home() {
  return (
    <div style={{
      maxWidth: 480,
      margin: "40px auto",
      padding: 24,
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "#fafafa",
      borderRadius: 12,
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>
        TT Challenge
      </h1>

      <TaskClient />
    </div>
  );
}
