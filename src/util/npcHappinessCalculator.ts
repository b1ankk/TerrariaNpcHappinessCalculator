import Immutable from 'immutable';
import { Biome } from '../constants/biomes';
import { Npc, Princess } from '../constants/npcs';
import { NpcsByBiomeMap } from './npcsAndBiomesManager';


const OVERCROWD_MODIFIER = 1.05;
const ROOMY_MODIFIER = 0.95;

const LOVED_BIOME_MODIFIER = 0.88;
const LIKED_BIOME_MODIFIER = 0.94;
const DISLIKED_BIOME_MODIFIER = 1.06;
const HATED_BIOME_MODIFIER = 1.12;

const LOVED_NEIGHBOR_MODIFIER = 0.88;
const LIKED_NEIGHBOR_MODIFIER = 0.94;
const DISLIKED_NEIGHBOR_MODIFIER = 1.06;
const HATED_NEIGHBOR_MODIFIER = 1.12;

export default class NpcHappinessCalculator {
    private readonly npcsByBiome: NpcsByBiomeMap;
    private readonly isPc: boolean;

    public constructor(npcsByBiome: NpcsByBiomeMap, isPc: boolean) {
        this.npcsByBiome = npcsByBiome;
        this.isPc = isPc;
    }

    public recalculateHappiness(): Immutable.Map<Npc, number> {
        return this.npcsByBiome
            .map((npcs, biome) => this.calculateHappinessForBiome(biome, npcs))
            .flatMap((npcsToHappiness) => npcsToHappiness.entries())
            .toMap();
    }

    private calculateHappinessForBiome(biome: Biome, npcs: Immutable.Set<Npc>): Immutable.Map<Npc, number> {
        const closeNeighbors = npcs.size - 1;
        const npcsToHappiness: Immutable.Set<[Npc, number]> = npcs.map(npc => {
            if (npc === Princess && closeNeighbors < 2 ) // todo 120 tiles
                return [npc, 1.5];

            let happiness = 1;
            let log = `${npc.name}: 1`;

            if (closeNeighbors >= 4 && this.isPc || closeNeighbors >= 3 && !this.isPc) {
                happiness *= OVERCROWD_MODIFIER;
                log += ` * ${OVERCROWD_MODIFIER} (OVERCROWD_MODIFIER)`;
            }

            if (npc !== Princess && (closeNeighbors <= 2 && this.isPc || closeNeighbors <= 1 && !this.isPc)) { // todo 120 tiles
                happiness *= ROOMY_MODIFIER;
                log += ` * ${ROOMY_MODIFIER} (ROOMY_MODIFIER)`;
            }

            const biomeModifier = this.assignBiomeModifier(npc, biome);
            happiness *= biomeModifier;
            log += ` * ${biomeModifier} (BIOME_MODIFIER)`;

            const takeLimit = npc === Princess ? 3 : Infinity;
            npcs.filter(neighbor => neighbor !== npc).take(takeLimit).forEach(neighbor => {
                happiness *= this.assignNeighborModifier(npc, neighbor);
                log += ` * ${this.assignNeighborModifier(npc, neighbor)} (NPC_MODIFIER(${npc.name}))`;
            });

            console.log(log);
            return [npc, happiness];
        });
        return Immutable.Map(npcsToHappiness);
    }

    private assignBiomeModifier(npc: Npc, biome: Biome) {
        if (npc.loved.biomes.includes(biome))
            return LOVED_BIOME_MODIFIER;
        if (npc.liked.biomes.includes(biome))
            return LIKED_BIOME_MODIFIER;
        if (npc.disliked.biomes.includes(biome))
            return DISLIKED_BIOME_MODIFIER;
        if (npc.hated.biomes.includes(biome))
            return HATED_BIOME_MODIFIER;

        return 1;
    }

    private assignNeighborModifier(npc: Npc, neighbor: Npc) {
        if (npc.loved.neighbors.includes(neighbor))
            return LOVED_NEIGHBOR_MODIFIER;
        if (npc.liked.neighbors.includes(neighbor))
            return LIKED_NEIGHBOR_MODIFIER;
        if (npc.disliked.neighbors.includes(neighbor))
            return DISLIKED_NEIGHBOR_MODIFIER;
        if (npc.hated.neighbors.includes(neighbor))
            return HATED_NEIGHBOR_MODIFIER;

        return 1;
    }
}