/**
 * @file ImprovementData.jsx
 * @description Data file containing home improvement suggestions with associated costs, ROI, and impact metrics.
 *              Used to display improvement options in the "Migliora casa" section of the application.
 */

import IconBolt from '../assets/iconeMigliora/electric_bolt/electric_bolt_verde/electric_bolt_verde.svg';
import IconWaterDrop from '../assets/iconeMigliora/water_drop/water_drop_verde/water_drop_verde.svg';
import IconPaintBrush from '../assets/iconeMigliora/format_paint/format_paint_verde/format_paint_verde.svg';
import IconLightBulb from '../assets/iconeMigliora/lightbulb_circle/lightbulb_circle_verde/lightbulb_circle_verde.svg';

/**
 * Improvement statistics object.
 * @typedef {Object} ImprovementStats
 * @property {string} 'Costo stimato' - Estimated cost range for the improvement.
 * @property {string} 'Aumento valore' - Estimated property value increase.
 * @property {string} 'ROI atteso' - Expected return on investment percentage.
 * @property {string} 'Tempi' - Estimated duration for completion.
 */

/**
 * Home improvement item object.
 * @typedef {Object} ImprovementItem
 * @property {number} id - Unique identifier for the improvement.
 * @property {JSX.Element} icon - SVG icon element representing the improvement type.
 * @property {string} title - Main title of the improvement project.
 * @property {string} subtitle - Detailed description of the improvement.
 * @property {ImprovementStats} stats - Financial and timeline statistics.
 * @property {number} impactValue - ROI impact value as a percentage number.
 */

/**
 * Array of home improvement suggestions.
 * 
 * Contains detailed information about various home improvements including energy efficiency upgrades,
 * window replacements, painting, and LED lighting. Each item includes estimated costs, value increase,
 * ROI expectations, and completion timelines.
 *
 * @type {Array<ImprovementItem>}
 */
const improvementData = [
    {
        id: 1,
        icon: <img src={IconBolt} alt="icon" className="w-7 h-7 object-contain" />,
        title: 'Miglioramento classe energetica',
        subtitle: 'Passaggio da classe E a classe B con cappotto termico e infissi',
        stats: {
            'Costo stimato': '€ 15.000 - 25.000',
            'Aumento valore': '+€ 30.000 - 40.000',
            'ROI atteso': '+150%',
            'Tempi': '3-4 mesi'
        },
        impactValue: 150
    },
    {
        id: 2,
        icon: <img src={IconWaterDrop} alt="icon" className="w-7 h-7 object-contain" />,
        title: 'Sostituzione infissi',
        subtitle: 'Installazione serramenti ad alta efficienza energetica',
        stats: {
            'Costo stimato': '€ 8.000 - 12.000',
            'Aumento valore': '+€ 10.000 - 15.000',
            'ROI atteso': '+120%',
            'Tempi': '1-2 mesi'
        },
        impactValue: 120
    },
    {
        id: 3,
        icon: <img src={IconPaintBrush} alt="icon" className="w-7 h-7 object-contain" />,
        title: 'Tinteggiatura completa',
        subtitle: 'Rinfrescare pareti e soffitti con colori neutri e moderni',
        stats: {
            'Costo stimato': '€ 3.000 - 5.000',
            'Aumento valore': '+€ 5.000 - 9.000',
            'ROI atteso': '+180%',
            'Tempi': '2-3 settimane'
        },
        impactValue: 180
    },
    {
        id: 4,
        icon: <img src={IconLightBulb} alt="icon" className="w-7 h-7 object-contain" />,
        title: 'Illuminazione LED',
        subtitle: 'Sostituzione completa con illuminazione a LED e domotica',
        stats: {
            'Costo stimato': '€ 2.000 - 4.000',
            'Aumento valore': '+€ 2.000 - 4.000',
            'ROI atteso': '+100%',
            'Tempi': '1 settimana'
        },
        impactValue: 100
    }
];

export default improvementData;
