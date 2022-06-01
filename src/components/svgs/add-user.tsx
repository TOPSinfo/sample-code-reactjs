import React from "react";
import styled from "styled-components";
interface AddUserProps {
  backgroundColor?: string;
  svgColor?: string;
}
export const AddUser: React.FC<AddUserProps> = ({
  backgroundColor,
  svgColor
}) => {
  return (
    <WrapperStyle backgroundColor={backgroundColor}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
      >
        <g fill='none' fillRule='evenodd'>
          <g fill={svgColor || "#8A9FBA"}>
            <g>
              <path
                d='M12 16c.513 0 .936.386.993.883L13 17v2h2c.513 0 .936.386.993.883L16 20c0 .513-.386.936-.883.993L15 21h-2v2c0 .513-.386.936-.883.993L12 24c-.513 0-.936-.386-.993-.883L11 23v-2H9c-.513 0-.936-.386-.993-.883L8 20c0-.513.386-.936.883-.993L9 19h2v-2c0-.513.386-.936.883-.993L12 16zm4-4c2.689 0 4.882 2.122 4.995 4.783L21 17v2c0 .552-.448 1-1 1-.513 0-.936-.386-.993-.883L19 19v-2c0-1.598-1.249-2.904-2.824-2.995L16 14H8c-1.598 0-2.904 1.249-2.995 2.824L5 17v2c0 .552-.448 1-1 1-.513 0-.936-.386-.993-.883L3 19v-2c0-2.689 2.122-4.882 4.783-4.995L8 12h8zM12 0c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm0 2c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z'
                transform='translate(-698 -374) translate(698 374)'
              />
            </g>
          </g>
        </g>
      </svg>
    </WrapperStyle>
  );
};
const WrapperStyle = styled.div<AddUserProps>`
  height: 50px;
  width: 50px;
  background: ${(props: AddUserProps) => props.backgroundColor || "#c1d5f8"};
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 50%;
`;
