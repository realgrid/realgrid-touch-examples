type TagParam = { value?: string, style?: Partial<CSSStyleDeclaration>};
export default (param?: TagParam) => {
    return {
        type: 'text',
        value: param?.value,
        style: Object.assign({
            fontSize: '10pt',
            color: '#FF4500',
            backgroundColor: 'linen',
            padding: '2px 4px',
            borderRadius: '4px',
        }, param?.style),
    }
}