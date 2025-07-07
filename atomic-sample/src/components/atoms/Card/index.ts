// card header
const cardHeader = (options: any) => {
    return Object.assign({
        layout: 'hlinear',
        children: [],
        itemGap: 10,
        width: '100%',
        style: {
            padding: '10px',
        }
    }, options);
}

// card body
const cardBody = (options: any) => {
    return Object.assign({
        layout: 'vlinear',
        children: [],
        width: '100%',
        style: {
            padding: '16px 10px',
        }
    }, options);
}

export default ({header, body}: { header: any, body: any}) => {
    return {
        layout: 'vlinear',
        children: [
            cardHeader(header),
            { 
                renderer: { type: 'line', lineColor: '#ddd' }, 
                width: '100%',
            },
            cardBody(body),
        ],
        width: '100%',
        style: {
            borderRadius: '12px',
            border: '1px solid #ddd',
            backgroundColor: '#fff'
        }
    }
}