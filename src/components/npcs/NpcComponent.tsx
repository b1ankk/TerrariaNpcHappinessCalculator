import { useDraggable } from '@dnd-kit/core';
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import NpcImages from '../../constants/npcImages';
import { Npc } from '../../constants/npcs';
import { translateToCss } from '../../util/translateHelper';


const imageWrapperStyle = css`
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    z-index: inherit;
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
    moveUsingFixedPos?: boolean;
}

export default function NpcComponent(props: Props) {
    const {attributes, listeners, setNodeRef, transform, isDragging, node} = useDraggable({
        id: props.dragId ?? props.npc.name,
        data: {npc: props.npc},
    });

    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    const hiddenStyle = props.hidden
        ? css`visibility: hidden;`
        : '';

    let zIndexStyle;
    let draggingStyle = {};
    if (isDragging) {
        zIndexStyle = css`z-index: 10;`;

        if (props.moveUsingFixedPos) {
            draggingStyle = {
                position: 'fixed',
                left: startPos.x,
                top: startPos.y,
                transform: `translate(${transform?.x ?? 0}px, ${transform?.y ?? 0}px)`,
            };
        } else {
            draggingStyle = {
                transform: translateToCss(transform),
            };
        }
    }

    const grabbingStyle = isDragging
        ? css`cursor: grabbing;`
        : css`cursor: grab;`;

    const fixedPosX = node.current?.getBoundingClientRect().x ?? 0;
    const fixedPosY = node.current?.getBoundingClientRect().y ?? 0;

    useEffect(() => {
        if (isDragging)
            return;

        setStartPos({
            x: fixedPosX,
            y: fixedPosY,
        });
    }, [isDragging, fixedPosX, fixedPosY]);

    return (
        <div
            ref={setNodeRef}
            css={[imageWrapperStyle, hiddenStyle, grabbingStyle, zIndexStyle]}
            style={draggingStyle}
            {...listeners}
            {...attributes}
        >
            <img
                css={imageStyle}
                src={NpcImages.get(props.npc)}
                alt={props.npc.name}
            />
            <div css={labelStyle}>{props.npc.name}</div>
            <div css={[labelStyle, scoreStyle]}>
                {props.happiness.toFixed(2)}
            </div>
        </div>
    );
}
