import { Position } from "./position";

export class Character {
  static readonly CANVAS_WIDTH = 640;
  static readonly CANVAS_HEIGHT = 480;

  static scene: "appearance" | "play" = "appearance";

  constructor(
    private ctx: CanvasRenderingContext2D,
    private image: HTMLImageElement,
    public position: Position,
  ) {
    this.ctx = ctx;
    this.image = image;
    this.position = position;
  }

  draw() {
    this.ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
