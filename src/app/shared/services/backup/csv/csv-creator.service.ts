import { Injectable } from '@angular/core';

@Injectable()
export class CsvCreatorService {

  constructor() { }

  convert(jsonData: Array<Object>): string {

    let result = this.getHeader(jsonData[0]);

    result += this.getBody(jsonData);

    return result.substring(0, result.length - 1);
  }

  private getHeader(firstLineData: Object) {
    let line = '';

    if (firstLineData === undefined || Object.keys(firstLineData) === undefined || Object.keys(firstLineData).length === 0) {
      return '  \n';
    }
    const keys = Object.keys(firstLineData);

    keys.forEach((key) => {
      line += key + ', ';
    });
    return line.substring(0, line.length - 2) + '\n';
  }

  private getBody(jsonData: Array<Object>): string {
    let result = '';
    const numberOfLines = jsonData.length;

    if (jsonData[0] === undefined || Object.keys(jsonData[0]) === undefined || Object.keys(jsonData[0]).length === 0) {
      return '  \n';
    }
    const keys = Object.keys(jsonData[0]);

    for (let i = 0; i < numberOfLines; i++) {
      let line = '';
      const jsonLine = jsonData[i];

      keys.forEach((key) => {
        let data = jsonLine[key];
        if (data && data.uuid !== undefined) {
          data = data.uuid;
        }
        line += data + ', ';
      });

      result += line.substring(0, line.length - 2) + '\n';
    }
    return result;
  }
}
