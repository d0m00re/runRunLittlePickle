varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

// Define your colors
vec4 waterColor = vec4(0.0, 0.5, 1.0, 1.0); // Example blue color for water

vec4 minOtherColor = vec4(0.5, 0.4, 0.2, 1.0);
vec4 maxOtherColor = vec4(1.0, 0.5, 0.3, 1.0);

vec4 mountainColor = vec4(0.8, 0.6, 0.4, 1.0); // Example brownish color for mountains

vec4 calculColor(vec4 minOtherColor, vec4 maxOtherColor, float minH, float maxH, float currH) {
    float percent = (currH - minH) / (maxH - minH);

    return mix(minOtherColor, maxOtherColor, percent);
}

vec4 getColorWithHeight(float height) {
    if (height < 0.1) {
        return waterColor;
    } else if (height < 100.0) {
        return calculColor(minOtherColor, maxOtherColor, 0.1, 10.0, height); //otherColor;
    } else {
        return mountainColor;
    }
    return vec4(height / 70.0, height / 30.0, height / 10.0, 1.0);
}

void main() {
    float height = vPosition[2];
    vec4 color = getColorWithHeight(height);
    gl_FragColor = color;
}