// Function to parse data into html
export default function Template(data): string {

    let htmlString: string = '<style>p{margin:2px}</style>'

    Object.keys(data).sort().map((key, index) => {
        htmlString = htmlString + `<p>${key}</p><br/>`
        Object.keys(data[key]).sort().map((sub_key, sub_index) => {
            if (sub_key && sub_key.length>0) {
                htmlString = htmlString + `<p>&ensp;${sub_key}</p><br/>`
                data[key][sub_key].sort().map((item) => {
                    htmlString = htmlString + `<p>&ensp; &ensp; ${item}</p><br/>`
                })
            }
        })
    });
    return htmlString
} 