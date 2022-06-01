import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import media from "assets/css/media";

interface IProps {
  icon: string;
  routeUrl: string;
}

const Icon = styled.img`
    'width': '34.7px',
    'height': '32.6px',
    'object-fit': 'contain',
    'max-width': '25px',
    @media (max-width:  ${media.desktop}) {
        margin: 0;
  }
    `;

export const IconView = ({ icon, routeUrl }: IProps) => {
  return (
    <Link to={routeUrl} className='ml-4 d-inline-flex'>
      <Icon src={icon} width='20' alt='' />
    </Link>
  );
};
export default IconView;
