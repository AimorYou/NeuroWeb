export const drawMesh = (predictions, ctx) => {
  if (predictions && predictions.box && predictions.emotion) {
    const { box, emotion } = predictions;
    const [x, y, width, height] = box;


    let color;
    switch (emotion) {
      case 'angry':
        color = 'red';
        break;
      case 'neutral':
        color = 'lightgreen';
        break;
      case 'happy':
        color = 'orange';
        break;
      case 'fear':
        color = 'lightblue';
        break;
      case 'surprise':
        color = 'yellow';
        break;
      case 'sad':
        color = 'gray';
        break;
      case 'disgust':
        color = 'pink';
        break;
      default:
        color = 'white';
    }


    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = color;
    ctx.rect(x, y, width, height);
    ctx.stroke();
    
  
    ctx.font = '20px Georgia';
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.fillText(emotion, x + width / 2, y - 10);
  }
};
