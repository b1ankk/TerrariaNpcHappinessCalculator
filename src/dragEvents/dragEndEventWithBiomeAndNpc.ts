import { DragEndEvent } from '@dnd-kit/core';
import { Npc } from '../constants/npcs';
import {Biome} from "../constants/biomes";

interface NpcData {
    active: {
        data?: {
            current: {
                npc?: Npc;
            };
        };
    };
}

interface BiomeData {
    over: {
        data?: {
            current: {
                biome?: Biome
            }
        }
    }
}

type DragEndEventWithBiomeAndNpc = DragEndEvent & NpcData & BiomeData;

export default DragEndEventWithBiomeAndNpc;
