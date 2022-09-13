import {Transform} from "@dnd-kit/utilities";

export function translateToCss(transform: Transform | null): string {
    if (!transform)
        return 'none';

    return `translate(${transform.x}px, ${transform.y}px)`;
}
