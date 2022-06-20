import AWS from 'aws-sdk';
import SES from 'aws-sdk/clients/ses';
import { PromiseResult } from 'aws-sdk/lib/request';
import path from 'path';
import ejs from 'ejs';

interface DataSend {
  to: string;
  subject: string;
}

interface Message {
  html: string;
  text: string;
}

interface DataConf extends DataSend, Message {}

type AWSEmailResponse = PromiseResult<SES.SendEmailResponse, AWS.AWSError>;

export default class EmailsService {
  from = 'commerce.challenge2@gmail.com';
  transporter;

  constructor() {
    this.transporter = new SES({
      region: 'us-east-1',
    });
  }

  static async loadAccess(): Promise<boolean> {
    return new Promise((res, rej) => {
      AWS.config.getCredentials((err) => {
        if (err) {
          console.log('error to load AWS Access');
          return res(false);
        }
        console.log('loaded AWS Access');
        res(true);
      });
    });
  }

  getConf<T extends DataConf>(data: T) {
    return {
      Source: this.from,
      Destination: {
        ToAddresses: [data.to],
      },
      Message: {
        Subject: { Data: data.subject },
        Body: {
          Text: { Data: data.text },
          Html: { Data: data.html },
        },
      },
      ConfigurationSetName: '', // *
    };
  }

  async readTemplate<T extends object>(
    templateName: string,
    data: T
  ): Promise<Message> {
    const basePath = path.resolve(`./src/views/emails/${templateName}`);
    const textPath = basePath + '.text.ejs';
    const htmlPath = basePath + '.template.ejs';

    const text = await ejs.renderFile(textPath, data);
    const html = await ejs.renderFile(htmlPath, data);

    return { text, html };
  }

  async send<T extends DataSend>(
    template: string,
    $data: T
  ): Promise<AWSEmailResponse> {
    const data = { ...$data, from: this.from };
    const templates = await this.readTemplate(template, data);

    const conf = this.getConf({ ...templates, ...data });
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.transporter.sendEmail(conf).promise();
        resolve(res);
      } catch (err) {
        reject(err);
      }
    });
  }
}

// load access only once
EmailsService.loadAccess();
