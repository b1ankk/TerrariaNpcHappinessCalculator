import { css } from '@emotion/react';
import Immutable from 'immutable';
import { Npc } from '../constants/npcs';
import { NpcsByBiomeMap } from '../util/npcsAndBiomesManager';
import BiomeComponent from './BiomeComponent';

const containerStyle = css`
    display: grid;
    gap: 1rem;
    width: 700px;
`;

interface Props {
    npcsByBiome: NpcsByBiomeMap;
    npcHappiness: Immutable.Map<Npc, number>;
}

export default function BiomesContainer(props: Props) {
    return (
        <div css={containerStyle}>
            {props.npcsByBiome
                .map((npcs, biome) => (
                    <BiomeComponent key={biome.name} biome={biome} npcs={npcs} npcHappiness={props.npcHappiness} />
                ))
                .valueSeq()}
        </div>
    );
}
