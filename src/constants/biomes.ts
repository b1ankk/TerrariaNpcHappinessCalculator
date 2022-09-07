class ReadonlyBiome {
    public readonly name: string;
    public readonly type: ReadonlyBiome;

    constructor(name: string) {
        this.name = name;
        this.type = this;
    }
}

export type Biome = ReadonlyBiome;

const Forest = new ReadonlyBiome('Forest');
const SnowBiome = new ReadonlyBiome('Snow Biome');
const Desert = new ReadonlyBiome('Desert');
const Jungle = new ReadonlyBiome('Jungle');
const Ocean = new ReadonlyBiome('Ocean');
const Hallow = new ReadonlyBiome('The Hallow');
const Underground = new ReadonlyBiome('Underground');
const Cavern = new ReadonlyBiome('Caverns');
const Underworld = new ReadonlyBiome('The Underworld');
const GlowingMushroomBiome = new ReadonlyBiome('Glowing Mushroom Biome');

const AllBiomes = [
    Forest,
    SnowBiome,
    Desert,
    Jungle,
    Ocean,
    Hallow,
    Underground,
    Cavern,
    Underworld,
    GlowingMushroomBiome,
] as const;

export { Forest, SnowBiome, Desert, Jungle, Ocean, Hallow, Underground, Cavern, Underworld, GlowingMushroomBiome, AllBiomes };
