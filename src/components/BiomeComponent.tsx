import { useDroppable } from '@dnd-kit/core';
import { css } from '@emotion/react';
import Immutable from 'immutable';
import BiomeImages from '../constants/biomeImages';
import { Biome } from '../constants/biomes';
import { Npc } from '../constants/npcs';
import NpcComponent from './NpcComponent';

const imgStyle = css`
    width: 100%;
    image-rendering: pixelated;
`;

const containerStyle = css`
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto;
`;

const stackedChildStyle = css`
    grid-area: 1 / 1 / 2 / 2;
`;

const npcContainerStyle = css`
    padding: 16px 38px;
    display: flex;
    flex-wrap: wrap-reverse;
    align-items: center;
`;

const headerStyle = css`
    box-sizing: content-box;
    justify-self: center;
    margin-top: 10px;
    white-space: nowrap;
    height: 10px;
    line-height: 13px;
    font-size: 20px;
    background: rgba(0, 0, 0, 0.5);
    border-style: solid;
    border-radius: 20px;
    border-color: #00000000;
    border-width: 0.25em;
`;

interface Props {
    biome: Biome;
    npcs: Immutable.Set<Npc>;
    npcHappiness: Immutable.Map<Npc, number>;
}

export default function BiomeComponent(props: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.biome.name,
        data: { biome: props.biome },
    });

    return (
        <div ref={setNodeRef} css={containerStyle}>
            <img css={[stackedChildStyle, imgStyle]} src={BiomeImages.get(props.biome)} alt={props.biome.name} />
            <div css={[stackedChildStyle, npcContainerStyle]}>
                {props.npcs.map(npc => (
                    <NpcComponent
                        dragId={`${npc.name}-${props.biome.name}`}
                        key={npc.name}
                        npc={npc}
                        happiness={props.npcHappiness.get(npc) ?? 1}
                        moveUsingFixedPos={true}
                    />
                ))}
            </div>
            <div css={[stackedChildStyle, headerStyle]}>{props.biome.name}</div>
        </div>
    );
}
