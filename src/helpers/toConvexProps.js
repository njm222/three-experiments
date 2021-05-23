/* eslint-disable import/prefer-default-export */
/** Converts hsl to hex colour format */

// eslint-disable-next-line import/no-extraneous-dependencies
import { Geometry } from 'three-stdlib/deprecated/Geometry';

export const toConvexProps = (bufferGeometry) => {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);
  // Merge duplicate vertices resulting from glTF export.
  // Cannon assumes contiguous, closed meshes to work
  geo.mergeVertices();
  return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []];
};
