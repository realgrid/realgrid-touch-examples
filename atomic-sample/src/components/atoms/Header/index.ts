export default (options?:any) => {
    const { style, ...props } = options;
    return {
        visible: true,
        captionAlign: 'center',
        ...props,
        style: Object.assign({
            fontSize: '15pt',
            backgroundColor: 'white',
            border: 'none',
            padding: '14px'
        }, style)
    };   
}