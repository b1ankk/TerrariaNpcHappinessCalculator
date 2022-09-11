import Immutable from 'immutable';
import AnglerImage from '../assets/img/npcs/Angler.png';
import ArmsDealerImage from '../assets/img/npcs/ArmsDealer.png';
import ClothierImage from '../assets/img/npcs/Clothier.png';
import CyborgImage from '../assets/img/npcs/Cyborg.png';
import DemolitionistImage from '../assets/img/npcs/Demolitionist.png';
import DryadImage from '../assets/img/npcs/Dryad.png';
import DyeTraderImage from '../assets/img/npcs/DyeTrader.png';
import GoblinTinkererImage from '../assets/img/npcs/GoblinTinkerer.png';
import GolferImage from '../assets/img/npcs/Golfer.png';
import GuideImage from '../assets/img/npcs/Guide.png';
import MechanicImage from '../assets/img/npcs/Mechanic.png';
import MerchantImage from '../assets/img/npcs/Merchant.png';
import NurseImage from '../assets/img/npcs/Nurse.png';
import PainterImage from '../assets/img/npcs/Painter.png';
import PartyGirlImage from '../assets/img/npcs/PartyGirl.png';
import PirateImage from '../assets/img/npcs/Pirate.png';
import PrincessImage from '../assets/img/npcs/Princess.png';
import SantaClausImage from '../assets/img/npcs/SantaClaus.png';
import SteampunkerImage from '../assets/img/npcs/Steampunker.png';
import StylistImage from '../assets/img/npcs/Stylist.png';
import TavernkeepImage from '../assets/img/npcs/Tavernkeep.png';
import TaxCollectorImage from '../assets/img/npcs/TaxCollector.png';
import TruffleImage from '../assets/img/npcs/Truffle.png';
import WitchDoctorImage from '../assets/img/npcs/WitchDoctor.png';
import WizardImage from '../assets/img/npcs/Wizard.png';
import ZoologistImage from '../assets/img/npcs/Zoologist.png';
import {
    Angler,
    ArmsDealer,
    Clothier,
    Cyborg,
    Demolitionist,
    Dryad,
    DyeTrader,
    GoblinTinkerer,
    Golfer,
    Guide,
    Mechanic,
    Merchant,
    Nurse,
    Painter,
    PartyGirl,
    Pirate,
    Princess,
    SantaClaus,
    Steampunker,
    Stylist,
    Tavernkeep,
    TaxCollector,
    Truffle,
    WitchDoctor,
    Wizard,
    Zoologist,
} from './npcs';

const NpcImages = Immutable.Map([
    [Guide, GuideImage],
    [Merchant, MerchantImage],
    [Nurse, NurseImage],
    [Demolitionist, DemolitionistImage],
    [DyeTrader, DyeTraderImage],
    [Angler, AnglerImage],
    [Zoologist, ZoologistImage],
    [Dryad, DryadImage],
    [Painter, PainterImage],
    [Golfer, GolferImage],
    [ArmsDealer, ArmsDealerImage],
    [Tavernkeep, TavernkeepImage],
    [Stylist, StylistImage],
    [GoblinTinkerer, GoblinTinkererImage],
    [WitchDoctor, WitchDoctorImage],
    [Clothier, ClothierImage],
    [Mechanic, MechanicImage],
    [PartyGirl, PartyGirlImage],
    [Wizard, WizardImage],
    [TaxCollector, TaxCollectorImage],
    [Truffle, TruffleImage],
    [Pirate, PirateImage],
    [Steampunker, SteampunkerImage],
    [Cyborg, CyborgImage],
    [SantaClaus, SantaClausImage],
    [Princess, PrincessImage],
]);

export default NpcImages;
