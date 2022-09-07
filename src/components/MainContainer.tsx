import { DndContext } from '@dnd-kit/core';
import { css } from '@emotion/react';
import { useState } from 'react';
import { AllBiomes, Biome } from '../constants/biomes';
import { AllNpcs, Npc } from '../constants/npcs';
import DragEndEventWithBiomeAndNpc from '../dragEvents/dragEndEventWithBiomeAndNpc';
import BiomesContainer from './BiomesContainer';
import NpcGrid from './NpcGrid';


const mainContainerStyle = css`
    width: 1200px;
    display: flex;
    justify-content: center;
    padding: 1rem;
    gap: 40px;
`;

function initNpcsByBiomeMap(biomes: readonly Biome[]): Map<Biome, Npc[]> {
    return new Map(biomes.map(biome => [biome, []]));
}

export default function MainContainer() {
    const [npcsByBiome, setNpcsByBiome] = useState(initNpcsByBiomeMap(AllBiomes));
    const [freeNpcs, setFreeNpcs] = useState(Array.from(AllNpcs));

    function removeNpcFromBiome(npc: Npc) {
        setFreeNpcs(storedFreeNpcs => [...storedFreeNpcs, npc]);
        setNpcsByBiome(storedNpcsByBiome => {
            const newMap = new Map(storedNpcsByBiome);
            newMap.forEach((npcs, biome) => {
                if (npcs.includes(npc))
                    newMap.set(biome, [...(newMap.get(biome) ?? []).filter(storedNpc => storedNpc !== npc)]);
            });
            return newMap;
        });
    }

    function addNpcToBiome(npc: Npc, biome: Biome) {
        setFreeNpcs(storedFreeNpcs => storedFreeNpcs.filter(storedNpc => storedNpc !== npc));
        setNpcsByBiome(storedNpcsByBiome => {
            const newMap = new Map(storedNpcsByBiome);
            newMap.forEach((npcs, biome) => {
                if (npcs.includes(npc))
                    newMap.set(biome, [...(newMap.get(biome) ?? []).filter(storedNpc => storedNpc !== npc)]);
            });
            newMap.set(biome, [
                ...(newMap.get(biome) ?? []),
                npc,
            ]);
            return newMap;
        }
        );
    }

    function handleDragEndEvent(event: DragEndEventWithBiomeAndNpc) {
        const biome = event.over?.data?.current.biome;
        const npc = event.active?.data?.current.npc;

        if (!npc) return;

        if (biome != null) addNpcToBiome(npc, biome);
        else removeNpcFromBiome(npc);
    }

    return (
        <div css={mainContainerStyle}>
            <DndContext onDragEnd={handleDragEndEvent}>
                <NpcGrid npcs={freeNpcs} />
                <BiomesContainer npcsByBiome={npcsByBiome} />
            </DndContext>
        </div>
    );
}