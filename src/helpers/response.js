const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,x-requested-with',
    'Access-Control-Allow-Credentials': true,
    'Content-Type': 'application/json',
}

export default (statusCode = 200, body) => {
    return {
        statusCode: statusCode,
        headers,
        body: JSON.stringify(body),
    }
}
