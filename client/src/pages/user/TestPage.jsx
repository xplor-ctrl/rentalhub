export default function TestPage() {
  return (
    <div
      style={{
        padding: "50px",
        backgroundColor: "lightblue",
        minHeight: "100vh",
        fontSize: "24px",
        fontWeight: "bold",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        TEST PAGE IS WORKING!
      </h1>
      <p>If you can see this, React Router is working correctly.</p>
      <p>The issue is not with routing.</p>

      <div
        style={{ marginTop: "30px", backgroundColor: "white", padding: "20px" }}
      >
        <h2>Debug Info:</h2>
        <p>Current URL: {window.location.href}</p>
        <p>Path: {window.location.pathname}</p>
      </div>
    </div>
  );
}
