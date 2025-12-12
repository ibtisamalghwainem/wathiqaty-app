import React, { useState } from "react";

/* ====== تحويل الملف إلى Base64 ====== */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // ناخذ الجزء بعد "data:image/..."
      resolve(result.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function callGoogleVision(base64Image: string, apiKey: string) {
  const response = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
          },
        ],
      }),
    }
  );
  const result = await response.json();
  return result.responses?.[0]?.fullTextAnnotation?.text || "";
}

export default function GoogleOCR() {
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const apiKey = "AIzaSyAulvWuyFQQKXsMkSa5W4a8o9-5K_wHCu0";

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setLoading(true);

    try {
      const base64Image = await fileToBase64(file);
      const text = await callGoogleVision(base64Image, apiKey);
      setRawText(text);
    } catch (err) {
      console.error("OCR Error:", err);
      setRawText("فشل في قراءة النص");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>📄 اختبار Google Vision OCR</h2>
      <input type="file" accept="image/*" onChange={onFile} />
      {fileName && <p>الملف: {fileName}</p>}
      {loading && <p>جارِ القراءة...</p>}

      {rawText && (
        <div style={{ marginTop: 16 }}>
          <h4>النص المستخرج (خام):</h4>
          <pre style={{ background: "#f9f9f9", padding: 10 }}>{rawText}</pre>
        </div>
      )}
    </div>
  );
}
