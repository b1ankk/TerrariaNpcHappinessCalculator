import { css } from '@emotion/react';
import { AllNpcs } from '../../constants/npcs';
import { FreeNpcsSet } from '../../util/npcsAndBiomesManager';
import NpcComponent from './NpcComponent';


const containerStyle = css`
    display: flex;
    flex-direction: column;
`;

const npcContainerStyle = css`
    display: grid;
    row-gap: 8px;
    column-gap: 2px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto auto;
    background: #6670bd;
    border-radius: 30px;
    padding: 30px 10px;
`;

interface Props {
    npcs: FreeNpcsSet;
}

export default function NpcGrid(props: Props) {
    return (
        <div css={containerStyle}>
            <div css={npcContainerStyle}>
                {AllNpcs.map(npc => (
                    <NpcComponent
                        hidden={!props.npcs.has(npc)}
                        key={npc.name}
                        npc={npc}
                        happiness={1}
                    />
                ))}
            </div>
            <div></div>
        </div>
    );
}
