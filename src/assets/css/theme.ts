const theme = {
  /**
   * Colors
   */
  primary: "#000",
  $darkBlue: "#25283D",
  $grayWhiteColor: "#f5f5ff",
  $darkViolet: "#2C2543",
  $white: "#fff",
  $grayDarkColor: "#20232",
  /**
   * Fonts
   */
  $baseFontFamily: "Roboto, Arial, sans-serif",
  $secondFontFamily: "Nunito Sans, sans-serif",
  /**
   * Layout
   */
  "$container-max-widths": {
    sm: "540px",
    md: "720px",
    lg: "960px",
    xl: "1600px"
  },
  /**
   * Forms
   */
  // Input
  "$input-bg": "#fff",
  "$input-bg-disabled": "#eee",
  "$input-color": "#2C2543",
  "$input-border-color": "transparent",
  "$input-border-radius": "20px",
  "$input-height": "40px",
  /**
   * Components
   */
  // Header
  $headerHeight: "56px",
  $headerBackground: "#FFFFFF"
};

declare module "styled-components" {
  /* tslint:disable:interface-name */
  export interface DefaultTheme {
    /* tslint:enable:interface-name */
    /**
     * Bootstrap vars
     */
    /**
     * Colors
     */
    primary: string;
    $white: string;
    $darkBlue: string;
    $grayWhiteColor: string;
    $darkViolet: string;
    $grayDarkColor: string;
    /**
     * Fonts
     */
    $baseFontFamily: string;
    $secondFontFamily: string;
    /**
     * Layout
     */
    "$container-max-widths": { [key: string]: string };
    /**
     * Forms
     */
    // Input
    "$input-bg": string;
    "$input-bg-disabled": string;
    "$input-color": string;
    "$input-border-color": string;
    "$input-border-radius": string;
    "$input-height": string;
    /**
     * Components
     */
    // Header
    $headerBackground: string;
    $headerHeight: string;
  }
}

export default theme;
