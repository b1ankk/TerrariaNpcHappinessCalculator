import image from '../assets/img/npcs/Guide.png';
import { css } from '@emotion/react';

const imageWrapperStyle = css`
    padding: 0.5rem
`;

export default function Npc() {
    return (
        <div css={imageWrapperStyle}>
            <img src={image} alt="Guide" />
        </div>
    );
}
