import { DndContext } from '@dnd-kit/core';
import { css } from '@emotion/react';
import { useState } from 'react';
import DragEndEventWithBiomeAndNpc from '../dragEvents/dragEndEventWithBiomeAndNpc';
import NpcsAndBiomesManager from '../util/npcsAndBiomesManager';
import BiomesContainer from './BiomesContainer';
import NpcGrid from './NpcGrid';


const mainContainerStyle = css`
    width: 1200px;
    display: flex;
    justify-content: center;
    padding: 1rem;
    gap: 40px;
`;

export default function MainContainer() {
    const [npcsAndBiomeManager, setNpcsAndBiomeManager] = useState(NpcsAndBiomesManager.create());

    function handleDragEndEvent(event: DragEndEventWithBiomeAndNpc) {
        const biome = event.over?.data?.current.biome;
        const npc = event.active?.data?.current.npc;

        if (!npc) return;

        if (biome == null) 
            setNpcsAndBiomeManager(manager => manager.moveNpcToFree(npc));
        else setNpcsAndBiomeManager(manager => manager.moveNpcToBiome(npc, biome));
    }

    return (
        <div css={mainContainerStyle}>
            <DndContext onDragEnd={handleDragEndEvent}>
                <NpcGrid npcs={npcsAndBiomeManager.getAllFreeNpcs()} />
                <BiomesContainer npcsByBiome={npcsAndBiomeManager.getAllNpcsByBiomes()} />
            </DndContext>
        </div>
    );
}