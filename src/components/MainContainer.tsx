import { css } from '@emotion/react';
import Biomes from './Biomes';
import NpcGrid from './NpcGrid';

const mainContainerStyle = css`
    width: 1200px;
    display: flex;
    justify-content: center;
    padding: 1rem;
`;

export default function MainContainer() {
    return (
        <div css={mainContainerStyle}>
            <NpcGrid />
            <Biomes />
        </div>
    );
}
