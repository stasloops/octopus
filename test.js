// Исходные данные
const data = {
    "startAngle": 0.8504864089828722,
    "endAngle": 1.492690432092388,
    "paddingAngle": 0,
    "innerRadius": 0,
    "outerRadius": 149.5,
    "arcLabelRadius": 89.7,
    "cornerRadius": 0,
    "style": {
        "opacity": 1
    },
    "id": "auto-generated-id-0",
    "color": "#2E96FF",
    "isFaded": false,
    "isHighlighted": false,
    "formattedArcLabel": "10%"
};

// Вычисление x координаты
let x = Math.cos((data.startAngle + data.endAngle) / 2) * data.arcLabelRadius;
// Вычисление y координаты
let y = -Math.sin((data.startAngle + data.endAngle) / 2) * data.arcLabelRadius;

// Результат
console.log({
    "x": x.toFixed(3),
    "y": y.toFixed(3)
});