import {
    Biome,
    Cavern,
    Desert,
    Forest,
    GlowingMushroomBiome,
    Hallow,
    Jungle,
    Ocean,
    SnowBiome,
    Underground,
    Underworld,
} from './biomes';

class BiomesAndNeighbors {
    private _biomes: Biome[] = [];
    private _neighbors: Npc[] = [];

    get biomes(): readonly Biome[] {
        return Object.freeze([...this._biomes]);
    }

    get neighbors(): readonly ReadonlyNpc[] {
        return Object.freeze([...this._neighbors]);
    }

    addBiomes(...biomes: Biome[]) {
        this._biomes.push(...biomes);
    }

    addNeighbors(...neighbors: Npc[]) {
        this._neighbors.push(...neighbors);
    }
}

abstract class BiomesAndNeighborsDelegates {
    abstract biomes(...biomes: Biome[]): Npc;
    abstract neighbors(...neighbors: ReadonlyNpc[]): Npc;
}

type ReadonlyNpc = Omit<Npc, 'addLoved' | 'addLiked' | 'addDisliked' | 'addHated'>;
export type { ReadonlyNpc as Npc};

class Npc {
    private readonly _type: Npc;
    private readonly _name: string;
    private readonly _loved: BiomesAndNeighbors = new BiomesAndNeighbors();
    private readonly _liked: BiomesAndNeighbors = new BiomesAndNeighbors();
    private readonly _disliked: BiomesAndNeighbors = new BiomesAndNeighbors();
    private readonly _hated: BiomesAndNeighbors = new BiomesAndNeighbors();

    constructor(name: string) {
        this._name = name;
        this._type = this;
    }

    addLoved() {
        return this.withBiomesAndNeighbors(this.loved);
    }

    addLiked() {
        return this.withBiomesAndNeighbors(this.liked);
    }

    addDisliked() {
        return this.withBiomesAndNeighbors(this.disliked);
    }

    addHated() {
        return this.withBiomesAndNeighbors(this.hated);
    }

    private withBiomesAndNeighbors(biomeAndNeighbors: BiomesAndNeighbors, owner = this): BiomesAndNeighborsDelegates {
        return new (class extends BiomesAndNeighborsDelegates {
            neighbors(...neighbors: Npc[]): Npc {
                biomeAndNeighbors.addNeighbors(...neighbors);
                return owner;
            }

            biomes(...biomes: Biome[]): Npc {
                biomeAndNeighbors.addBiomes(...biomes);
                return owner;
            }
        })();
    }

    get type(): Npc {
        return this._type;
    }

    get name(): string {
        return this._name;
    }

    get loved(): BiomesAndNeighbors {
        return this._loved;
    }

    get liked(): BiomesAndNeighbors {
        return this._liked;
    }

    get disliked(): BiomesAndNeighbors {
        return this._disliked;
    }

    get hated(): BiomesAndNeighbors {
        return this._hated;
    }
}

const Guide = new Npc('Guide');
const Merchant = new Npc('Merchant');
const Nurse = new Npc('Nurse');
const Demolitionist = new Npc('Demolitionist');
const DyeTrader = new Npc('Dye Trader');
const Angler = new Npc('Angler');
const Zoologist = new Npc('Zoologist');
const Dryad = new Npc('Dryad');
const Painter = new Npc('Painter');
const Golfer = new Npc('Golfer');
const ArmsDealer = new Npc('Arms Dealer');
const Tavernkeep = new Npc('Tavernkeep');
const Stylist = new Npc('Stylist');
const GoblinTinkerer = new Npc('Goblin Tinkerer');
const WitchDoctor = new Npc('Witch Doctor');
const Clothier = new Npc('Clothier');
const Mechanic = new Npc('Mechanic');
const PartyGirl = new Npc('Party Girl');
const Wizard = new Npc('Wizard');
const TaxCollector = new Npc('Tax Collector');
const Truffle = new Npc('Truffle');
const Pirate = new Npc('Pirate');
const Steampunker = new Npc('Steampunker');
const Cyborg = new Npc('Cyborg');
const SantaClaus = new Npc('Santa Claus');
const Princess = new Npc('Princess');

