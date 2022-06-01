export interface UIModalProps
  extends UIModalStyleProps,
    UIFooterWrapperProps,
    UIBodyWrapperProps {
  children: JSX.Element | JSX.Element[];
  footer?: JSX.Element | JSX.Element[];
  title?: string;
  headerClass?: string;
  subtitle?: string;
  show: boolean;
  backdrop?: true | false | "static";
  closeButton?: boolean;
  size?: "sm" | "lg" | "xl";
  onHide: () => void;
  className?: string
}
export interface UIModalStyleProps {
  maxHeight?: string;
  minHeight?: string;
  modalMinHeight?: string;
  modalMinWidth?: string;
}
export interface UIHeaderTextStyleProps {
  bold?: string | number;
  color?: string;
  className?: string;
  margin?: string;
  typeOf?:
    | "text-h1"
    | "text-h2"
    | "text-h3"
    | "text-h4"
    | "text-h5"
    | "text-h6";
  fontSize?: number;
}
export interface UIHeaderTextProps extends UIHeaderTextStyleProps {
  text: string;
}
export interface UIFooterWrapperProps {
  hasFooterBorder?: boolean;
}
export interface UIBodyWrapperProps {
  customBodyPadding?: string;
}
