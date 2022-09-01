import { css } from '@emotion/react';
import forest from '../assets/img/biomes/BiomeBannerForest.webp';

const containerStyle = css`
    display: flex;
    flex-direction: column;
    align-items: end;
`;

export default function Biomes() {
    const nums = [...Array(5).keys()];

    const imgStyle = css`
        flex-grow: 2;
    `;

    return (
        <div css={containerStyle}>
            {nums.map(n => (
                <img css={imgStyle} key={n} src={forest} alt="forest" />
            ))}
        </div>
    );
}
