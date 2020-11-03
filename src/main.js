let canvas, gl;
let vertices, colors, indices = undefined;

document.body.onload = _ => {
    let [vertices, indicesLines, indicesTris] = createKidneySurface();
    var aColors = [];
    for (let i = 0; i < indicesTris.length / 2; i += 1) {
        aColors = [...aColors, .25, 0, 0, 1, 0, 0, 1, 1];
    }
    
    var colors = new Float32Array(aColors);
    draw('#canvas1', 0.2, vertices, indicesLines, indicesTris, colors);

    [vertices, indicesLines, indicesTris] = createWellenkugel();
    draw('#canvas2', 0.05, vertices, indicesLines, indicesTris);

    [vertices, indicesLines, indicesTris, colors] = createMyShape();
    draw('#canvas3', 0.2, vertices, indicesLines, indicesTris);
};

let createWellenkugel = () => {
    var n = 100;
    var m = 100;
    // Positions.
    let vertices = new Float32Array(3 * (n + 1) * (m + 1));
    // Index data.
    let indicesLines = new Uint16Array(2 * 2 * n * m);
    let indicesTris = new Uint16Array(3 * 2 * n * m);

    var du = 14.5 / n;
    var dv = 2 * Math.PI / m;

    // Counter for entries in index array.
    var iLines = 0;
    var iTris = 0;

    // Loop angle u.
    for (var i = 0, u = 0; i <= n; i++, u += du) {
        // Loop height v.
        for (var j = 0, v = 0; j <= m; j++, v += dv) {

            var iVertex = i * (m + 1) + j;

            let x, y, z = 0;
            x = u * Math.cos(Math.cos(u)) * Math.cos(v);
            z = u * Math.cos(Math.cos(u)) * Math.sin(v);
            y = u * Math.sin(Math.cos(u));

            // Set vertex positions.
            vertices[iVertex * 3] = x;
            vertices[iVertex * 3 + 1] = y;
            vertices[iVertex * 3 + 2] = z;

            // Set index.
            // Line on beam.
            if (j > 0 && i > 0) {
                indicesLines[iLines++] = iVertex - 1;
                indicesLines[iLines++] = iVertex;
            }
            // Line on ring.
            if (j > 0 && i > 0) {
                indicesLines[iLines++] = iVertex - (m + 1);
                indicesLines[iLines++] = iVertex;
            }

            // Set index.
            // Two Triangles.
            if (j > 0 && i > 0) {
                indicesTris[iTris++] = iVertex;
                indicesTris[iTris++] = iVertex - 1;
                indicesTris[iTris++] = iVertex - (m + 1);
                //                            
                indicesTris[iTris++] = iVertex - 1;
                indicesTris[iTris++] = iVertex - (m + 1) - 1;
                indicesTris[iTris++] = iVertex - (m + 1);
            }
        }
    }
    return [vertices, indicesLines, indicesTris];
}

let createKidneySurface = () => {
    var n = 20;
    var m = 20;
    // Positions.
    let vertices = new Float32Array(3 * (n + 1) * (m + 1));
    // Index data.
    let indicesLines = new Uint16Array(2 * 2 * n * m);
    let indicesTris = new Uint16Array(3 * 2 * n * m);

    var du = 2 * Math.PI / n;
    var dv = Math.PI / m;

    // Counter for entries in index array.
    var iLines = 0;
    var iTris = 0;

    // Loop angle u.
    for (var i = 0, u = 0; i <= n; i++, u += du) {
        // Loop height v.
        for (var j = 0, v = -Math.PI / 2; j <= m; j++, v += dv) {

            var iVertex = i * (m + 1) + j;

            let x, y, z = 0;
            x = Math.cos(u) * (3 * Math.cos(v) - Math.cos(3 * v));
            z = Math.sin(u) * (3 * Math.cos(v) - Math.cos(3 * v));
            y = 3 * Math.sin(v) - Math.sin(3 * v);

            // Set vertex positions.
            vertices[iVertex * 3] = x;
            vertices[iVertex * 3 + 1] = y;
            vertices[iVertex * 3 + 2] = z;

            // Set index.
            // Line on beam.
            if (j > 0 && i > 0) {
                indicesLines[iLines++] = iVertex - 1;
                indicesLines[iLines++] = iVertex;
            }
            // Line on ring.
            if (j > 0 && i > 0) {
                indicesLines[iLines++] = iVertex - (m + 1);
                indicesLines[iLines++] = iVertex;
            }

            // Set index.
            // Two Triangles.
            if (j > 0 && i > 0) {
                indicesTris[iTris++] = iVertex;
                indicesTris[iTris++] = iVertex - 1;
                indicesTris[iTris++] = iVertex - (m + 1);
                //                            
                indicesTris[iTris++] = iVertex - 1;
                indicesTris[iTris++] = iVertex - (m + 1) - 1;
                indicesTris[iTris++] = iVertex - (m + 1);
            }
        }
    }
    return [vertices, indicesLines, indicesTris];
}

