import { css } from '@emotion/react';
import { Biome } from '../constants/biomes';
import { Npc } from '../constants/npcs';
import BiomeComponent from './BiomeComponent';

const containerStyle = css`
    display: grid;
    gap: 1rem;
    width: 700px;
`;

interface Props {
    npcsByBiome: Map<Biome, Npc[]>;
}

export default function BiomesContainer(props: Props) {
    return (
        <div css={containerStyle}>
            {Array.from(props.npcsByBiome, ([biome, npcs]) => (
                <BiomeComponent key={biome.name} biome={biome} npcs={npcs} />
            ))}
        </div>
    );
}
