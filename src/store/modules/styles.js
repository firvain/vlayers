import { createStyle } from "vuelayers/lib/ol-ext";
import { getArea } from "ol/sphere";
import colormap from "colormap";
// const min = 1e8; // the smallest area
// const max = 2e13; // the biggest area
const steps = 9;
const ramp = colormap({
  colormap: "chlorophyll",
  nshades: steps,
  format: "hex"
});

// function clamp(value, low, high) {
//   return Math.max(low, Math.min(value, high));
// }

// function getColor(feature) {
//   const area = getArea(feature.getGeometry());
//   console.log(area);
//   const f = Math.pow(clamp((area - min) / (max - min), 0, 1), 1 / 2);
//   const index = Math.round(f * (steps - 1));
//   console.log(index);
//   return ramp[index];
// }

// function getRandomColor() {
//   var letters = "0123456789ABCDEF";
//   var color = "#";
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

export function defaultStyle() {
  const style = [
    createStyle({
      strokeColor: "black",
      strokeWidth: 1,
      strokeDash: [2, 2]
      // text: feature.get("NAME")
    })
  ];
  return function _defaultStyle() {
    return style;
  };
}
export function NaturaStyleFunc() {
  return function _NaturaStyleFunc(feature) {
    const text = feature.getProperties().SITECODE;
    const defaultStyle = [
      createStyle({
        strokeColor: "#255d00",
        strokeWidth: 2,
        fillColor: "#255d00"
      })
    ];
    const spa = [
      createStyle({
        strokeColor: ramp[1],
        strokeWidth: 1,
        fillColor: ramp[1],
        text,
        textStrokeColor: "black",
        textFillColor: "black"
      })
    ];
    const sci = [
      createStyle({
        strokeColor: ramp[5],
        strokeWidth: 1,
        fillColor: ramp[5],
        text,
        textStrokeColor: "black",
        textFillColor: "black"
      })
    ];
    const spasci = [
      createStyle({
        strokeColor: ramp[8],
        strokeWidth: 1,
        fillColor: ramp[8],
        text,
        textStrokeColor: "black",
        textFillColor: "black"
      })
    ];
    switch (feature.getProperties().SITETYPE) {
      case "SPA":
      case "B":
        return spa;
      case "SCI":
      case "A":
        return sci;
      case "SPASCI":
      case "C":
        return spasci;
      default:
        return defaultStyle;
    }
  };
}
export function drawStyle() {
  const style = [
    createStyle({
      strokeColor: "red",
      strokeWidth: 3,
      fillColor: [255, 255, 255, 0.5],
      imageRadius: 5,
      imageStrokeWidth: 1.5,
      imageStrokeColor: "red"
    })
  ];

  return function _selectStyle() {
    return style;
  };
}