let createMyShape = () => {
    var n = 20;
    var m = 20;
    // Positions.
    let vertices = new Float32Array(3 * (n + 1) * (m + 1));
    // Index data.
    let indicesLines = new Uint16Array(2 * 2 * n * m);
    let indicesTris = new Uint16Array(3 * 2 * n * m);

    var du = 2 * Math.PI / n;
    var dv = Math.PI / m;

    // Counter for entries in index array.
    var iLines = 0;
    var iTris = 0;

    // Loop angle u.
    for (var i = 0, u = 0; i <= n; i++, u += du) {
        // Loop height v.
        for (var j = 0, v = -Math.PI / 2; j <= m; j++, v += dv) {

            var iVertex = i * (m + 1) + j;

            let x, y, z = 0;
            x = Math.cos(u) * (1 * Math.cos(v) - Math.cos(6 * v));
            z = Math.sin(u) * (1 * Math.cos(v) - Math.cos(3 * v));
            y = 3 * Math.sin(v) - Math.sin(3 * v);

            // Set vertex positions.
            vertices[iVertex * 3] = x;
            vertices[iVertex * 3 + 1] = y;
            vertices[iVertex * 3 + 2] = z;

            // Set index.
            // Line on beam.
            if (j > 0 && i > 0) {
                indicesLines[iLines++] = iVertex - 1;
                indicesLines[iLines++] = iVertex;
            }
            // Line on ring.
            if (j > 0 && i > 0) {
                indicesLines[iLines++] = iVertex - (m + 1);
                indicesLines[iLines++] = iVertex;
            }

            // Set index.
            // Two Triangles.
            if (j > 0 && i > 0) {
                indicesTris[iTris++] = iVertex;
                indicesTris[iTris++] = iVertex - 1;
                indicesTris[iTris++] = iVertex - (m + 1);
                //                            
                indicesTris[iTris++] = iVertex - 1;
                indicesTris[iTris++] = iVertex - (m + 1) - 1;
                indicesTris[iTris++] = iVertex - (m + 1);
            }
        }
    }
    return [vertices, indicesLines, indicesTris];
}

function draw(sId, scale = 1, vertices, indicesLines, indicesTris, colors) {
    let canvas = document.querySelector(sId);
    let gl = canvas.getContext('webgl');

    // Pipeline setup
    gl.clearColor(.25, .35, .45, 1);
    // Backface culling.
    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    // Depth(Z)-Buffer.
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    // Polygon offset of rastered Fragments.
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(0.5, 0);

    // Compile vertex shader. 
    var vsSource = '' +
        'attribute vec3 pos;' +
        'attribute vec4 col;' +
        'varying vec4 color;' +
        'void main(){' + 'color = col;' +
        `gl_Position = vec4(pos * ${scale} , 1);` +
        '}';

    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    // Compile fragment shader.
    var fsSouce = 'precision mediump float;' +
        'varying vec4 color;' +
        'void main() {' +
        'gl_FragColor = color;' +
        '}';
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSouce);
    gl.compileShader(fs);

    // Link shader together into a program.
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, "pos");
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Setup position vertex buffer object.
    var vboPos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
    gl.bufferData(gl.ARRAY_BUFFER,
        vertices, gl.STATIC_DRAW);
    // Bind vertex buffer to attribute variable.
    var posAttrib = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT,
        false, 0, 0);
    gl.enableVertexAttribArray(posAttrib);

    // Setup lines index buffer object.
    var iboLines = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        indicesLines, gl.STATIC_DRAW);
    iboLines.numberOfElements = indicesLines.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    // Setup tris index buffer object.
    var iboTris = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        indicesTris, gl.STATIC_DRAW);
    iboTris.numberOfElements = indicesTris.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);


    var colAttrib = gl.getAttribLocation(prog, 'col');
    if (colors) {
        // Setup color vertex buffer object.
        var vboCol = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vboCol);
        gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
        // Bind vertex buffer to attribute variable.
        gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(colAttrib);
    }

    // Clear framebuffer and render primitives.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Setup rendering tris.
    if (!colors) {
        gl.vertexAttrib4f(colAttrib, .5, .5, 1, 1);
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
    gl.drawElements(gl.TRIANGLES,
        iboTris.numberOfElements, gl.UNSIGNED_SHORT, 0);

    // Setup rendering lines.
    if (!colors) {
        gl.vertexAttrib4f(colAttrib, 1, 1, 1, 1);
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
    gl.drawElements(gl.LINES,
        iboLines.numberOfElements, gl.UNSIGNED_SHORT, 0);
};