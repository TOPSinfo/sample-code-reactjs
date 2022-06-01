import lodash from "lodash";
export const imageExtension: { [index: string]: string } = {
  "image/png": "png",
  "image/jpeg": "jpg"
};

export interface CroppedArea {
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface ImageFile {
  blob: Blob | null;
  extension?: string;
  label: string;
  megabytes: number;
  name?: string;
  source: any;
  type: string;
}

export interface ImageSource {
  source: any;
  type?: string;
}

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export async function cropImage(
  input: ImageSource,
  pixelCrop: CroppedArea,
  rotation = 0
): Promise<ImageFile | null> {
  const image = await createImage(input.source);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (ctx === null) return null;

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );
  // As a blob
  const fileType = input.type
    ? input.type
    : input.source.includes("png")
      ? "image/png"
      : "image/jpeg";
  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(getFile(blob, input.source)), fileType)
  );
}

export function getBlobFile(blob: Blob | null, source: any) {
  const type = blob ? blob.type : "invalid";
  return {
    blob,
    extension: lodash.get(imageExtension, type),
    label: getFileSizeLabel(lodash.get(blob, "size", 0)),
    megabytes: getMegabytes(lodash.get(blob, "size", 0)),
    name: lodash.get(blob, "name"),
    source,
    type: type in imageExtension ? type : "invalid"
  };
}

export function getDataUriType(uri: string): string {
  const fragments = uri.split("data:");
  if (fragments.length === 2) {
    const typeBase = fragments[1].split(";base64,");
    if (typeBase.length === 2) return typeBase[0];
  }
  return "";
}

export function getDataUriSize(uri: string): number {
  let length = uri.length;
  const type = getDataUriType(uri);
  if (type) {
    const head = `data:${type};base64,`;
    length = length - head.length;
  }
  return Math.round((length * 3) / 4);
}

export function getDataUriFile(source: string) {
  const type = getDataUriType(source);
  const size = getDataUriSize(source);
  return {
    blob: null,
    extension: lodash.get(imageExtension, type),
    label: getFileSizeLabel(size),
    megabytes: getMegabytes(size),
    source,
    type: type in imageExtension ? type : "invalid"
  };
}

export function getFile(blob: Blob | null, source: any) {
  if (blob) return getBlobFile(blob, source);
  return getDataUriFile(source);
}

export function getFileSizeLabel(size: number) {
  if (size < 1024) {
    return size + "bytes";
  } else if (size >= 1024 && size < 1048576) {
    return (size / 1024).toFixed(1) + "KB";
  } else if (size >= 1048576) {
    return (size / 1048576).toFixed(1) + "MB";
  }
  return "";
}

export function getMegabytes(size: number) {
  return size ? size / 1048576 : 0;
}

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

export function isDataUri(value: any) {
  return lodash.isString(value) && value.startsWith("data:");
}

export function readImage(files: FileList): Promise<ImageFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(getFile(files[0], reader.result));
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(files[0]);
  });
}
