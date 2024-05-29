export const drawMesh = (predictions, ctx) => {
  if (predictions && predictions.box && predictions.emotion) {
    const { box, emotion } = predictions;
    const [x, y, width, height] = box;


    let color;
    switch (emotion) {
      case 'злость':
        color = 'red';
        break;
      case 'нейтральный':
        color = 'lightgreen';
        break;
      case 'радость':
        color = 'orange';
        break;
      case 'страх':
        color = 'lightblue';
        break;
      case 'удивление':
        color = 'yellow';
        break;
      case 'грусть':
        color = 'gray';
        break;
      case 'отвращение':
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
