import * as AWS from 'aws-sdk';

const configuration = {
    region: process.env.REACT_APP_AWS_REGION,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID
}
const tableName = process.env.REACT_APP_AWS_TABLE_NAME;

AWS.config.update(configuration);

const docClient = new AWS.DynamoDB.DocumentClient();

export const fetchData = async (data) => {
    let params = {
        TableName: tableName,
        FilterExpression : 'email = :this_email',
        ExpressionAttributeValues : {':this_email' : data}
    }

    const resp = await docClient.scan(params).promise()
    
    return resp;
}

export const putData = async (data) => {
    let params = {
        TableName: tableName,
        Item: data
    }

    const resp = await docClient.put(params).promise();
    return resp;
}