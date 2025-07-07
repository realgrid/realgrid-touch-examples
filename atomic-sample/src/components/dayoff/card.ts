// card header
type CardHeader = {label?: string, required?: boolean};
const cardHeader = ({ label, required = false }: CardHeader) => {
    return {
        layout: 'hlinear',
        children: [
            {
                type: 'text',
                value: label,
                style: {
                    fontWeight: 700,
                }
            },
            {
                type: 'text',
                value: '필수',
                style: {
                    fontSize: '10pt',
                    color: '#FF4500',
                    backgroundColor: 'linen',
                    display: required ? undefined : 'none',
                    padding: '2px 4px',
                    borderRadius: '4px',
                },
            }
        ],
        itemGap: 10,
        width: '100%',
        style: {
            padding: '10px',
        }
    }
}

// card body
type CardBody = {field?: string, type?: string, value?: any, editable?: boolean, values?: any[], labels?: string[] }
const cardBody = ({field, type = 'text', value, editable, values, labels }: CardBody) => {
    const child:any = {
        field,
        renderer: {
            type,
            // fitWidth: 0.8,
        },
        width: '100%'
    }
    value && Object.assign(child.renderer, { value });

    if (editable) {
        Object.assign(child, {
            editor: { ...child.renderer, values, labels, style: { borderRadius: '4px', borderColor: 'darkorange' } },
        });
        delete child.renderer;
    }

    return {
        layout: 'vlinear',
        children: [
            child
        ],
        width: '100%',
        style: {
            padding: '16px 10px',
        }
    }
}

type Card = CardHeader & CardBody;
export const card = (param: Card) => {
    return {
        layout: 'vlinear',
        children: [
            cardHeader(param),
            { 
                renderer: { type: 'line', lineColor: '#ddd' }, 
                width: '100%',
            },
            cardBody(param),
        ],
        width: '100%',
        style: {
            borderRadius: '12px',
            border: '1px solid #ddd',
            backgroundColor: '#fff'
        }
    }
}