import "./App.css";
import { useState } from "react";
import { CloudUpload } from "@mui/icons-material";

function App() {
  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [output, setOutput] = useState("Please Upload Your File");
  const [steps, setSteps] = useState({
    test_1: "",
    test_2: "",
    test_3: "",
  });
  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setTimeout(() => {
        Scan();
      }, 1000);
    }
  };
  const Scan = () => {
    setScanning(true);
    setOutput("");
    setSteps({
      test_1: "Scanning...",
      test_2: "Scanning...",
      test_3: "Scaning...",
    });

    setTimeout(() => {
      setSteps((prev) => ({ ...prev, test_1: "Success" }));
      setOutput((prev) => prev + "Test 1: Validation Success\n");
    }, 2000);

    setTimeout(() => {
      setSteps((prev) => ({ ...prev, test_2: "Success" }));
      setOutput((prev) => prev + "Test 2: Validation Success\n");
    }, 5000);

    setTimeout(() => {
      setSteps((prev) => ({ ...prev, test_3: "Success" }));
      setOutput((prev) => prev + "Test 3: Validation Success\n");
      setScanning(false);
    }, 10000);
  };
  return (
    <>
      <div>
        <div className="flex  p-8 gap-6 bg-gray-100">
          <div className="flex-1 bg-white rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
            <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
              <input
                type="file"
                accept=".pdf, image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {file ? (
                file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="uploaded preview"
                    className="absolute inset-0 object-contain w-full h-full z-0"
                  />
                ) : (
                  <div className="z-10 text-center text-gray-700 font-medium">
                    {file.name}
                  </div>
                )
              ) : (
                !file && (
                  <>
                    <CloudUpload fontSize="large" className="z-10" />
                    <p className="text-gray-500 z-10">
                      Drop your file or click to select
                    </p>
                  </>
                )
              )}
            </label>
            {scanning && (
              <div className="absolute top-1 left-0 h-2 w-full bg-blue-500 animate-scanLine"></div>
            )}
          </div>
          <div className="w-1/3 flex flex-col gap-4">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Validation Summary</h2>
              <div className="flex flex-col gap-2">
                <div className="bg-gray-100 p-2 rounded flex justify-between">
                  <span>Test 1</span>
                  <span>{steps.test_1}</span>
                </div>
                <div className="bg-gray-100 p-2 rounded flex justify-between">
                  <span>Test 2</span>
                  <span>{steps.test_2}</span>
                </div>
                <div className="bg-gray-100 p-2 rounded flex justify-between">
                  <span>Test 3</span>
                  <span>{steps.test_3}</span>
                </div>
              </div>
            </div>
            <div className="bg-black text-green-500 font-mono p-4 rounded-xl h-64 overflow-auto whitespace-pre">
              {output}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
