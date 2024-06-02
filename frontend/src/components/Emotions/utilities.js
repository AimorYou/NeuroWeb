export const drawMesh = (predictions, ctx) => {
  if (predictions && predictions.box && predictions.emotion) {
    const { box, emotion } = predictions;
    const [x, y, width, height] = box;


    let color;
    switch (emotion) {
      case 'Злость':
        color = 'red';
        break;
      case 'Нейтральный':
        color = 'lightgreen';
        break;
      case 'Радость':
        color = 'orange';
        break;
      case 'Страх':
        color = 'lightblue';
        break;
      case 'Удивление':
        color = 'yellow';
        break;
      case 'Грусть':
        color = 'gray';
        break;
      case 'Отвращение':
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
