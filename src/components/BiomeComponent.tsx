import { useDroppable } from '@dnd-kit/core';
import { css } from '@emotion/react';
import forest from '../assets/img/biomes/BiomeBannerForest.webp';
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
    padding: 16px 32px;
    display: flex;
    flex-wrap: wrap-reverse;
    align-content: end;
    align-items: center;
`;

interface Props {
    biome: Biome;
    npcs: Npc[];
}

export default function BiomeComponent(props: Props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.biome.name,
        data: { biome: props.biome },
    });

    return (
        <div ref={setNodeRef} css={containerStyle}>
            <img css={[stackedChildStyle, imgStyle]} src={forest} alt="forest" />
            <div css={[stackedChildStyle, npcContainerStyle]}>
                {props.npcs.map(npc => (
                    <NpcComponent dragId={`${npc.name}-${props.biome.name}`} key={npc.name} npc={npc} />
                ))}
            </div>
        </div>
    );
}