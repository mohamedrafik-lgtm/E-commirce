import { useState } from "react";


function SingleFileUploader() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [filePaths, setFilePaths] = useState<string[]>([]);

  const bytesToKb = (bytes: number): number => {
    return Math.round(bytes / 1024); // تحويل البايت إلى Kbyte وتقريبه
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);

      const previewArray = fileArray.map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
        });
      });

      const pathArray = fileArray.map(file => URL.createObjectURL(file));

      Promise.all(previewArray).then(previewUrls => {
        setPreviews(previewUrls);
        setFilePaths(pathArray);

        // عرض حجم الصورة في ال Kbyte
        fileArray.forEach(file => {
          const kbSize = bytesToKb(file.size);
          console.log(`حجم الصورة: ${kbSize} KB`);
        });
      });
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) return;

    // Replace the following URL with your actual API endpoint
    const uploadUrl = 'YOUR_API_ENDPOINT_HERE';

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleRemoveImage = (index: number) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);

    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);

    const newFilePaths = [...filePaths];
    newFilePaths.splice(index, 1);
    setFilePaths(newFilePaths);
  };

  return (
    <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Upload Images</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden">
            <img src={preview} alt={`Selected ${index}`} className="w-full h-40 object-cover" />
            <div className="absolute top-2 right-2">
              <button
                onClick={() => handleRemoveImage(index)}
                className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white px-2 py-1 text-sm">
              {filePaths[index]}
            </div>
            <div className="absolute bottom-2 left-2 bg-gray-800 bg-opacity-75 text-white px-2 py-1 rounded-md">
              {bytesToKb(selectedFiles[index].size)} KB
            </div>
            <div className="absolute top-6 left-2 transform -translate-y-1/2 bg-green-500 text-white font-semibold py-1 px-2 rounded-full">
              Selected
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <label htmlFor="fileInput" className="cursor-pointer bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Select Images
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          onClick={handleUpload}
          className={`ml-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 ${selectedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={selectedFiles.length === 0}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default SingleFileUploader;