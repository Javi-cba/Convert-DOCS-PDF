import React, { useEffect, useState } from 'react';
import { convertWordToPdf } from './services/apiConvert';

const Convertdoccpm = () => {
  const [UrlPdf, setUrlPdf] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);

  // Función para convertir un archivo a base64
  const fileToBase64 = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  };
  useEffect(() => {
    const handleDrop = async event => {
      // cuando se suelta un archivo
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      try {
        const { name, size, type } = file;
        setFileInfo({ name, size, type });

        const base64String = await fileToBase64(file);
        const resp = convertWordToPdf(base64String);
        setUrlPdf(resp.data.Files[0].Url);
      } catch (error) {
        console.error('Error al acceder al archivo:', error);
      }
    };

    // Manejador de eventos para cuando se arrastra un archivo sobre el área de soltar
    const handleDragOver = event => {
      event.preventDefault();
    };

    const dropArea = document.getElementById('dropArea');
    if (dropArea) {
      dropArea.addEventListener('dragover', handleDragOver);
      dropArea.addEventListener('drop', handleDrop);

      // Retornar una función de limpieza para remover los event listeners cuando el componente se desmonte
      return () => {
        dropArea.removeEventListener('dragover', handleDragOver);
        dropArea.removeEventListener('drop', handleDrop);
      };
    }
  }, []);
  return (
    <div className="container mt-3">
      <h2 className="text-white">Convertir WORD a PDF</h2>
      <p className="text-white">
        Convierte tus documentos WORD a PDF con la máxima calidad y exactamente
        igual que el archivo DOC o DOCX original.
      </p>
      <div className="row  mt-3">
        <div id="dropArea" className="col-4 inputfile text-white">
          Arrastra y suelta un archivo
        </div>
        {fileInfo && (
          <div className=" col-4 ">
            <div className="text-white border border-black rounded d-flex">
              <img
                className="imgArchivo p-2"
                alt="img"
                src="https://cdn.icon-icons.com/icons2/2036/PNG/512/blank_file_page_empty_document_icon_124196.png"
              />
              <div>
                <h5> {fileInfo.name}</h5>
                Tamaño: {fileInfo.size} bytes
              </div>
            </div>
            <button type="button" className="btn btn-primary m-2 rounded-pill">
              <a href={UrlPdf} className="linkDescargar">
                Descargar PDF
              </a>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Convertdoccpm;
