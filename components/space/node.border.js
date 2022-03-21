/**
 * This class copies sigma/rendering/webgl/programs/node.fast, but with a tiny
 * difference: The fragment shader ("./node.border.frag.glsl") draws a white
 * disc with a colored border.
 */
import { floatColor } from "sigma/utils";
import { NodeDisplayData } from "sigma/types";
import { AbstractNodeProgram } from "sigma/rendering/webgl/programs/common/node";
import { RenderParams } from "sigma/rendering/webgl/programs/common/program";

import vertexShaderSource from "./node.border.vert.js";
import fragmentShaderSource from "./node.border.frag.js";

const POINTS = 1;
const ATTRIBUTES = 4;

export default class NodeProgramBorder extends AbstractNodeProgram {
  constructor(gl) {
    super(gl, vertexShaderSource, fragmentShaderSource, POINTS, ATTRIBUTES);
    this.bind();
  }

  process(data, hidden, offset) {
    const array = this.array;
    let i = offset * POINTS * ATTRIBUTES;

    if (hidden) {
      array[i++] = 0;
      array[i++] = 0;
      array[i++] = 0;
      array[i++] = 0;
      return;
    }

    const color = floatColor(data.color);

    array[i++] = data.x;
    array[i++] = data.y;
    array[i++] = data.size;
    array[i] = color;
  }

  render(params) {
    const gl = this.gl;

    const program = this.program;
    gl.useProgram(program);

    gl.uniform1f(this.ratioLocation, 1 / Math.sqrt(params.ratio));
    gl.uniform1f(this.scaleLocation, params.scalingRatio);
    gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);

    gl.drawArrays(gl.POINTS, 0, this.array.length / ATTRIBUTES);
  }
}