const AllNpcs = [
    Guide,
    Merchant,
    Nurse,
    Demolitionist,
    DyeTrader,
    Angler,
    Zoologist,
    Dryad,
    Painter,
    Golfer,
    ArmsDealer,
    Tavernkeep,
    Stylist,
    GoblinTinkerer,
    WitchDoctor,
    Clothier,
    Mechanic,
    PartyGirl,
    Wizard,
    TaxCollector,
    Truffle,
    Pirate,
    Steampunker,
    Cyborg,
    SantaClaus,
    Princess,
] as const;

// prettier-ignore
{
    Guide
        .addLiked().biomes(Forest)
        .addLiked().neighbors(Clothier, Zoologist)
        .addDisliked().biomes(Ocean)
        .addDisliked().neighbors(Steampunker)
        .addHated().neighbors(Painter);
    
    Merchant
        .addLiked().biomes(Forest)
        .addLiked().neighbors(Golfer, Nurse)
        .addDisliked().biomes(Desert)
        .addDisliked().neighbors(TaxCollector)
        .addHated().neighbors(Angler);
    
    Nurse
        .addLoved().neighbors(ArmsDealer)
        .addLiked().biomes(Hallow)
        .addLiked().neighbors(Wizard)
        .addDisliked().biomes(SnowBiome)
        .addDisliked().neighbors(PartyGirl, Dryad)
        .addHated().neighbors(Zoologist);
    
    Demolitionist
        .addLoved().neighbors(Tavernkeep)
        .addLiked().biomes(Underground, Cavern, Underworld)
        .addLiked().neighbors(Princess, Mechanic)
        .addDisliked().biomes(Ocean)
        .addDisliked().neighbors(GoblinTinkerer, ArmsDealer);
    
    DyeTrader
        .addLiked().biomes(Desert)
        .addLiked().neighbors(ArmsDealer, Painter)
        .addDisliked().biomes(Forest)
        .addDisliked().neighbors(Steampunker)
        .addHated().neighbors(Pirate);
    
    Angler
        .addLiked().biomes(Ocean)
        .addLiked().neighbors(PartyGirl, Demolitionist, TaxCollector)
        .addDisliked().biomes(Desert)
        .addHated().neighbors(Tavernkeep);
    
    Zoologist
        .addLoved().neighbors(WitchDoctor)
        .addLiked().biomes(Forest)
        .addLiked().neighbors(Golfer)
        .addDisliked().biomes(Desert)
        .addDisliked().neighbors(Angler)
        .addHated().neighbors(ArmsDealer);
    
    Dryad
        .addLiked().biomes(Jungle)
        .addLiked().neighbors(WitchDoctor, Truffle)
        .addDisliked().biomes(Desert)
        .addDisliked().neighbors(Angler)
        .addHated().neighbors(Golfer);
    
    Painter
        .addLoved().neighbors(Dryad)
        .addLiked().biomes(Jungle)
        .addLiked().neighbors(PartyGirl)
        .addDisliked().biomes(Forest)
        .addDisliked().neighbors(Cyborg, Truffle);
    
    Golfer
        .addLoved().neighbors(Angler)
        .addLiked().biomes(Forest)
        .addLiked().neighbors(Painter, Zoologist)
        .addDisliked().biomes(Underground, Cavern, Underworld)
        .addDisliked().neighbors(Pirate)
        .addHated().neighbors(Merchant);
    
    ArmsDealer
        .addLoved().neighbors(Nurse)
        .addLiked().biomes(Desert)
        .addLiked().neighbors(Steampunker)
        .addDisliked().biomes(SnowBiome)
        .addDisliked().neighbors(Golfer)
        .addHated().neighbors(Demolitionist);
    
    Tavernkeep
        .addLoved().neighbors(Demolitionist)
        .addLiked().biomes(Hallow)
        .addLiked().neighbors(GoblinTinkerer)
        .addDisliked().biomes(SnowBiome)
        .addDisliked().neighbors(Guide)
        .addHated().neighbors(DyeTrader);
    
    Stylist
        .addLoved().neighbors(DyeTrader)
        .addLiked().biomes(Ocean)
        .addLiked().neighbors(Pirate)
        .addDisliked().biomes(SnowBiome)
        .addDisliked().neighbors(Tavernkeep)
        .addHated().neighbors(GoblinTinkerer);
    
    GoblinTinkerer
        .addLoved().neighbors(Mechanic)
        .addLiked().biomes(Underground, Cavern, Underworld)
        .addLiked().neighbors(DyeTrader)
        .addDisliked().biomes(Jungle)
        .addDisliked().neighbors(Clothier)
        .addHated().neighbors(Stylist);
    
    WitchDoctor
        .addLiked().biomes(Jungle)
        .addLiked().neighbors(Dryad, Guide)
        .addDisliked().biomes(Hallow)
        .addDisliked().neighbors(Nurse)
        .addHated().neighbors(Truffle);
    
    Clothier
        .addLoved().neighbors(Truffle)
        .addLiked().biomes(Underground, Cavern, Underworld)
        .addLiked().neighbors(TaxCollector)
        .addDisliked().biomes(Hallow)
        .addDisliked().neighbors(Nurse)
        .addHated().neighbors(Mechanic);
    
    Mechanic
        .addLoved().neighbors(GoblinTinkerer)
        .addLiked().biomes(SnowBiome)
        .addLiked().neighbors(Cyborg)
        .addDisliked().biomes(Underground, Cavern, Underworld)
        .addDisliked().neighbors(ArmsDealer)
        .addHated().neighbors(Clothier);
    
    PartyGirl
        .addLoved().neighbors(Wizard, Zoologist)
        .addLiked().biomes(Hallow)
        .addLiked().neighbors(Stylist)
        .addDisliked().biomes(Underground, Cavern, Underworld)
        .addDisliked().neighbors(Merchant)
        .addHated().neighbors(TaxCollector);
    
    Wizard
        .addLoved().neighbors(Golfer)
        .addLiked().biomes(Hallow)
        .addLiked().neighbors(Merchant)
        .addDisliked().biomes(Ocean)
        .addDisliked().neighbors(WitchDoctor)
        .addHated().neighbors(Cyborg);
    
    TaxCollector
        .addLoved().neighbors(Merchant)
        .addLiked().biomes(SnowBiome)
        .addLiked().neighbors(PartyGirl)
        .addDisliked().biomes(Hallow)
        .addDisliked().neighbors(Demolitionist, Mechanic)
        .addHated().neighbors(SantaClaus);
    
    Truffle
        .addLoved().neighbors(Guide)
        .addLiked().biomes(GlowingMushroomBiome)
        .addLiked().neighbors(Dryad)
        .addDisliked().neighbors(Clothier)
        .addHated().neighbors(WitchDoctor);
    
    Pirate
        .addLoved().neighbors(Angler)
        .addLiked().biomes(Ocean)
        .addLiked().neighbors(Tavernkeep)
        .addDisliked().biomes(Underground, Cavern, Underworld)
        .addDisliked().neighbors(Stylist)
        .addHated().neighbors(Guide);
    
    Steampunker
        .addLoved().neighbors(Cyborg)
        .addLiked().biomes(Desert)
        .addLiked().neighbors(Painter)
        .addDisliked().biomes(Jungle)
        .addDisliked().neighbors(PartyGirl, Wizard, Dryad);
    
    Cyborg
        .addLiked().biomes(SnowBiome)
        .addLiked().neighbors(Stylist, Pirate, Steampunker)
        .addDisliked().biomes(Jungle)
        .addDisliked().neighbors(Zoologist)
        .addHated().neighbors(Wizard);
    
    SantaClaus
        .addLoved().biomes(SnowBiome)
        .addHated().biomes(Desert)
        .addHated().neighbors(TaxCollector);
    
    Princess
        .addLoved().neighbors(...AllNpcs.filter(npc => npc !== Princess));
    AllNpcs
        .filter(npc => npc !== Princess)
        .forEach(npc => npc.addLiked().neighbors(Princess));
}


