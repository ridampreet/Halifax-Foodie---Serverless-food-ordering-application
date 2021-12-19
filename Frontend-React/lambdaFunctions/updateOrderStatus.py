import json
import boto3
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    dynamo = boto3.resource('dynamodb')
    
    tableUpdate = dynamo.Table('orders')
    
    responseData = tableUpdate.query(
        KeyConditionExpression = Key('id').eq(event['id'])
    )
    items = responseData['Items'][0]['items']

    response = tableUpdate.update_item(
        Key={
            'id': event['id'],
            'items': items
        },
        UpdateExpression="set #status=:s",
        ExpressionAttributeNames= {
            '#status' : 'status'
        },
        ExpressionAttributeValues={
            ':s': event['status']
        },
        ReturnValues="UPDATED_NEW"
    )
    
    # //////////////////////////////////////////////////
    # item = {
    #         'id':event['id'],
    #         'items':event['orderitems'],
    #         'status':'in-process'
    # }
    
    # table = dynamo.Table('orders')
    # response = table.put_item( 
    #     Item=item
    # )
    return {
        'statusCode': 200
    }
