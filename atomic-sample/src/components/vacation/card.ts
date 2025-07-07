import { RtListControl } from 'realgrid-touch';

// card header
type CardHeader = {label?: string, required?: boolean};
const cardHeader = ({ label, required = false }: CardHeader) => {
    return {
        layout: 'hlinear',
        children: [
            {
                type: 'text',
                field: 'label',
                // value: label,
                style: {
                    fontWeight: 700
                }
            },
            {
                type: 'text',
                value: '필수',
                style: {
                    color: 'coral',
                    backgroundColor: 'linen'
                },
                styleCallback: ({ control, row }: {control: RtListControl, row: number, value: any}) => {
                    // console.log(args.control.data.getValue(args.row, 'required'));
                    if (!control.data.getValue(row, 'required')) {
                        return { display: 'none' };
                    }
                }
            }
        ]
    }
}

// card body
type CardBody = {type?: string, value?: any, enabled?: boolean}
const cardBody = ({ type = 'text', value, enabled = true }: CardBody) => {

    return {
        layout: 'vlinear',
        children: [
            {
                type: '${type}',
                field: 'value',
                enabled: '${enabled}'
            }
        ],        
    }
}

type Card = CardHeader & CardBody;
export const card = (param: Card) => {
    return {
        layout: 'vlinear',
        children: [
            cardHeader(param),
            cardBody(param),
        ],
    }
}