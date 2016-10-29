import { Injectable } from '@angular/core';

@Injectable()
export class CsvCreatorService {

  constructor() { }

  convert(jsonData: Array<Object>): string  {

    let result = this.getHeader(jsonData[0]);

    result += this.getBody(jsonData);

    return result.substring(0, result.length - 1);
  }

  private getHeader(firstLineData: Object) {
        let line = '';
        Object.keys(firstLineData).forEach((key) => {
            line += key + ', ';
        });
        return line.substring(0, line.length - 2) + '\n';
  }

  private getBody(jsonData: Array<Object>): string {
    let result = '';
    let numberOfLines = jsonData.length;
    let keys = Object.keys(jsonData[0]);

    for (let i = 0; i < numberOfLines; i++) {
        let line = '';
        let jsonLine = jsonData[i];

        keys.forEach((key) => {
          line += jsonLine[key] + ', ';
        });

        result += line.substring(0, line.length - 2)  + '\n';
    }
    return result;
  }
}
