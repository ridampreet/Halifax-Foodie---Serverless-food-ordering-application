import json
import boto3

def lambda_handler(event, context):
    dynamo = boto3.resource('dynamodb')
    item = {
            'restaurantid':event['restaurantid'],
            'name':event['name'],
            'description':event['description'],
            'ingredients':event['ingredients'],
            'tag':event['tag']
    }
    
    table = dynamo.Table('recipeData')
    response = table.put_item( 
        Item=item
    )
    return {
        'statusCode': 200
    }
