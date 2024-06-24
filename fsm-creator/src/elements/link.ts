import Circle from "./circle";

export default class Link {
    CircleOne: Circle;
    CircleTwo: Circle;

    constructor(c1: Circle, c2: Circle) {
        this.CircleOne = c1;
        this.CircleTwo = c2;
    }

    drawArrowArc(ctx: CanvasRenderingContext2D, color: string = "black") {
        let startx = this.CircleOne.x;
        let starty = this.CircleOne.y;
        let endx = this.CircleTwo.x;
        let endy = this.CircleTwo.y;

        let midx = (startx + endx) / 2;
        let midy = (starty + endy) / 2;
        let controlx = midx + (starty - endy) / 2; // Control point for quadratic curve
        let controly = midy - (startx - endx) / 2;

        ctx.strokeStyle = color;

        // Draw arc
        ctx.beginPath();
        ctx.moveTo(startx, starty);
        ctx.quadraticCurveTo(controlx, controly, endx, endy);
        ctx.stroke();

        // Draw arrowhead
        const angle = Math.atan2(endy - controly, endx - controlx);
        const arrowLength = 10;

        ctx.beginPath();
        ctx.moveTo(endx, endy);
        ctx.lineTo(
            endx - arrowLength * Math.cos(angle - Math.PI / 6),
            endy - arrowLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(endx, endy);
        ctx.lineTo(
            endx - arrowLength * Math.cos(angle + Math.PI / 6),
            endy - arrowLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
    }
}
