import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';


interface FestivalPerfomed {
    name: string;
    bands: Array<IBand>;
}

interface NoFestivalPerfomed {
    bands: Array<IBand>;
}

interface IBand {
    name: string;
    recordLabel: string;
}
interface Response {
    code: number,
    data: any
}

function isFestival1(obj: any): obj is FestivalPerfomed {
    return 'name' in obj && 'bands' in obj
}

function isFestival2(obj: any): obj is NoFestivalPerfomed {
    return 'bands' in obj

}
@Injectable()
export class RecordLabelService {

    constructor(private http: HttpService) { }

    // Returns all record labels available
    async getRecordLabels(): Promise<Response> {
        const url = 'https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals';

        try {
            const response = await firstValueFrom(this.http.get(url));

            // Variable to format data

            const reformattedData = {}

            // Check for status 200 and data
            // If data is available reformat it

            if (response.status === 200 && response.data !== '') {
                response.data && response.data.map(obj => {

                    if (isFestival1(obj)) {
                        obj.bands.map(item => {
                            var recordLabel = item.recordLabel || "Not Associated with Label"
                            let temp = { ...reformattedData[recordLabel.toString()] }

                            if (reformattedData && reformattedData[recordLabel.toString()] && reformattedData[recordLabel.toString()].hasOwnProperty(`${item.name}`)) {
                                temp[item.name.toString()] = [...reformattedData[recordLabel.toString()][item.name.toString()], obj.name.toString()]
                            }
                            else {
                                temp[item.name.toString()] = [obj.name.toString()]
                            }
                            reformattedData[recordLabel.toString()] = temp
                        })
                    }
                    else if (isFestival2(obj)) {
                        obj.bands.map(item => {
                            let temp = { ...reformattedData[item.recordLabel.toString()] }

                            if (reformattedData && reformattedData[item.recordLabel.toString()] && reformattedData[item.recordLabel.toString()].hasOwnProperty(`${item.name}`)) {
                                temp[item.name.toString()] = [...reformattedData[item.recordLabel.toString()][item.name.toString()]]
                            }
                            else {
                                temp[item.name] = ["Didn\'t Perform at any festival"]
                            }
                            reformattedData[item.recordLabel.toString()] = temp
                        })
                    }
                })
                return {
                    code: 200,
                    data: reformattedData
                }
            }

            // Check for status 200 and empty data

            if (response.status === 200 && response.data === '') {
                return { code: 404, data: [] }
            }
        }
        catch (e) {
            if (e.status === 429) {
                return {
                    code: 429,
                    data: 'No Data due to rate limiting'
                }
            }
            else {
                return {
                    code: 500,
                    data: 'Internal Server Error'
                }
            }
        }
    }
}
