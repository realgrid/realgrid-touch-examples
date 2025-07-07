export default ({ field, value }: { field?: string, value?: any }) => ({
    layout: "frame",
    children: [
    {
        field,
        renderer: {
            type: "gauge",
            value,
            gaugeSize: 150,
            maxValue: 100,
            minValue: 0,
            valueStyle: { 
                strokeWidth: "24px", 
                stroke: "#5DCB4E" 
            },
            startAngle: -90,
            endAngle: 360 - 90,
            style: { strokeWidth: "24px", stroke: 'orange' },
        },
    },
    {
        field,
        renderer: {
            type: 'text',
            value,
            // suffix: "%",
        },
        width: '100%',
        style: {
            textAlign: 'center'
        }
    }],
    width: "50%",
});