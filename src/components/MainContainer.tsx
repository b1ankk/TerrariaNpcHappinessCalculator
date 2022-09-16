import { DndContext } from '@dnd-kit/core';
import { css } from '@emotion/react';
import Immutable from 'immutable';
import { useEffect, useState } from 'react';
import { Npc } from '../constants/npcs';
import DragEndEventWithBiomeAndNpc from '../dragEvents/dragEndEventWithBiomeAndNpc';
import NpcHappinessCalculator from '../util/npcHappinessCalculator';
import NpcsAndBiomesManager from '../util/npcsAndBiomesManager';
import BiomesContainer from './biomes/BiomesContainer';
import NpcGrid from './npcs/NpcGrid';


const mainContainerStyle = css`
    width: auto;
    display: flex;
    justify-content: center;
    padding: 1rem;
    gap: 40px;
`;

export default function MainContainer() {
    const [npcsAndBiomeManager, setNpcsAndBiomeManager] = useState(
        NpcsAndBiomesManager.create()
    );
    const [npcsToHappiness, setNpcsToHappiness] = useState(
        Immutable.Map<Npc, number>()
    );

    const npcsByBiomes = npcsAndBiomeManager.getAllNpcsByBiomes();
    useEffect(() => {
        setNpcsToHappiness(
            new NpcHappinessCalculator(
                npcsByBiomes,
                true
            ).recalculateHappiness()
        );
    }, [npcsByBiomes]);

    function handleDragEndEvent(event: DragEndEventWithBiomeAndNpc) {
        const biome = event.over?.data?.current.biome;
        const npc = event.active?.data?.current.npc;

        if (!npc) return;

        if (biome == null)
            setNpcsAndBiomeManager(manager => manager.moveNpcToFree(npc));
        else
            setNpcsAndBiomeManager(manager =>
                manager.moveNpcToBiome(npc, biome)
            );
    }

    return (
        <div css={mainContainerStyle}>
            <DndContext onDragEnd={handleDragEndEvent}>
                <NpcGrid npcs={npcsAndBiomeManager.getAllFreeNpcs()} />
                <BiomesContainer
                    npcsByBiome={npcsAndBiomeManager.getAllNpcsByBiomes()}
                    npcHappiness={npcsToHappiness}
                />
            </DndContext>
        </div>
    );
}
