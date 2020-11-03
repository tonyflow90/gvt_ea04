let canvas, gl;
let aVertices = [];

document.body.onload = _ => {
    createSurface1();
};

let createSurface1 = () => {
    canvas = document.querySelector('#canvas');
    gl = canvas1.getContext('webgl');

    // Pipeline setup
    gl.clearColor(.25, .35, .45, 1);
    // Backface culling.
    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK); // or gl.FRONT

    // let vertices, colors, indices = undefined;

    let [vertices, colors, indices] = _createSurface1();

    draw(gl.LINES, vertices, colors, indices);
}

let formulaHyperbolicHelicoid = (a, u, v) => {
    // x = sinh(v) cos(a u)/(1+cosh(u) cosh(v))
    // y = sinh(v) sin(a u)/(1+cosh(u) cosh(v))
    // z = cosh(v) sinh(u)/(1+cosh(u) cosh(v))
    let x, y, z = 0;
    x = Math.sinh(v) * Math.cos(a * u) / (1 + Math.cosh(u) * Math.cosh(v))
    y = Math.sinh(v) * Math.sin(a * u) / (1 + Math.cosh(u) * Math.cosh(v))
    z = Math.cosh(v) * Math.sinh(u) / (1 + Math.cosh(u) * Math.cosh(v))
    return [x, y, z]
}

let createSpiderNet = () => {
    var n = 32;
    var m = 5;
    // Positions.
    vertices = new Float32Array(3*(n+1)*(m+1));
    // Index data for Linestrip.
    indices = new Uint16Array(2 * 2 * n * m);

    var dt = 2*Math.PI/n;
    var dr = 1/m;
    // Counter for entries in index array.
    var iIndex = 0;

    // Loop angle t.
    for(var i=0, t=0; i <= n; i++, t += dt) {

        // Loop radius r.
        for(var j=0, r=0; j <= m; j++, r += dr){

            var iVertex = i*(m+1) + j;

            var x = r * Math.cos(t);
            var y = r * Math.sin(t);
            var z = 0;

            // Set vertex positions.
            vertices[iVertex * 3] = x;
            vertices[iVertex * 3 + 1] = y;
            vertices[iVertex * 3 + 2] = z;

            // Set index.
            // Line on beam.
            if(j>0 && i>0){
                indices[iIndex++] = iVertex - 1;
                indices[iIndex++] = iVertex;
            }

            // Line on ring.
            if(j>0 && i>0){
                indices[iIndex++] = iVertex-(m+1);
                indices[iIndex++] = iVertex;
            }
        }
    }
}

let _createSurface1 = () => {
    let n = 10;
    let m = 10;

    // Positions.
    let vertices = new Float32Array(3 * (n + 1) * (m + 1));
    // Index data for Linestrip.
    // let indices = new Uint16Array(2 * 2 * n * m);

    let dt = 2 * Math.PI / n;
    let dr = 1 / m;
    // Counter for entries in index array.
    let iIndex = 0;

    // Loop angle t.
    for (let i = 0, t = 0; i <= n; i++, t += dt) {

        // Loop radius r.
        for (let j = 0, r = 0; j <= m; j++, r += dr) {

            let iVertex = i * (m + 1) + j;

            let x = r * Math.cos(t);
            let y = r * Math.sin(t);
            let z = 0;

            // Set vertex positions.
            vertices[iVertex * 3] = x;
            vertices[iVertex * 3 + 1] = y;
            vertices[iVertex * 3 + 2] = z;
        }
    }

    let colors = createColors(vertices.length);
    let indices = new Uint16Array(Array.from(Array(vertices.length).keys()));

    return [vertices, colors, indices];
}

let createColors = (nCount = 8) => {
    let colors = [];
    let c1, c2, c3, v = 1;

    for (let i = 0; i < nCount * 3; i += 1) {
        c1 = Math.round(Math.random() * 1);
        c2 = Math.round(Math.random() * 1);
        c3 = Math.round(Math.random() * 1);
        colors = [...colors, c1, c2, c3, v];
    }

    return new Float32Array(colors);
}

let createArea = (nCount = 8) => {
    let vertices = [];
    let triangleCount = nCount / 2;
    let r = 1;
    let g = 2 * Math.PI / triangleCount;

    // 1. half
    for (let i = 0; i < triangleCount; i += 1) {
        r = Math.random() * .5 + .5;
        let x1 = 0;
        let y1 = 0;
        let z1 = 0;

        let x2 = r * Math.cos(g * i);
        let y2 = r * Math.sin(g * i);
        let z2 = 0;

        let x3 = r * Math.cos(g * (i + 1));
        let y3 = r * Math.sin(g * (i + 1));
        let z3 = 0;

        vertices = [...vertices, x1, y1, z1, x2, y2, z2, x3, y3, z3];
    }

    // 2. half
    // vertices.map(x => x * -1);
    // vertices = [...vertices, ...vertices.map(x => x * -1)];
    return new Float32Array(vertices);
}

let draw = (mode, aVertices, aColors, aIndices) => {

    // Compile a vertex shader
    let vsSource = '' +
        'attribute vec3 pos;' +
        'attribute vec4 col;' +
        'letying vec4 color;' +
        'void main(){' +
        'color = col;' +
        'gl_Position = vec4(pos, 1);' +
        '}';
    let vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    // Compile a fragment shader
    let fsSouce = 'precision mediump float;' +
        'letying vec4 color;' +
        'void main() {' +
        'gl_FragColor = color;' +
        '}';
    let fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSouce);
    gl.compileShader(fs);

    // Link together into a program
    let prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Setup position vertex buffer object.
    let vboPos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
    gl.bufferData(gl.ARRAY_BUFFER, aVertices, gl.STATIC_DRAW);
    // Bind vertex buffer to attribute letiable.
    let posAttrib = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttrib);

    // Setup color vertex buffer object.
    let vboCol = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboCol);
    gl.bufferData(gl.ARRAY_BUFFER, aColors, gl.STATIC_DRAW);
    // Bind vertex buffer to attribute letiable.
    let colAttrib = gl.getAttribLocation(prog, 'col');
    gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colAttrib);

    // Setup index buffer object.
    let ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, aIndices,
        gl.STATIC_DRAW);
    ibo.numerOfEmements = aIndices.length;

    // Clear framebuffer and render primitives.
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(mode, ibo.numerOfEmements, gl.UNSIGNED_SHORT, 0);

}