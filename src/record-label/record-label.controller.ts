import { Controller, Get, Header, HttpStatus, Res } from '@nestjs/common';
import { RecordLabelService } from './record-label.service';
import Template from './ResponsePage';

interface Response {
    code: number,
    data: any
}
@Controller('record-label')
export class RecordLabelController {
    constructor(private recordlabelService: RecordLabelService) { }

    @Get('/')
    @Header('content-type', 'text/html')
    async getRecordLabel(@Res() res) {
        let response: Response = await this.recordlabelService.getRecordLabels();
        let responseString = '<div>' + Template(response.data) + '</div>'
        if (response.code === 200) {
            return res.status(HttpStatus.OK).json(responseString.replace(/['"]+/g, ''));
        }
        else if (response.code === 404) {
            return res.status(HttpStatus.NOT_FOUND).json('No data found')
        }
        else if (response.code === 429) {
            return res.status(HttpStatus.OK).json('No Data recieved due to rate Limiting')
        }
        else {
            if (response)
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(response.data)
        }
    }
}
