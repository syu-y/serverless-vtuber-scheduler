import { DynamoDB } from 'aws-sdk';

const options = process.env.LOCAL
  ? { region: 'localhost', endpoint: 'http://localhost:8082' }
  : {};

export const documentClient = new DynamoDB.DocumentClient(options);
