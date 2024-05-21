import ControlPointIcon from '@mui/icons-material/ControlPoint';
import React, { useRef, useState, useEffect } from 'react';
import IosShareIcon from '@mui/icons-material/IosShare';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Slider from '@mui/material/Slider';
import { Camera } from './Camera';
import { Photo } from './Photo';
import './ClassesForm.css';
import Webcam from 'react-webcam';
import axios from 'axios';

const ClassesForm = () => {
  const webcamRef = useRef(null);
  const [forms, setForms] = useState([
    { id: 1, name: 'Класс 1', photos: [] },
    { id: 2, name: 'Класс 2', photos: [] }
  ]);
  const [formIdCounter, setFormIdCounter] = useState(3);
  const [showCamera, setShowCamera] = useState(false);
  const [freezeCamera, setFreezeCamera] = useState(false);
  const [socket, setSocket] = useState(null);
  const [classMapping, setClassMapping] = useState({});
  const [videoStopped, setVideoStopped] = useState(false);
  const [batchSize, setBatchSize] = useState(2);
  const [numEpochs, setNumEpochs] = useState(10);
  const [modelSize, setModelSize] = useState('small');
  const [trainStrategy, setTrainStrategy] = useState('last_layer');
  const [augmentationFlag, setAugmentationFlag] = useState(false);
  const [gpuFlag, setGpuFlag] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const hyperParametersDescription = {
    batchSize: `Размер пакета для обучения. Определяет, сколько примеров данных будет обработано за одну итерацию.
      Размер пакета - один из важнейших гиперпараметров в обучении глубокому обучению, который представляет собой количество образцов, используемых в одном прямом и обратном проходе через сеть, и оказывает непосредственное влияние на точность и вычислительную эффективность процесса обучения. Размер партии можно рассматривать как компромисс между точностью и скоростью. Большие объемы партий могут ускорить процесс обучения, но могут привести к снижению точности и чрезмерной подгонке, в то время как меньшие объемы партий могут обеспечить более высокую точность, но могут быть вычислительно дорогими и отнимать много времени.
      Размер партии также может повлиять на сходимость модели, то есть повлиять на процесс оптимизации и скорость обучения модели. Небольшие партии могут быть более восприимчивы к случайным колебаниям обучающих данных, в то время как большие партии более устойчивы к этим колебаниям, но могут сходиться медленнее.
      Важно отметить, что не существует универсального ответа, когда речь идет о выборе размера партии, поскольку идеальный размер зависит от нескольких факторов, включая размер обучающего набора данных, сложность модели и доступные вычислительные ресурсы.`,
      numEpochs: `Количество эпох для обучения. Определяет, сколько раз модель будет проходить через весь обучающий набор данных.`,
      modelSize: `Размер модели для обучения. Определяет, какой размер модели будет использоваться.
      Размер модели определяет количество параметров в нейронной сети, что влияет на ее сложность и производительность. Большие модели могут иметь большее количество параметров, что может привести к более высокой точности, но также требует больше вычислительных ресурсов. Маленькие модели могут быть более компактными и быстрыми, но могут иметь меньшую точность.`,
    trainStrategy: `Стратегия обучения. Определяет, какие части сети будут обучены.
      Стратегия обучения определяет, какие части нейронной сети будут обучены в процессе. Это может быть обучение только последнего слоя, последнего блока или всей сети. Каждая стратегия имеет свои преимущества и недостатки, и выбор стратегии зависит от конкретной задачи и требований.`,
    augmentationFlag: `Флаг аугментации данных. Указывает, будет ли применяться аугментация данных в процессе обучения.
      Аугментация данных - это техника, при которой обучающие изображения модифицируются с целью создания новых образцов данных. Это может помочь улучшить обобщающую способность модели и сделать ее менее подверженной переобучению.`,
    gpuFlag: `Использование GPU для обучения. Указывает, будет ли обучение выполняться на GPU.
      GPU обладает большей вычислительной мощностью по сравнению с CPU и может значительно ускорить процесс обучения нейронных сетей, особенно для крупных моделей и больших объемов данных. Однако это требует наличия совместимого с GPU оборудования и дополнительной конфигурации.`
  };


  const addForm = () => {
    const newForm = { id: formIdCounter, name: `Класс ${formIdCounter}`, photos: [] };
    setFormIdCounter(formIdCounter + 1);
    setForms(prevForms => [...prevForms, newForm]);
  };

  const deleteForm = formId => {
    setForms(prevForms => prevForms.filter(form => form.id !== formId));
  };

  const renameForm = (formId, newName) => {
    setForms(prevForms => {
      return prevForms.map(form => {
        if (form.id === formId) {
          return { ...form, name: newName };
        }
        return form;
      });
    });
  };

  const TakePhoto = formId => {
    const capturedPhoto = webcamRef.current.getScreenshot();

    setForms(prevForms => {
      return prevForms.map(form => {
        if (form.id === formId) {
          form.photos.push(capturedPhoto);
        }
        return form;
      });
    });
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

  const toggleFreezeCamera = () => {
    setFreezeCamera(prevState => !prevState);

    setVideoStopped(prevState => !prevState);
  };

  const runFaceDetectorModel = async () => {
    console.log("FaceDetection Model is Loaded..")
    setInterval(() => {
      detect("")
    }, 100);
  };

  const detect = async () => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4 &&
      socket &&
      socket.readyState === WebSocket.OPEN
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      var imageSrc = webcamRef.current.getScreenshot();
      var apiCall = {
        event: "localhost:subscribe",
        data: {
          'image': imageSrc
        },
      };
      // socket.onopen = () => socket.send(JSON.stringify(apiCall))
      socket.send(JSON.stringify(apiCall));

      socket.onmessage = function (event) {
        var predictions = JSON.parse(event.data)
        forms.forEach(form => {
          var element = document.getElementById(form.name);
          if (element) {
            element.value = Math.round(predictions[form.name] * 100);
          } else {
            console.error(`Element with id ${form.name} not found`);
          }
        });
        console.log(predictions);
      }
    }
  };

  const classPhotos = {};
  const handleSavePhotos = (formId, photos) => {
    setForms(prevForms => {
      return prevForms.map(form => {
        if (form.id === formId) {
          form.photos = photos.map(photo => photo.photo);
        }
        return form;
      });
    });
    console.log(forms);
  };


  const sendJSON = async () => {
    const classPhotos = forms.reduce((accumulator, form) => {
      accumulator[form.name] = form.photos;
      return accumulator;
    }, {});

    const hyperparameters = {
      batch_size: batchSize,
      // n_Epochs: numEpochs,
      model_size: modelSize,
      train_strategy: trainStrategy,
      augmentation_flg: augmentationFlag,
      gpu_flg: gpuFlag
    };

    const obj = { classes: classPhotos, hyperparameters: hyperparameters };
    const json = JSON.stringify(obj, null, 2);
    const blob = new Blob([json], { type: 'application/json' });

    console.log(json);
    const apiUrl = 'http://0.0.0.0:8888/api/cv/train/classification/train-model?user_id=1';

    try {
      const response = await axios.post(apiUrl, blob, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Response:', response.data);
      if (response.data) {
        const socket = new WebSocket('ws://0.0.0.0:8888/api/cv/train/ws/classification/predict/1');
        setSocket(socket);
        setShowCamera(true)
      } else {
        console.log('Error: No class mapping received');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (showCamera) {
      runFaceDetectorModel();
    }
  }, [showCamera]);



  useEffect(() => {
    if (webcamRef.current) {
      if (videoStopped) {
        webcamRef.current.video.pause();
      } else {
        webcamRef.current.video.play();
      }
    }
  }, [videoStopped]);


  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const disableButtons = forms.length < 2 || forms.some(form => form.photos.length === 0);

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
                <Camera formId={form.id} formName={form.name} renameForm={renameForm} delForm={deleteForm} handleSavePhotos={handleSavePhotos} TakePhoto={() => TakePhoto(form.id)} />
              </div>
            ))}
            <button className='add-form-btn' onClick={addForm}>Добавьте класс</button>
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
                    <label htmlFor="batchSize" className="param-label">Размер пакета</label>
                    {renderDescriptionTooltip('batchSize')}
                  </div>

                  <div className="select-container">
                    <select id="batchSize" onChange={(e) => setBatchSize(Number(e.target.value))}>
                      <option value={2}>2</option>
                      <option value={4}>4</option>
                      <option value={8}>8</option>
                      <option value={16}>16</option>
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
                    <label htmlFor="modelSize" className="param-label">Размер модели</label>
                    {renderDescriptionTooltip('modelSize')}
                  </div>

                  <div className="select-container">
                    <select id="modelSize" onChange={(e) => setModelSize(e.target.value)}>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  <div className='name-and-hint'>
                    <label htmlFor="trainStrategy" className="param-label">Стратегия обучения</label>
                    {renderDescriptionTooltip('trainStrategy')}
                  </div>

                  <div className="select-container">
                    <select id="trainStrategy" onChange={(e) => setTrainStrategy(e.target.value)}>
                      <option value="last_layer">Last Layer</option>
                      <option value="last_block">Last Block</option>
                      <option value="whole_network">Whole Network</option>
                    </select>

                  </div>
                  <div className='name-and-hint'>
                    <label htmlFor="augmentationFlag" className="param-label">Aугментация данных</label>
                    {renderDescriptionTooltip('augmentationFlag')}
                  </div>

                  <div className="select-container">
                    <select id="augmentationFlag" onChange={(e) => setAugmentationFlag(e.target.value === 'True')}>
                      <option value={false}>False</option>
                      <option value={true}>True</option>
                    </select>

                  </div>
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
              <button className='export-model-btn' disabled={classPhotos.length > 0 ? true : false}><IosShareIcon />Экспортировать модель</button>
            </div>
            <div className='horizontal-line' />
            {showCamera && (
              <div>
                <label className="toggle">
                  <span className="toggle-label">{freezeCamera ? "Выкл" : "Вкл"}</span>
                  <input className="toggle-checkbox" type="checkbox" onClick={toggleFreezeCamera} />
                  <div className="toggle-switch"></div>
                </label>
                <Webcam ref={webcamRef} className="webcam" />
                <div className="preview-progress-bars">
                  {forms.map(form => (
                    <div key={form.id}>
                      <label style={{ color: 'white' }}>{form.name} </label>
                      <progress id={form.name} value={0} max={100} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!showCamera && (
              <div className='preview-text'>Вы должны обучить модель слева, прежде чем сможете просмотреть ее здесь.</div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ClassesForm;
