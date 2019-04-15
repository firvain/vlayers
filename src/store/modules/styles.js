import { createStyle } from "vuelayers/lib/ol-ext";

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
  const defaultStyle = [
    createStyle({
      strokeColor: "#255d00",
      strokeWidth: 2,
      fillColor: "#255d00"
    })
  ];
  const spa = [
    createStyle({
      strokeColor: "#255d00",
      strokeWidth: 1,
      fillColor: "#255d00"
    })
  ];
  const sci = [
    createStyle({
      strokeColor: "#558b2f",
      strokeWidth: 1,
      fillColor: "#558b2f"
    })
  ];
  const spasci = [
    createStyle({
      strokeColor: "#85bb5c",
      strokeWidth: 4,
      fillColor: "#85bb5c"
    })
  ];
  return function _NaturaStyleFunc(feature) {
    switch (feature.getProperties().SITETYPE) {
      case "SPA":
        return spa;
      case "SCI":
        return sci;
      case "SPASCI":
        return spasci;
      default:
        return defaultStyle;
    }
  };
}
