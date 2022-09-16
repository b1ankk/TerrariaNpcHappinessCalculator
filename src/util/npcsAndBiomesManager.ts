import Immutable from 'immutable';
import { AllUsedBiomes, Biome } from '../constants/biomes';
import { AllNpcs, Npc } from '../constants/npcs';

export type FreeNpcsSet = Immutable.Set<Npc>;
export type NpcsByBiomeMap = Immutable.OrderedMap<Biome, Immutable.Set<Npc>>;

export default class NpcsAndBiomesManager {
    private readonly freeNpcs: FreeNpcsSet;
    private readonly npcsByBiome: NpcsByBiomeMap;

    private constructor(freeNpcs?: FreeNpcsSet, npcsByBiome?: NpcsByBiomeMap) {
        this.npcsByBiome = npcsByBiome ?? this.makeEmptyNpcsByBiomeMap(AllUsedBiomes);
        this.freeNpcs = freeNpcs ?? Immutable.Set(AllNpcs);
    }

    private makeEmptyNpcsByBiomeMap(biomes: readonly Biome[]): NpcsByBiomeMap {
        return Immutable.OrderedMap(
            biomes.map(biome => [biome, Immutable.Set()])
        );
    }

    private withFreeNpcs(freeNpcs: FreeNpcsSet) {
        return new NpcsAndBiomesManager(freeNpcs, this.npcsByBiome);
    }

    private withNpcsByBiome(npcsByBiome: NpcsByBiomeMap) {
        return new NpcsAndBiomesManager(this.freeNpcs, npcsByBiome);
    }

    public static create() {
        return new NpcsAndBiomesManager();
    }

    public getNpcsForBiome(biome: Biome): Immutable.Set<Npc> {
        const npcs = this.npcsByBiome.get(biome);
        if (npcs == null)
            throw new BiomeNotFoundError(`Biome: ${biome.name} was not found`);
        return npcs;
    }

    public moveNpcToBiome(npc: Npc, biome: Biome) {
        return this
            .withNpcRemovedFromFree(npc)
            .withNpcRemovedFromBiomes(npc)
            .withNpcAddedToBiome(npc, biome);
    }

    public moveNpcToFree(npc: Npc) {
        return this.withNpcRemovedFromBiomes(npc).withNpcAddedToFree(npc);
    }

    private withNpcAddedToBiome(npc: Npc, biome: Biome) {
        const newNpcsByBiome = this.npcsByBiome.set(biome, this.getNpcsForBiome(biome).add(npc));
        if (newNpcsByBiome === this.npcsByBiome)
            return this;

        return this.withNpcsByBiome(newNpcsByBiome);
    }

    private withNpcRemovedFromBiomes(npc: Npc) {
        const newNpcsByBiome = this.npcsByBiome.map(npcs => npcs.remove(npc));
        if (newNpcsByBiome === this.npcsByBiome)
            return this;

        return this.withNpcsByBiome(newNpcsByBiome);
    }

    private withNpcRemovedFromFree(npc: Npc) {
        const newFreeNpcs = this.freeNpcs.remove(npc);
        if (newFreeNpcs === this.freeNpcs)
            return this;

        return this.withFreeNpcs(newFreeNpcs);
    }

    private withNpcAddedToFree(npc: Npc) {
        const newFreeNpcs = this.freeNpcs.add(npc);
        if (newFreeNpcs === this.freeNpcs)
            return this;

        return this.withFreeNpcs(newFreeNpcs);
    }

    public getAllNpcsByBiomes(): NpcsByBiomeMap {
        return this.npcsByBiome;
    }

    public getAllFreeNpcs(): FreeNpcsSet {
        return this.freeNpcs;
    }
}

class BiomeNotFoundError extends Error {
    constructor(message: string) {
        super(message);
    }
}
