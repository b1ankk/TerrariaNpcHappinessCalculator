import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { css } from '@emotion/react';
import image from '../assets/img/npcs/Guide.png';
import { Npc } from '../constants/npcs';

const imageWrapperStyle = css`
    margin: 0.25rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    gap: 4px;
    align-items: center;
    cursor: pointer;
`;

const imageStyle = css`
    height: 80px;
    image-rendering: pixelated;
`;

const labelStyle = css`
    padding: 5px 0;
`;

interface Props {
    dragId?: string;
    hidden?: boolean;
    npc: Npc;
}

export default function NpcComponent(props: Props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.dragId ?? props.npc.name,
        data: { npc: props.npc },
    });

    const hiddenStyle = props.hidden
        ? css`visibility: hidden;`
        : '';

    const translateStyle = css`
        transform: ${CSS.Translate.toString(transform)};
    `;

    return (
        <div ref={setNodeRef} css={[imageWrapperStyle, translateStyle, hiddenStyle]} {...listeners} {...attributes}>
            <img css={imageStyle} src={image} alt={props.npc.name} />
            <div css={labelStyle} >{props.npc.name}</div>
        </div>
    );
}