const ReadonlyGuide = Guide as ReadonlyNpc;
const ReadonlyMerchant = Merchant as ReadonlyNpc;
const ReadonlyNurse = Nurse as ReadonlyNpc;
const ReadonlyDemolitionist = Demolitionist as ReadonlyNpc;
const ReadonlyDyeTrader = DyeTrader as ReadonlyNpc;
const ReadonlyAngler = Angler as ReadonlyNpc;
const ReadonlyZoologist = Zoologist as ReadonlyNpc;
const ReadonlyDryad = Dryad as ReadonlyNpc;
const ReadonlyPainter = Painter as ReadonlyNpc;
const ReadonlyGolfer = Golfer as ReadonlyNpc;
const ReadonlyArmsDealer = ArmsDealer as ReadonlyNpc;
const ReadonlyTavernkeep = Tavernkeep as ReadonlyNpc;
const ReadonlyStylist = Stylist as ReadonlyNpc;
const ReadonlyGoblinTinkerer = GoblinTinkerer as ReadonlyNpc;
const ReadonlyWitchDoctor = WitchDoctor as ReadonlyNpc;
const ReadonlyClothier = Clothier as ReadonlyNpc;
const ReadonlyMechanic = Mechanic as ReadonlyNpc;
const ReadonlyPartyGirl = PartyGirl as ReadonlyNpc;
const ReadonlyWizard = Wizard as ReadonlyNpc;
const ReadonlyTaxCollector = TaxCollector as ReadonlyNpc;
const ReadonlyTruffle = Truffle as ReadonlyNpc;
const ReadonlyPirate = Pirate as ReadonlyNpc;
const ReadonlySteampunker = Steampunker as ReadonlyNpc;
const ReadonlyCyborg = Cyborg as ReadonlyNpc;
const ReadonlySantaClaus = SantaClaus as ReadonlyNpc;
const ReadonlyPrincess = Princess as ReadonlyNpc;

