import Immutable from 'immutable';
import CavernImage from '../assets/img/biomes/BiomeBannerCavern.png';
import DesertImage from '../assets/img/biomes/BiomeBannerDesert.png';
import ForestImage from '../assets/img/biomes/BiomeBannerForest.png';
import GlowingMushroomBiomeImage from '../assets/img/biomes/BiomeBannerGlowingMushroom.png';
import HallowImage from '../assets/img/biomes/BiomeBannerHallow.png';
import JungleImage from '../assets/img/biomes/BiomeBannerJungle.png';
import OceanImage from '../assets/img/biomes/BiomeBannerOcean.png';
import SnowBiomeImage from '../assets/img/biomes/BiomeBannerSnow.png';
import {
    Cavern,
    Desert,
    Forest,
    GlowingMushroomBiome,
    Hallow,
    Jungle,
    Ocean,
    SnowBiome,
} from './biomes';

const BiomeImages = Immutable.Map([
    [Forest, ForestImage],
    [SnowBiome, SnowBiomeImage],
    [Desert, DesertImage],
    [Jungle, JungleImage],
    [Ocean, OceanImage],
    [Hallow, HallowImage],
    [Cavern, CavernImage],
    [GlowingMushroomBiome, GlowingMushroomBiomeImage],
]);

export default BiomeImages;
