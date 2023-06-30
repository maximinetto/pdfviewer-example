import { LocalizationMap, Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import es_ES from "@react-pdf-viewer/locales/lib/es_ES.json";
import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return setError("No se ha podido subir el pdf");
    files.length > 0 && setUrl(URL.createObjectURL(files[0]));
  };

  return (
    <div style={{ width: "100vh" }}>
      <form action="">
        <input type="file" accept=".pdf" onChange={onChange} />
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div style={{ height: "750px", width: "100%" }}>
          {url ? (
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.3)",
                height: "100%",
                width: "100%",
              }}
            >
              <Viewer
                fileUrl={url}
                localization={es_ES as unknown as LocalizationMap}
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          ) : (
            <div
              style={{
                alignItems: "center",
                border: "2px dashed rgba(0, 0, 0, .3)",
                display: "flex",
                fontSize: "2rem",
                height: "100%",
                justifyContent: "center",
                width: "100%",
              }}
            >
              Vista previa
            </div>
          )}
        </div>
      </Worker>
    </div>
  );
}

export default App;
