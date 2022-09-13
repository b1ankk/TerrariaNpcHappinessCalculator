import { useDraggable } from '@dnd-kit/core';
import { css } from '@emotion/react';
import NpcImages from '../constants/npcImages';
import { Npc } from '../constants/npcs';
import {translateToCss} from "../util/translateHelper";


const imageWrapperStyle = css`
    margin: 0.25rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    z-index: 1;
`;

const imageStyle = css`
    height: 80px;
    image-rendering: pixelated;
`;

const labelStyle = css`
    box-sizing: content-box;
    text-align: center;
    white-space: nowrap;
    height: 10px;
    line-height: 0.75em;
    font-size: 20px;
    background: rgba(0, 0, 0, 0.5);
    border-style: solid;
    border-radius: 20px;
    border-color: rgba(0, 0, 0, 0);
    border-width: 0.25em;
`;

const scoreStyle = css`
    color: yellow;
`;

interface Props {
    dragId?: string;
    hidden?: boolean;
    npc: Npc;
    happiness: number;
}

export default function NpcComponent(props: Props) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: props.dragId ?? props.npc.name,
        data: { npc: props.npc },
    });

    const hiddenStyle = props.hidden
        ? css`visibility: hidden;`
        : '';

    const translateReactStyle = {
        transform: translateToCss(transform),
        zIndex: isDragging ? 10 : 'inherit',
    };

    const grabbingStyle = isDragging
        ? css`cursor: grabbing;`
        : css`cursor: grab;`;

    return (
        <div ref={setNodeRef}
             css={[imageWrapperStyle, hiddenStyle, grabbingStyle]}
             style={translateReactStyle}
             {...listeners} {...attributes}
        >
            <img css={imageStyle} src={NpcImages.get(props.npc)} alt={props.npc.name} />
            <div css={labelStyle} >{props.npc.name}</div>
            <div css={[labelStyle, scoreStyle]}>{props.happiness.toFixed(2)}</div>
        </div>
    );
}