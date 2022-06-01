declare module "jitsi-meet";
declare module "@fullstory/browser";
declare module "react-select";
declare module "classnames";
declare module "uuid";
declare module "react-sticky-table-thead";
declare module "react-color";
declare module "js-cookie";
declare module "md5";
declare module "react-csv";
declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_AWS_ACCESS_KEY_ID: string;
    REACT_APP_AWS_SECRET_ACCESS_KEY: string;
    REACT_APP_S3_ASSET_BUCKET: string;
  }
}
