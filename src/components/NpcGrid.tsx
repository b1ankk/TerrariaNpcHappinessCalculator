import { css } from '@emotion/react';
import Npc from './Npc';

const containerStyle = css`
    display: flex;
    flex-direction: column;
`;

const npcContainerStyle = css`
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-template-rows: 1fr 1fr auto;
`;

export default function NpcGrid() {
    return (
        <div css={containerStyle}>
            <div css={npcContainerStyle}>
                <Npc/>
                <Npc/>
                <Npc/>
                <Npc/>
                <Npc/>
                <Npc/>
                <Npc/>
                <Npc/>
            </div>
            <div></div>
        </div>
    );
}