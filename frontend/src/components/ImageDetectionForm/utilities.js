 // Drawing Mesh
 // Detection
 export const drawMesh = (predictions, ctx) => {
    console.log(Object.keys(predictions))
    if (Object.keys(predictions).length > 0) {
      console.log("trying to read")
    console.log(predictions)
        for (let key in Object.keys(predictions)) {
          var coordinates = predictions[key]["coordinates"]
          var className = predictions[key]["cls"]
          var color = predictions[key]["color"]
          const start = [coordinates[0], coordinates[1]];
          const end =  [coordinates[2], coordinates[3]];
          const size = [end[0] - start[0], end[1] - start[1]];
   
          ctx.beginPath();
          ctx.lineWidth = "10";
 
          console.log(color)
          ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
          ctx.globalAlpha = 0.6;
          ctx.rect(start[0], start[1], size[0], size[1]);
          // ctx.fillRect(start[0], start[1], size[0], size[1]);
          ctx.strokeStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
          ctx.stroke();
          ctx.font="26px Georgia";
          ctx.textAlign="center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#ffffff";
          ctx.fillText(className, start[0]+40, start[1]+15);
          }
      }
    };