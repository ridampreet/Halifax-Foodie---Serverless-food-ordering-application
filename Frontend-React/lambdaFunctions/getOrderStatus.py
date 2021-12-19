import json
import boto3
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    dynamo = boto3.resource('dynamodb', region_name="us-east-1")

    tableData = dynamo.Table('orders')
    responseData = tableData.query(
        KeyConditionExpression = Key('id').eq(event['id'])
    )
    
    print(responseData)
    
    return responseData['Items']