const AllReadonlyNpcs = [
    ReadonlyGuide,
    ReadonlyMerchant,
    ReadonlyNurse,
    ReadonlyDemolitionist,
    ReadonlyDyeTrader,
    ReadonlyAngler,
    ReadonlyZoologist,
    ReadonlyDryad,
    ReadonlyPainter,
    ReadonlyGolfer,
    ReadonlyArmsDealer,
    ReadonlyTavernkeep,
    ReadonlyStylist,
    ReadonlyGoblinTinkerer,
    ReadonlyWitchDoctor,
    ReadonlyClothier,
    ReadonlyMechanic,
    ReadonlyPartyGirl,
    ReadonlyWizard,
    ReadonlyTaxCollector,
    ReadonlyTruffle,
    ReadonlyPirate,
    ReadonlySteampunker,
    ReadonlyCyborg,
    ReadonlySantaClaus,
    ReadonlyPrincess,
] as const;

export {
    ReadonlyGuide as Guide,
    ReadonlyMerchant as Merchant,
    ReadonlyNurse as Nurse,
    ReadonlyDemolitionist as Demolitionist,
    ReadonlyDyeTrader as DyeTrader,
    ReadonlyAngler as Angler,
    ReadonlyZoologist as Zoologist,
    ReadonlyDryad as Dryad,
    ReadonlyPainter as Painter,
    ReadonlyGolfer as Golfer,
    ReadonlyArmsDealer as ArmsDealer,
    ReadonlyTavernkeep as Tavernkeep,
    ReadonlyStylist as Stylist,
    ReadonlyGoblinTinkerer as GoblinTinkerer,
    ReadonlyWitchDoctor as WitchDoctor,
    ReadonlyClothier as Clothier,
    ReadonlyMechanic as Mechanic,
    ReadonlyPartyGirl as PartyGirl,
    ReadonlyWizard as Wizard,
    ReadonlyTaxCollector as TaxCollector,
    ReadonlyTruffle as Truffle,
    ReadonlyPirate as Pirate,
    ReadonlySteampunker as Steampunker,
    ReadonlyCyborg as Cyborg,
    ReadonlySantaClaus as SantaClaus,
    ReadonlyPrincess as Princess,
    AllReadonlyNpcs as AllNpcs,
};
