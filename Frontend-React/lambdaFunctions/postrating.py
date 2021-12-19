import json
import boto3

def lambda_handler(event, context):
    dynamo = boto3.resource('dynamodb')
    item = {
            'ratings':event['ratings']
    }
    
    table = dynamo.Table('ratingsData')
    response = table.put_item( 
        Item=item
    )
    return {
        'statusCode': 200
    }
