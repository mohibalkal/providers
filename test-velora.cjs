async function testVelora() {
  console.log("Testing Velora API directly...");
  try {
    const params = new URLSearchParams({
      tmdbId: "533535",
      type: "movie",
    });
    // In velora.ts: ...O.params is also passed. We need to see what O.params are.
    // O is generated from i9(y, W, _, c). Let's just try basic params first.
    const res = await fetch("https://stream.fontaine.lol/velora?" + params.toString(), {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response:", text);
  } catch (err) {
    console.error("Error:", err.message);
  }
}
testVelora();
