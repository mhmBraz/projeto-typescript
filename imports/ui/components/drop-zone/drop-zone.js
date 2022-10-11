import React from "react";
import { DropzoneArea } from "material-ui-dropzone";

export function DropZone(props) {
  async function teste(url) {

    if (url[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(url[0]);
      reader.onload = function () {
        props.setPhoto(reader.result);
        url[0] = null
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  return (
    <DropzoneArea onChange={(event) => teste(event)} dropzoneText={"Arraste e solte um arquivo aqui ou clique"} filesLimit={1} />
  );
}
