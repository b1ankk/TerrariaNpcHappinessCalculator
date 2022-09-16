import { css } from '@emotion/react';
import Immutable from 'immutable';
import { Npc } from '../constants/npcs';
import { NpcsByBiomeMap } from '../util/npcsAndBiomesManager';
import BiomeComponent from './BiomeComponent';

const wrapperStyle = css`
    position: relative;
    background: #6670bd;
    border-radius: 30px;
    padding: 15px 20px;
    width: 800px;
`;

const scrollableStyle = css`
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;
    scrollbar-base-color: #4955ba;
    scrollbar-arrow-color: red;
`;

const biomeContainerStyle = css`
    padding: 15px 10px;
    display: grid;
    gap: 8px;
`;

const upperFadeOutOverlayStyle = css`
    height: 20px;
    background: linear-gradient(
        180deg,
        rgba(102, 112, 189, 1) 0%,
        rgba(102, 112, 189, 0.9542191876750701) 25%,
        rgba(102, 112, 189, 0.80015756302521) 50%,
        rgba(102, 112, 189, 0.5032387955182073) 75%,
        rgba(102, 112, 189, 0) 100%
    );
    position: absolute;
    top: 15px;
    left: 20px;
    right: 30px;
    pointer-events: none;
`;

const bottomFadeOutOverlayStyle = css`
    height: 15px;
    background: linear-gradient(
        0,
        rgba(102, 112, 189, 1) 0%,
        rgba(102, 112, 189, 0.9542191876750701) 25%,
        rgba(102, 112, 189, 0.80015756302521) 50%,
        rgba(102, 112, 189, 0.5032387955182073) 75%,
        rgba(102, 112, 189, 0) 100%
    );
    position: absolute;
    bottom: 15px;
    left: 20px;
    right: 30px;
    pointer-events: none;
`;

const scrollbarStyle = css`
    &::-webkit-scrollbar {
        background: #6670bd;
        width: 10px;
        padding: 10px 0;
    }

    &::-webkit-scrollbar-thumb {
        background: #4955ba;
        border-radius: 10px;
        width: 30px;
    }

    scrollbar-gutter: stable both-edges;
    scrollbar-color: #4955ba #6670bd;
    scrollbar-width: thin;
`;

interface Props {
    npcsByBiome: NpcsByBiomeMap;
    npcHappiness: Immutable.Map<Npc, number>;
}

export default function BiomesContainer(props: Props) {
    return (
        <div css={wrapperStyle}>
            <div css={upperFadeOutOverlayStyle}></div>
            <div css={[scrollableStyle, scrollbarStyle]}>
                <div css={biomeContainerStyle}>
                    {props.npcsByBiome
                        .map((npcs, biome) => (
                            <BiomeComponent
                                key={biome.name}
                                biome={biome}
                                npcs={npcs}
                                npcHappiness={props.npcHappiness}
                            />
                        ))
                        .valueSeq()}
                </div>
            </div>
            <div css={bottomFadeOutOverlayStyle}></div>
        </div>
    );
}
