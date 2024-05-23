import ControlPointIcon from '@mui/icons-material/ControlPoint';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Slider from '@mui/material/Slider';
import { Camera } from './Camera';
import { Photo } from './Photo';
import './ImageDetectionForm.css';
import ExportModelModal from '../ExportModelModal';
import Webcam from 'react-webcam';
import axios from 'axios';
import { drawMesh } from "./utilities";

const ImageDetectionForm = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [forms, setForms] = useState([{ id: 1, name: 'Имя 1', photos: [] }]);
  const [formIdCounter, setFormIdCounter] = useState(2);
  const [showCamera, setShowCamera] = useState(false);
  const [checked, setChecked] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [classMapping, setClassMapping] = useState({});
  const [freezeCamera, setFreezeCamera] = useState(false);
  const [socket, setSocket] = useState(null);
  const [videoStopped, setVideoStopped] = useState(false);
  const [recognizedPeople, setRecognizedPeople] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [uploadedTxtFiles, setUploadedTxtFiles] = useState([]);
  const [classNames, setClassNames] = useState('');
  const [batchSize, setBatchSize] = useState(16);
  const [numEpochs, setNumEpochs] = useState(35);
  const [trainSize, setTrainSize] = useState(0.7);
  const [modelSize, setModelSize] = useState('nano');
  const [augmentationFlag, setAugmentationFlag] = useState(false);
  const [gpuFlag, setGpuFlag] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modelDownloadUrl, setModelDownloadUrl] = useState('');

  const hyperParametersDescription = {
    batchSize: `Размер пакета для обучения. Определяет, сколько примеров данных будет обработано за одну итерацию.
      Размер пакета - один из важнейших гиперпараметров в обучении глубокому обучению, который представляет собой количество образцов, используемых в одном прямом и обратном проходе через сеть, и оказывает непосредственное влияние на точность и вычислительную эффективность процесса обучения. Размер партии можно рассматривать как компромисс между точностью и скоростью. Большие объемы партий могут ускорить процесс обучения, но могут привести к снижению точности и чрезмерной подгонке, в то время как меньшие объемы партий могут обеспечить более высокую точность, но могут быть вычислительно дорогими и отнимать много времени.
      Размер партии также может повлиять на сходимость модели, то есть повлиять на процесс оптимизации и скорость обучения модели. Небольшие партии могут быть более восприимчивы к случайным колебаниям обучающих данных, в то время как большие партии более устойчивы к этим колебаниям, но могут сходиться медленнее.
      Важно отметить, что не существует универсального ответа, когда речь идет о выборе размера партии, поскольку идеальный размер зависит от нескольких факторов, включая размер обучающего набора данных, сложность модели и доступные вычислительные ресурсы.`,
    trainSize: `Пропорция изображений для обучения. (От 0 до 1)`,
    numEpochs: `Количество эпох для обучения. Определяет, сколько раз модель будет проходить через весь обучающий набор данных.`,
    modelSize: `Размер модели для обучения. Определяет, какой размер модели будет использоваться.
      Размер модели определяет количество параметров в нейронной сети, что влияет на ее сложность и производительность. Большие модели могут иметь большее количество параметров, что может привести к более высокой точности, но также требует больше вычислительных ресурсов. Маленькие модели могут быть более компактными и быстрыми, но могут иметь меньшую точность.`,
    gpuFlag: `Использование GPU для обучения. Указывает, будет ли обучение выполняться на GPU.
      GPU обладает большей вычислительной мощностью по сравнению с CPU и может значительно ускорить процесс обучения нейронных сетей, особенно для крупных моделей и больших объемов данных. Однако это требует наличия совместимого с GPU оборудования и дополнительной конфигурации.`
  };

  const handleSavePhotos = (formId, photos) => {
    setUploadedPhotos((prevPhotos) => [
      ...prevPhotos,
      { formId, photos },
    ]);
  };

  const handleSaveTxtFiles = (formId, txtFiles) => {
    setUploadedTxtFiles((prevTxtFiles) => [
      ...prevTxtFiles,
      { formId, txtFiles },
    ]);
  };




  const deletePhoto = (formId, photoIndex) => {
    setForms(prevForms => {
      return prevForms.map(form => {
        if (form.id === formId) {
          form.photos.splice(photoIndex, 1);
        }
        return form;
      });
    });
  };


  const runFaceDetectorModel = async () => {

    // const model = await blazeface.load()
    console.log("FaceDetection Model is Loaded..")
    setInterval(() => {
      // detect(model);
      detect("")
    }, 800);

  }

  const detect = async () => {
    if (
      !freezeCamera &&
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4 &&
      socket &&
      socket.readyState === WebSocket.OPEN
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      const classNamesParam = classNames.split(',').map(name => `names=${name.trim()}`).join('&');

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      var imageSrc = webcamRef.current.getScreenshot()
      var apiCall = {
        event: "localhost:subscribe",
        data: {
          'image': imageSrc
        },
      };
      socket.send(JSON.stringify(apiCall));
      // getWebSocket().send(JSON.stringify(apiCall))

      // getWebSocket().onmessage 
      socket.onmessage = function (event) {
        console.log(event.data)
        try {
          var predictions = JSON.parse(event.data)
          var bbox = predictions[0]["coordinates"]
          var name = predictions[0]["cls"]
          const ctx = canvasRef.current.getContext("2d");
          requestAnimationFrame(() => { drawMesh(predictions, ctx) });
        } catch (error) {
          console.log(error)
        }
      };

    }
  };

  function dataURItoBlob(dataURI) {
    const splitDataURI = dataURI.split(',');
    const type = splitDataURI[0].split(':')[1].split(';')[0];
    const byteString = atob(splitDataURI[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const intArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      intArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: type });
  }


  const sendJSON = async () => {

    const formData = new FormData();

    uploadedPhotos.forEach((uploadedPhoto) => {
      const blob = dataURItoBlob(uploadedPhoto.photos.src);
      const file = new File([blob], `${uploadedPhoto.photos.name}`, { type: 'image/jpg' });
      formData.append(`files`, file);
    });

    uploadedTxtFiles.forEach((uploadedTxtFile) => {
      const blob = new Blob([uploadedTxtFile.txtFiles.content], { type: 'text/plain' });
      const file = new File([blob], `${uploadedTxtFile.txtFiles.name}`, { type: 'text/plain' });
      formData.append(`files`, file);
    });

    // formData.append('batchSize', batchSize);
    // formData.append('numEpochs', numEpochs);
    // formData.append('trainSize', trainSize);
    // formData.append('modelSize', modelSize);
    // formData.append('gpuFlag', gpuFlag);

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    const classNamesParam = classNames.split(',').map(name => `names=${name.trim()}`).join('&');

    console.log(classNamesParam)
    // Отправляем данные на бэкенд
    const apiUrl = `http://0.0.0.0:8888/api/cv/train/detection/train-model?user_id=1&${classNamesParam}`; // как посылать uid
    try {

      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log('Response:', response.data);

      setShowCamera(true);
      const socket = new WebSocket(`ws://0.0.0.0:8888/api/cv/train/ws/detection/predict/1`)
      setSocket(socket);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    if (webcamRef.current) {
      if (videoStopped) {
        webcamRef.current.video.pause(); // Приостанавливаем видео
      } else {
        webcamRef.current.video.play(); // Запускаем видео
      }
    }
  }, [videoStopped]);

  useEffect(() => {
    if (showCamera) {
      runFaceDetectorModel();
    }
  }, [showCamera], []);

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const disableButtons = uploadedPhotos.length < 1 || uploadedTxtFiles.length < 1 || classNames.length < 1;

  const formatDescription = (description) => {
    return description.split('\n').map((paragraph, index) => (
      <React.Fragment key={index}>
        <p>{paragraph}</p>
        {index !== description.split('\n').length - 1 && <br />} {/* Добавляем <br />, если это не последний абзац */}
      </React.Fragment>
    ));
  };

  const renderDescriptionTooltip = (paramName) => {
    return (
      <div className="tooltip">
        <FontAwesomeIcon icon={faQuestionCircle} className="question-icon" />
        <span className="tooltiptext">{formatDescription(hyperParametersDescription[paramName])}</span>
      </div>
    );
  };

  const handleExportModel = () => {
    // Generate model download URL and show modal
    const downloadUrl = 'http://example.com/path_to_model';
    setModelDownloadUrl(downloadUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const codeExample = `
  import tensorflow as tf
  
  # Load the model
  model = tf.keras.models.load_model('path/to/your/model')
  
  # Use the model for predictions
  predictions = model.predict(your_data)
    `;

  return (
    <React.Fragment>
      <div className='text-to-show'>
        Функционал обучения собственных моделей на мобильных устройствах не доступен. Переключитесь, пожалуйста, на ПК.
      </div>
      <div className="hide">
        <div className='horizontal'>
          <div>
            {forms.map(form => (
              <div key={form.id}>
                {/* <Photo photos={form.photos} formId={form.id} deletePhoto={deletePhoto} /> */}
                <Camera formId={form.id} formName={form.name} handleSavePhotos={handleSavePhotos} handleSaveTxtFiles={handleSaveTxtFiles} setClassNames={setClassNames} />
              </div>
            ))}
          </div>
          <div className='train-model-card'>
            <div className='heading'>Обучение</div>
            <button className='train-model-btn' onClick={sendJSON} disabled={disableButtons}>Обучить модель</button>
            <div className='horizontal-line' />
            <div className="advanced-options">
              <button className="advanced-options-btn" onClick={() => setShowOptions(!showOptions)}>Продвинутые возможности <FontAwesomeIcon icon={showOptions ? faChevronUp : faChevronDown} /></button>
              {showOptions && (
                <div className="advanced-options-content">
                  <div className='name-and-hint'>
                    <label htmlFor="modelSize" className="param-label">Размер модели</label>
                    {renderDescriptionTooltip('modelSize')}
                  </div>
                  <div className="select-container">
                    <select id="modelSize" onChange={(e) => setModelSize(e.target.value)}>
                      <option value="nano">Nano</option>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                    </select>
                  </div>

                  <div className='name-and-hint'>
                    <label htmlFor="trainSize" className="param-label">Пропорция</label>
                    {renderDescriptionTooltip('trainSize')}
                  </div>
                  <Slider
                    id="trainSize"
                    value={trainSize}
                    onChange={(event, newValue) => setTrainSize(newValue)}
                    aria-labelledby="trainSize"
                    step={0.1}
                    min={0}
                    max={1}
                    valueLabelDisplay="auto"
                    sx={{ color: 'white' }}
                  />
                  <div className='name-and-hint'>
                    <label htmlFor="batchSize" className="param-label">Размер батча</label>
                    {renderDescriptionTooltip('batchSize')}
                  </div>

                  <div className="select-container">
                    <select id="batchSize" onChange={(e) => setBatchSize(Number(e.target.value))}>
                      <option value={16}>16</option>
                      <option value={2}>2</option>
                      <option value={4}>4</option>
                      <option value={8}>8</option>
                      <option value={32}>32</option>
                      <option value={64}>64</option>
                    </select>
                  </div>

                  <div className='name-and-hint'>
                    <label htmlFor="numEpochs" className="param-label">Количество эпох</label>
                    {renderDescriptionTooltip('numEpochs')}
                  </div>
                  <Slider
                    id="numEpochs"
                    value={numEpochs}
                    onChange={(e, newValue) => setNumEpochs(newValue)}
                    min={1}
                    max={50}
                    valueLabelDisplay="auto"
                    sx={{ color: 'white' }}
                  />

                  <div className='name-and-hint'>
                    <label htmlFor="gpuFlag" className="param-label">GPU для обучения</label>
                    {renderDescriptionTooltip('gpuFlag')}
                  </div>
                  <div className="select-container">
                    <select id="gpuFlag" onChange={(e) => setGpuFlag(e.target.value === 'True')}>
                      <option value={false}>False</option>
                      <option value={true}>True</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='preview-model-card'>
            <div className='preview'>Превью
              <button className='export-model-btn' onClick={handleExportModel}><IosShareIcon />Экспортировать модель</button>
            </div>
            <div className='horizontal-line' />
            {showCamera && (
              <div>
                <Webcam
                  ref={webcamRef}
                  style={{
                    position: "relative",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 600,
                    top: 0,
                    textAlign: "center",
                    zIndex: 9,
                    width: 400,
                    height: 300,
                  }}
                />

                <canvas
                  ref={canvasRef}
                  style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 1060,
                    right: 0,
                    top: 50,
                    textAlign: "center",
                    zIndex: 9,
                    width: 380,
                    height: 280,
                  }}
                />

              </div>
            )}
            {!showCamera && (
              <div className='preview-text'>Вы должны обучить модель слева, прежде чем сможете просмотреть ее здесь.</div>
            )}
          </div>
        </div>
      </div>
      <ExportModelModal
        show={showModal}
        onClose={closeModal}
        modelDownloadUrl="/path/to/model.h5"
        codeExample={codeExample}
      />
    </React.Fragment>
  );
};

export default ImageDetectionForm;
