interface IMediaPoints {
  desktop: string;
  desktopMin: string;
  largeDesktop: string;
  tablet: string;
  mobile: string;
}

export const media: IMediaPoints = {
  desktop: "991px",
  desktopMin: "961px",
  largeDesktop: "1600px",
  tablet: "768px",
  mobile: "480px"
};

export default media;
