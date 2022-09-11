import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { css } from '@emotion/react';
import { Npc } from '../constants/npcs';
import NpcImages from "../constants/npcImages";

const imageWrapperStyle = css`
    margin: 0.25rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    cursor: pointer;
`;

const imageStyle = css`
    height: 80px;
    image-rendering: pixelated;
`;

const labelStyle = css`
    text-align: center;
    white-space: nowrap;
    height: 10px;
    line-height: 13px;
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
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.dragId ?? props.npc.name,
        data: { npc: props.npc },
    });

    const hiddenStyle = props.hidden
        ? css`visibility: hidden;`
        : '';

    const translateReactStyle = {
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div ref={setNodeRef}
             css={[imageWrapperStyle, hiddenStyle]}
             style={translateReactStyle}
             {...listeners} {...attributes}
        >
            <img css={imageStyle} src={NpcImages.get(props.npc)} alt={props.npc.name} />
            <div css={labelStyle} >{props.npc.name}</div>
            <div css={[labelStyle, scoreStyle]}>{props.happiness.toFixed(2)}</div>
        </div>
    );
}
