import json
import boto3
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    print(event)
    restaurantid = event['id']
    print(event)
    
    dynamo = boto3.resource('dynamodb', region_name="us-east-1")

    tablerecipeData = dynamo.Table('recipeData')
    responserecipeData = tablerecipeData.query(
        KeyConditionExpression = Key('restaurantid').eq(restaurantid)
    )
    

    # processdata = []
    
    # for i in range(0,len(responserecipeData['Items'])):
    #     recipe = responserecipeData['Items'][i]["name"]
    #     processdata.append(recipe)
    
    print(responserecipeData)
    
    return responserecipeData['Items']
