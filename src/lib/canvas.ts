export class TextWidthCalculator {
  private static instance: TextWidthCalculator;

  // Reuse the canvas to increase performance.
  private canvas: HTMLCanvasElement;

  private constructor() {
    this.canvas = document.createElement("canvas");
  }

  public static getInstance(): TextWidthCalculator {
    if (!TextWidthCalculator.instance) {
      TextWidthCalculator.instance = new TextWidthCalculator();
    }
    return TextWidthCalculator.instance;
  }

  /**
   * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
   *
   * @param {String} text The text to be rendered.
   * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
   *
   * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
   */
  getTextWidth = (text: string, font: string): number | null => {
    const context = this.canvas.getContext("2d");
    if (!context) {
      return null;
    }
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  };
}
